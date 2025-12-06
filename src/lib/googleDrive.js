const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const SCOPES = 'https://www.googleapis.com/auth/drive.file';
const TOKEN_STORAGE_KEY = 'google_drive_token';

function getRedirectUri() {
    const override = import.meta.env.VITE_GOOGLE_REDIRECT_URI;
    if (override) {
        return override;
    }
    return `${window.location.origin}/google-oauth-callback.html`;
}

function buildAuthUrl() {
    const redirectUri = getRedirectUri();
    const params = new URLSearchParams({
        client_id: CLIENT_ID,
        redirect_uri: redirectUri,
        response_type: 'token',
        scope: SCOPES,
        include_granted_scopes: 'true',
        prompt: 'consent',
    });
    return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}

function loadStoredToken() {
    try {
        const raw = localStorage.getItem(TOKEN_STORAGE_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (!parsed.accessToken || !parsed.expiryTime) return null;
        if (Date.now() > parsed.expiryTime - 60000) {
            localStorage.removeItem(TOKEN_STORAGE_KEY);
            return null;
        }
        return parsed.accessToken;
    } catch {
        return null;
    }
}

function storeToken(accessToken, expiresInSeconds) {
    try {
        const expiryTime = Date.now() + (expiresInSeconds || 3600) * 1000;
        const data = {
            accessToken,
            expiryTime,
        };
        localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(data));
    } catch {
    }
}

export async function getValidAccessToken() {
    if (!CLIENT_ID) {
        throw new Error('Google Client ID is not configured');
    }
    const existing = loadStoredToken();
    if (existing) {
        return existing;
    }
    return openAuthPopup();
}

function openAuthPopup() {
    return new Promise((resolve, reject) => {
        const url = buildAuthUrl();
        const width = 500;
        const height = 600;
        const left = window.screenX + (window.outerWidth - width) / 2;
        const top = window.screenY + (window.outerHeight - height) / 2;

        const popup = window.open(
            url,
            'google_oauth_popup',
            `width=${width},height=${height},left=${left},top=${top}`
        );

        if (!popup) {
            reject(new Error('Popup blocked. Please allow popups and try again.'));
            return;
        }

        function handleMessage(event) {
            if (event.origin !== window.location.origin) {
                return;
            }
            const data = event.data || {};
            if (data.type !== 'google_oauth') {
                return;
            }
            window.removeEventListener('message', handleMessage);
            if (!popup.closed) {
                popup.close();
            }
            if (data.error) {
                reject(new Error(data.error));
                return;
            }
            if (data.access_token) {
                const expiresIn = data.expires_in ? Number(data.expires_in) : 3600;
                storeToken(data.access_token, expiresIn);
                resolve(data.access_token);
                return;
            }
            reject(new Error('No access token received from Google OAuth'));
        }

        window.addEventListener('message', handleMessage);

        const timer = setInterval(() => {
            if (popup.closed) {
                clearInterval(timer);
                window.removeEventListener('message', handleMessage);
                reject(new Error('Popup was closed before completing sign-in'));
            }
        }, 500);
    });
}

export async function uploadTextFileToDrive({ content, fileName = 'note.txt' }) {
    const accessToken = await getValidAccessToken();
    const boundary = '-------314159265358979323846';
    const delimiter = `\r\n--${boundary}\r\n`;
    const closeDelimiter = `\r\n--${boundary}--`;

    const metadata = {
        name: fileName,
        mimeType: 'text/plain',
    };

    const body =
        delimiter +
        'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
        JSON.stringify(metadata) +
        delimiter +
        'Content-Type: text/plain; charset=UTF-8\r\n\r\n' +
        (content || '') +
        closeDelimiter;

    const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': `multipart/related; boundary=${boundary}`,
        },
        body,
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(text || 'Failed to upload file to Google Drive');
    }

    return response.json();
}

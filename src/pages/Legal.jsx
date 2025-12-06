import React from 'react';

const Legal = () => {
    return (
        <div style={{ maxWidth: '600px', margin: '50px auto', padding: '20px' }}>
            <h2>Legal Information</h2>
            <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                <h3>Privacy Policy</h3>
                <p>Your privacy is important to us. Noteify does not sell your personal data.</p>

                <h3>Terms of Service</h3>
                <p>By using Noteify, you agree to our terms of service.</p>

                <h3>Copyright</h3>
                <p>© 2025 Linza Apps. All rights reserved.</p>
            </div>
        </div>
    );
};

export default Legal;

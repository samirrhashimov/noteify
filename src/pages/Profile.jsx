import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { FaUserCircle } from 'react-icons/fa';

const Profile = () => {
    const { currentUser } = useAuth();

    // Fallback date if creationTime is missing
    const joinDate = currentUser?.metadata?.creationTime
        ? new Date(currentUser.metadata.creationTime).toLocaleDateString()
        : 'Unknown';

    return (
        <div style={{ maxWidth: '600px', margin: '50px auto', padding: '20px', textAlign: 'center' }}>
            <FaUserCircle size={100} color="#555" style={{ marginBottom: '20px' }} />
            <h2>User Profile</h2>
            <div style={{ marginTop: '30px', textAlign: 'left', background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                <p><strong>Email:</strong> {currentUser?.email}</p>
                <p><strong>User ID:</strong> {currentUser?.uid}</p>
                <p><strong>Joined:</strong> {joinDate}</p>
            </div>
        </div>
    );
};

export default Profile;

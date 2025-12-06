import React, { useState } from 'react';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import { FaPaperPlane } from 'react-icons/fa';

const Feedback = () => {
    const { currentUser } = useAuth();
    const [feedback, setFeedback] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!feedback.trim()) return;

        try {
            await addDoc(collection(db, "feedback"), {
                userId: currentUser?.uid || 'anonymous',
                email: currentUser?.email || 'anonymous',
                text: feedback,
                createdAt: serverTimestamp()
            });
            setMessage("Thank you for your feedback!");
            setFeedback('');
        } catch (error) {
            console.error("Error sending feedback: ", error);
            setMessage("Failed to send feedback.");
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', textAlign: 'center' }}>
            <h2>Send Feedback</h2>
            <p>We would love to hear your thoughts!</p>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            <form onSubmit={handleSubmit}>
                <textarea
                    style={{ width: '100%', height: '150px', padding: '10px', marginTop: '10px' }}
                    placeholder="Write your feedback here..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    required
                ></textarea>
                <button type="submit" style={{ marginTop: '20px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                    Send <FaPaperPlane />
                </button>
            </form>
        </div>
    );
};

export default Feedback;

import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../lib/firebase';
import { collection, query, where, onSnapshot, addDoc, doc, deleteDoc, updateDoc, orderBy, serverTimestamp } from 'firebase/firestore';
import { FaPlus, FaFilter, FaEllipsisV } from 'react-icons/fa';
import '../styles/style.css';

const Home = () => {
    const { currentUser } = useAuth();
    const [notes, setNotes] = useState([]);
    const [search, setSearch] = useState('');
    const [noteInput, setNoteInput] = useState('');
    const [isNoteInputVisible, setIsNoteInputVisible] = useState(false);
    const [editingNote, setEditingNote] = useState(null);
    const [editInput, setEditInput] = useState('');
    const [deleteNoteId, setDeleteNoteId] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showFilterMenu, setShowFilterMenu] = useState(false);
    const [sortOrder, setSortOrder] = useState('desc'); // 'desc' for newest first, 'asc' for oldest first
    const [openMenuId, setOpenMenuId] = useState(null);

    useEffect(() => {
        if (!currentUser) return;

        const q = query(
            collection(db, "notlar"),
            where("uid", "==", currentUser.uid),
            orderBy("timestamp", sortOrder)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const notesData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setNotes(notesData);
        });

        return unsubscribe;
    }, [currentUser, sortOrder]);

    const handleAddNote = async () => {
        if (!noteInput.trim()) return;
        try {
            await addDoc(collection(db, "notlar"), {
                content: noteInput,
                uid: currentUser.uid,
                timestamp: serverTimestamp()
            });
            setNoteInput('');
            setIsNoteInputVisible(false);
        } catch (error) {
            console.error("Error adding note: ", error);
        }
    };

    const confirmDelete = (noteId) => {
        setDeleteNoteId(noteId);
        setShowDeleteModal(true);
        setOpenMenuId(null);
    };

    const handleDeleteNote = async () => {
        if (deleteNoteId) {
            await deleteDoc(doc(db, "notlar", deleteNoteId));
            setShowDeleteModal(false);
            setDeleteNoteId(null);
        }
    };

    const handleUpdateNote = async () => {
        if (!editingNote || !editInput.trim()) return;
        try {
            await updateDoc(doc(db, "notlar", editingNote.id), {
                content: editInput,
                timestamp: serverTimestamp()
            });
            setEditingNote(null);
            setEditInput('');
        } catch (error) {
            console.error("Error updating note: ", error);
        }
    };

    const openEdit = (note) => {
        setEditingNote(note);
        setEditInput(note.content);
        setOpenMenuId(null);
    };

    const toggleFilterMenu = () => {
        setShowFilterMenu(!showFilterMenu);
    };

    const handleSort = (order) => {
        setSortOrder(order);
        setShowFilterMenu(false);
    };

    const toggleNoteMenu = (noteId) => {
        setOpenMenuId(openMenuId === noteId ? null : noteId);
    };

    const filteredNotes = notes.filter(note =>
        note.content?.toLowerCase().includes(search.toLowerCase())
    );

    const formatDate = (timestamp) => {
        if (!timestamp) return 'No date';
        const date = timestamp.toDate();
        return date.toLocaleString();
    };

    // Close menus when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest('.three-dot-menu') && !e.target.closest('.note-menu')) {
                setOpenMenuId(null);
            }
            if (!e.target.closest('#filter-btn') && !e.target.closest('.filter-menu')) {
                setShowFilterMenu(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    return (
        <div className="home-container">
            <div id="searchBox">
                <input
                    type="text"
                    id="searchInput"
                    placeholder="Search Notes"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button id="filter-btn" onClick={toggleFilterMenu}>
                    <FaFilter />
                </button>
            </div>

            {/* Filter Menu */}
            <div className={`filter-menu ${showFilterMenu ? 'show' : ''}`}>
                <div
                    className={`filter-option ${sortOrder === 'desc' ? 'active' : ''}`}
                    id="sort-newest"
                    onClick={() => handleSort('desc')}
                >
                    From New to Old
                </div>
                <div
                    className={`filter-option ${sortOrder === 'asc' ? 'active' : ''}`}
                    id="sort-oldest"
                    onClick={() => handleSort('asc')}
                >
                    From Old to New
                </div>
            </div>

            <div id="notesList">
                {filteredNotes.length === 0 && (
                    <div id="emptyState" className="empty-state" style={{ display: 'block' }}>
                        <img src="/assets/img/man.png" alt="No notes" width="70" height="70" />
                        <h2>Too quiet here...</h2>
                        <p>Add a note to get started</p>
                    </div>
                )}
                {filteredNotes.map(note => (
                    <div key={note.id} className="note-container">
                        <div className="note-header">
                            <small>{formatDate(note.timestamp)}</small>
                            <button
                                className="three-dot-menu"
                                onClick={() => toggleNoteMenu(note.id)}
                            >
                                ⋮
                            </button>
                            <div className={`note-menu ${openMenuId === note.id ? 'show' : ''}`}>
                                <div className="menu-item" onClick={() => openEdit(note)}>Edit</div>
                                <div className="menu-item" onClick={() => confirmDelete(note.id)}>Delete</div>
                            </div>
                        </div>
                        <p dangerouslySetInnerHTML={{ __html: note.content?.replace(/\n/g, '<br>') || '' }}></p>
                    </div>
                ))}
            </div>

            <button
                id="addNoteButton"
                className="always-hover"
                onClick={() => setIsNoteInputVisible(true)}
            >
                <FaPlus />
            </button>

            {/* Add Note Container */}
            {isNoteInputVisible && (
                <div id="noteContainer" className="show" style={{ display: 'block' }}>
                    <textarea
                        id="noteInput"
                        placeholder="Write your thoughts..."
                        value={noteInput}
                        onChange={(e) => setNoteInput(e.target.value)}
                    ></textarea>
                    <div className="button-container">
                        <button id="savenote1" onClick={handleAddNote}>Save</button>
                        <button id="cancelnote2" onClick={() => {
                            setIsNoteInputVisible(false);
                            setNoteInput('');
                        }}>Cancel</button>
                    </div>
                </div>
            )}

            {/* Edit Note Container */}
            {editingNote && (
                <div id="editNoteContainer" style={{ display: 'block' }}>
                    <textarea
                        id="editNoteInput"
                        value={editInput}
                        onChange={(e) => setEditInput(e.target.value)}
                    ></textarea>
                    <div className="button-container">
                        <button id="savenote1" onClick={handleUpdateNote}>Save</button>
                        <button id="cancelnote2" onClick={() => {
                            setEditingNote(null);
                            setEditInput('');
                        }}>Cancel</button>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {showDeleteModal && (
                <div id="deleteModal" className="modal" style={{ display: 'block' }}>
                    <div className="modal-content">
                        <p>Are you sure you want to delete this note?</p>
                        <button id="confirmDelete" onClick={handleDeleteNote}>Yes</button>
                        <button id="cancelDelete" onClick={() => {
                            setShowDeleteModal(false);
                            setDeleteNoteId(null);
                        }}>No</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../lib/firebase';
import { uploadTextFileToDrive } from '../lib/googleDrive';
import { collection, query, where, onSnapshot, addDoc, doc, deleteDoc, updateDoc, orderBy, serverTimestamp } from 'firebase/firestore';
import { FaPlus, FaFilter, FaEllipsisV, FaEdit, FaCopy, FaTrash, FaGoogleDrive } from 'react-icons/fa';
import '../styles/style.css';
import { RichEditor, RichToolbar, EditorProvider } from '../components/NoteEditor';
import { useKeyboardShortcut } from '../hooks/useKeyboardShortcut';
import KeyboardHint from '../components/KeyboardHint';

import manImg from '../assets/img/man.png';

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
    const [expandedNotes, setExpandedNotes] = useState(new Set());
    const [showDriveModal, setShowDriveModal] = useState(false);
    const [driveModalMessage, setDriveModalMessage] = useState('');
    const [driveFileUrl, setDriveFileUrl] = useState('');

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

    const handleAddNote = useCallback(async () => {
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
    }, [noteInput, currentUser]);

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

    const handleUpdateNote = useCallback(async () => {
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
    }, [editingNote, editInput]);

    const openEdit = (note) => {
        setEditingNote(note);
        setEditInput(note.content);
        setOpenMenuId(null);
    };

    const toggleFilterMenu = useCallback(() => {
        setShowFilterMenu(prev => !prev);
    }, []);

    const handleSort = (order) => {
        setSortOrder(order);
        setShowFilterMenu(false);
    };

    const toggleNoteMenu = (noteId) => {
        setOpenMenuId(openMenuId === noteId ? null : noteId);
    };

    const toggleNoteExpansion = (noteId) => {
        setExpandedNotes(prev => {
            const newSet = new Set(prev);
            if (newSet.has(noteId)) {
                newSet.delete(noteId);
            } else {
                newSet.add(noteId);
            }
            return newSet;
        });
    };

    const getPlainText = (html) => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html || '';
        return tempDiv.textContent || tempDiv.innerText || '';
    };

    const truncateHTML = (html, maxLength) => {
        const plainText = getPlainText(html);
        if (plainText.length <= maxLength) {
            return html;
        }
        // Simple truncation - just show plain text truncated
        return plainText.substring(0, maxLength) + '...';
    };

    const handleCopyText = async (note) => {
        const text = getPlainText(note?.content || '');
        try {
            await navigator.clipboard.writeText(text);
        } catch (err) {
            try {
                const textarea = document.createElement('textarea');
                textarea.value = text;
                textarea.style.position = 'fixed';
                textarea.style.opacity = '0';
                document.body.appendChild(textarea);
                textarea.focus();
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
            } catch (fallbackErr) {
                console.error('Failed to copy text', fallbackErr);
            }
        } finally {
            setOpenMenuId(null);
        }
    };

    const handleSaveToDrive = async (note) => {
        const noteContent = getPlainText(note?.content || '');
        try {
            const res = await uploadTextFileToDrive({ content: noteContent, fileName: 'note.txt' });
            const url = res && res.id ? `https://drive.google.com/file/d/${res.id}/view` : 'https://drive.google.com/drive/my-drive';
            setDriveFileUrl(url);
            setDriveModalMessage('Note saved to Google Drive as note.txt');
            setShowDriveModal(true);
        } catch (error) {
            console.error('Failed to save note to Google Drive', error);
            alert(error.message || 'Failed to save note to Google Drive');
        } finally {
            setOpenMenuId(null);
        }
    };

    const MAX_NOTE_LENGTH = 700;

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

    // Keyboard shortcuts
    useKeyboardShortcut({ key: 'n', alt: true }, useCallback(() => {
        if (!isNoteInputVisible && !editingNote) {
            setIsNoteInputVisible(true);
        }
    }, [isNoteInputVisible, editingNote]), [isNoteInputVisible, editingNote]);

    useKeyboardShortcut({ key: 'Escape' }, useCallback(() => {
        if (isNoteInputVisible) {
            setIsNoteInputVisible(false);
            setNoteInput('');
        }
        if (editingNote) {
            setEditingNote(null);
            setEditInput('');
        }
        if (showDeleteModal) {
            setShowDeleteModal(false);
            setDeleteNoteId(null);
        }
    }, [isNoteInputVisible, editingNote, showDeleteModal]), [isNoteInputVisible, editingNote, showDeleteModal]);

    useKeyboardShortcut({ key: 'Enter', ctrl: true }, useCallback((e) => {
        const target = e.target;
        const isInEditor = target.closest('.rich-editor') || target.isContentEditable;
        
        // Only save if editor is open and user is not typing in the editor
        if (isNoteInputVisible && noteInput.trim() && !isInEditor) {
            e.preventDefault();
            handleAddNote();
        } else if (editingNote && editInput.trim() && !isInEditor) {
            e.preventDefault();
            handleUpdateNote();
        }
    }, [isNoteInputVisible, editingNote, noteInput, editInput, handleAddNote, handleUpdateNote]), [isNoteInputVisible, editingNote, noteInput, editInput, handleAddNote, handleUpdateNote]);

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
            
            <div id="notesList">

                <div id='filterContainer'>
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
            </div>
                {filteredNotes.length === 0 && (
                    <div id="emptyState" className="empty-state" style={{ display: 'block' }}>
                        <img src={manImg} alt="No notes" width="70" height="70" />
                        <h2>Too quiet here...</h2>
                        <p>Add a note to get started</p>
                    </div>
                )}
                {filteredNotes.map(note => {
                    const plainText = getPlainText(note.content || '');
                    const isLong = plainText.length > MAX_NOTE_LENGTH;
                    const isExpanded = expandedNotes.has(note.id);
                    const shouldTruncate = isLong && !isExpanded;
                    
                    return (
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
                                    <div className="menu-item" onClick={() => openEdit(note)}>
                                        <FaEdit />
                                        <span>Edit</span>
                                    </div>
                                    <div className="menu-item" onClick={() => handleCopyText(note)}>
                                        <FaCopy />
                                        <span>Copy text</span>
                                    </div>
                                    <div className="menu-item" onClick={() => handleSaveToDrive(note)}>
                                        <FaGoogleDrive />
                                        <span>Save to Google Drive</span>
                                    </div>
                                    <div className="menu-item" onClick={() => confirmDelete(note.id)}>
                                        <FaTrash />
                                        <span>Delete</span>
                                    </div>
                                </div>
                            </div>
                            <div className="note-content">
                                {shouldTruncate ? (
                                    <>
                                        <p>{truncateHTML(note.content || '', MAX_NOTE_LENGTH)}</p>
                                        <button className="show-all-btn" onClick={() => toggleNoteExpansion(note.id)}>
                                            Show All
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <p dangerouslySetInnerHTML={{ __html: note.content || '' }}></p>
                                        {isLong && (
                                            <button className="show-all-btn" onClick={() => toggleNoteExpansion(note.id)}>
                                                Show Less
                                            </button>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            <KeyboardHint shortcut={{ key: 'n', alt: true }} position="top" className="add-note-hint">
                <button
                    id="addNoteButton"
                    className="always-hover"
                    onClick={() => setIsNoteInputVisible(true)}
                >
                    <FaPlus />
                </button>
            </KeyboardHint>

            {/* Add Note Container */}
            {isNoteInputVisible && (
                <div id="noteContainer" className="show" style={{ display: 'block' }}>
                    <EditorProvider>
                        <RichEditor
                            id="noteInput"
                            placeholder="Write your thoughts..."
                            value={noteInput}
                            onChange={setNoteInput}
                        />
                        <div className="button-container">
                            <RichToolbar />
                            <KeyboardHint shortcut={{ key: 'Enter', ctrl: true }}>
                                <button id="savenote1" onClick={handleAddNote}>Save</button>
                            </KeyboardHint>
                            <KeyboardHint shortcut={{ key: 'Escape' }}>
                                <button id="cancelnote2" onClick={() => {
                                    setIsNoteInputVisible(false);
                                    setNoteInput('');
                                }}>Cancel</button>
                            </KeyboardHint>
                        </div>
                    </EditorProvider>
                </div>
            )}

            {/* Edit Note Container */}
            {editingNote && (
                <div id="editNoteContainer" style={{ display: 'block' }}>
                    <EditorProvider>
                        <RichEditor
                            id="editNoteInput"
                            value={editInput}
                            onChange={setEditInput}
                        />
                        <div className="button-container">
                            <RichToolbar />
                            <KeyboardHint shortcut={{ key: 'Enter', ctrl: true }}>
                                <button id="savenote1" onClick={handleUpdateNote}>Save</button>
                            </KeyboardHint>
                            <KeyboardHint shortcut={{ key: 'Escape' }}>
                                <button id="cancelnote2" onClick={() => {
                                    setEditingNote(null);
                                    setEditInput('');
                                }}>Cancel</button>
                            </KeyboardHint>
                        </div>
                    </EditorProvider>
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

            {/* Drive Success Modal */}
            {showDriveModal && (
                <div id="driveSuccessModal" className="modal" style={{ display: 'block' }}>
                    <div className="modal-content">
                        <h3 style={{ marginTop: 0 }}>Saved to Google Drive</h3>
                        <p>{driveModalMessage}</p>
                        <div className="modal-actions">
                            {driveFileUrl && (
                                <a href={driveFileUrl} target="_blank" rel="noreferrer">
                                    Open in Drive
                                </a>
                            )}
                            <button onClick={() => { setShowDriveModal(false); setDriveModalMessage(''); setDriveFileUrl(''); }}>OK</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;

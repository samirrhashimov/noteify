import React, { useRef, useEffect, useState, createContext, useContext } from 'react';
import {
    MdFormatBold,
    MdFormatItalic,
    MdFormatUnderlined,
    MdFormatStrikethrough,
    MdFormatListBulleted,
    MdLooksOne,
    MdLooks6
} from 'react-icons/md';

const EditorContext = createContext({
    activeFormats: {},
    execCommand: () => { }
});

export const EditorProvider = ({ children }) => {
    const [activeFormats, setActiveFormats] = useState({});

    const checkFormats = () => {
        const formats = {
            bold: document.queryCommandState('bold'),
            italic: document.queryCommandState('italic'),
            underline: document.queryCommandState('underline'),
            strikeThrough: document.queryCommandState('strikeThrough'),
            insertUnorderedList: document.queryCommandState('insertUnorderedList'),
            block: document.queryCommandValue('formatBlock') || 'p'
        };
        setActiveFormats(formats);
    };

    const execCommand = (command, value = null) => {
        document.execCommand(command, false, value);
        checkFormats();
        // Keep focus on editor
        const editor = document.querySelector('.rich-editor[contenteditable="true"]:focus');
        if (editor) {
            // ensure focus remains? usually execCommand keeps it.
        }
    };

    // Listen to selection changes globally when valid
    useEffect(() => {
        const handleSelectionChange = () => {
            // Only check if selection is inside a rich-editor
            const selection = window.getSelection();
            if (selection && selection.anchorNode) {
                const editor = selection.anchorNode.parentElement?.closest('.rich-editor');
                if (editor) {
                    checkFormats();
                }
            }
        };

        document.addEventListener('selectionchange', handleSelectionChange);
        return () => document.removeEventListener('selectionchange', handleSelectionChange);
    }, []);

    return (
        <EditorContext.Provider value={{ activeFormats, execCommand, checkFormats }}>
            {children}
        </EditorContext.Provider>
    );
};

export const RichEditor = ({ id, value, onChange, placeholder }) => {
    const editorRef = useRef(null);
    const isInternalUpdate = useRef(false);
    const { checkFormats } = useContext(EditorContext);

    useEffect(() => {
        if (editorRef.current) {
            if (value !== editorRef.current.innerHTML && !isInternalUpdate.current) {
                editorRef.current.innerHTML = value || '';
            }
            isInternalUpdate.current = false;
        }
    }, [value]);

    const handleInput = (e) => {
        isInternalUpdate.current = true;
        const html = e.currentTarget.innerHTML;
        onChange(html);
        checkFormats();
    };

    return (
        <div
            id={id}
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning
            className="rich-editor"
            onInput={handleInput}
            onKeyUp={checkFormats}
            onMouseUp={checkFormats}
            data-placeholder={placeholder}
            style={{
                width: '100%',
                height: 'calc(100vh - 113px)',
                margin: '0',
                padding: '7px',
                paddingBottom: '90px',
                border: 'none',
                outline: 'none',
                overflowY: 'auto',
                boxSizing: 'border-box',
                fontFamily: 'Inter, Sans-Serif',
                fontSize: '15.3px',
                textAlign: 'left'
            }}
        />
    );
};

export const RichToolbar = () => {
    const { activeFormats, execCommand } = useContext(EditorContext);
    const [showHeadingMenu, setShowHeadingMenu] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowHeadingMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const onMouseDown = (e) => {
        e.preventDefault();
    };

    const handleHeadingSelect = (tag) => {
        execCommand('formatBlock', tag);
        setShowHeadingMenu(false);
    };

    const activeBlock = activeFormats.block || 'p';
    let blockLabel = 'Normal';
    if (activeBlock.match(/^h[1-6]$/i)) {
        blockLabel = 'Heading ' + activeBlock.substring(1);
    }

    const iconStyle = (isActive) => ({
        fontSize: '24px',
        color: isActive ? '#0056b3' : '#555',
        transition: 'color 0.2s'
    });

    // Active background color
    const getBtnStyle = (isActive) => ({
        background: isActive ? '#e8f0fe' : 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '8px',
        margin: '0 2px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '4px',
        minWidth: 'auto',
        transition: 'background-color 0.2s'
    });

    const dropdownStyle = {
        position: 'absolute',
        bottom: '100%',
        left: '0',
        background: 'white',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        zIndex: 1000,
        minWidth: '150px',
        display: showHeadingMenu ? 'block' : 'none',
        padding: '6px 0',
        maxHeight: '250px',
        overflowY: 'auto'
    };

    const dropdownItemStyle = {
        padding: '10px 16px',
        cursor: 'pointer',
        color: '#333',
        display: 'block',
        textAlign: 'left',
        width: '100%',
        background: 'none',
        border: 'none',
        fontFamily: 'Inter, sans-serif'
    };

    return (
        <div className="rich-toolbar" style={{ display: 'flex', alignItems: 'center', marginRight: 'auto', position: 'relative' }}>
            {/* Heading Dropdown */}
            <div ref={dropdownRef} style={{ position: 'relative', marginRight: '6px' }}>
                <button
                    type="button"
                    onMouseDown={onMouseDown}
                    onClick={() => setShowHeadingMenu(!showHeadingMenu)}
                    style={{
                        ...getBtnStyle(false),
                        padding: '6px 12px',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#555',
                        border: '1px solid #e0e0e0',
                        minWidth: '100px',
                        justifyContent: 'space-between',
                        background: 'white'
                    }}
                >
                    <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '80px' }}>{blockLabel}</span>
                    <span style={{ fontSize: '10px', marginLeft: '6px' }}>▼</span>
                </button>
                <div style={dropdownStyle} className="heading-dropdown">
                    <button type="button" style={{ ...dropdownItemStyle, fontSize: '28px', fontWeight: 'bold' }} onMouseDown={onMouseDown} onClick={() => handleHeadingSelect('H1')}>Heading 1</button>
                    <button type="button" style={{ ...dropdownItemStyle, fontSize: '24px', fontWeight: 'bold' }} onMouseDown={onMouseDown} onClick={() => handleHeadingSelect('H2')}>Heading 2</button>
                    <button type="button" style={{ ...dropdownItemStyle, fontSize: '20px', fontWeight: 'bold' }} onMouseDown={onMouseDown} onClick={() => handleHeadingSelect('H3')}>Heading 3</button>
                    <button type="button" style={{ ...dropdownItemStyle, fontSize: '18px', fontWeight: 'bold' }} onMouseDown={onMouseDown} onClick={() => handleHeadingSelect('H4')}>Heading 4</button>
                    <button type="button" style={{ ...dropdownItemStyle, fontSize: '16px', fontWeight: 'bold' }} onMouseDown={onMouseDown} onClick={() => handleHeadingSelect('H5')}>Heading 5</button>
                    <button type="button" style={{ ...dropdownItemStyle, fontSize: '13px', fontWeight: 'bold' }} onMouseDown={onMouseDown} onClick={() => handleHeadingSelect('H6')}>Heading 6</button>
                    <div style={{ margin: '4px 10px', borderTop: '1px solid #eee' }}></div>
                    <button type="button" style={{ ...dropdownItemStyle, fontSize: '14px' }} onMouseDown={onMouseDown} onClick={() => handleHeadingSelect('P')}>Normal Text</button>
                </div>
            </div>

            <div style={{ width: '1px', height: '24px', background: '#eee', margin: '0 4px 0 2px' }}></div>

            <button type="button" style={getBtnStyle(activeFormats.bold)} onMouseDown={onMouseDown} onClick={() => execCommand('bold')} title="Bold">
                <MdFormatBold style={iconStyle(activeFormats.bold)} />
            </button>
            <button type="button" style={getBtnStyle(activeFormats.italic)} onMouseDown={onMouseDown} onClick={() => execCommand('italic')} title="Italic">
                <MdFormatItalic style={iconStyle(activeFormats.italic)} />
            </button>
            <button type="button" style={getBtnStyle(activeFormats.underline)} onMouseDown={onMouseDown} onClick={() => execCommand('underline')} title="Underline">
                <MdFormatUnderlined style={iconStyle(activeFormats.underline)} />
            </button>
            <button type="button" style={getBtnStyle(activeFormats.strikeThrough)} onMouseDown={onMouseDown} onClick={() => execCommand('strikeThrough')} title="Strikethrough">
                <MdFormatStrikethrough style={iconStyle(activeFormats.strikeThrough)} />
            </button>
            <button type="button" style={getBtnStyle(activeFormats.insertUnorderedList)} onMouseDown={onMouseDown} onClick={() => execCommand('insertUnorderedList')} title="Bullet List">
                <MdFormatListBulleted style={iconStyle(activeFormats.insertUnorderedList)} />
            </button>
        </div>
    );
};

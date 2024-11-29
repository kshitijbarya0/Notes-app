import React, { useState, useEffect } from 'react';
import { Avatar, Space, Modal, Input, message } from 'antd';
import { UserOutlined, PlusCircleFilled, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';
function Dashboard() {
    const navigate = useNavigate();
    const currUser = JSON.parse(localStorage.getItem('currentUser'));

    const [notes, setNotes] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalType, setModalType] = useState('create'); // "create" or "edit" or "view"
    const [selectedNote, setSelectedNote] = useState(null);
    const [noteTitle, setNoteTitle] = useState('');
    const [noteDescription, setNoteDescription] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const userNotesKey = `notes_${currUser.email}`;

    useEffect(() => {
        const storedNotes = JSON.parse(localStorage.getItem(userNotesKey)) || [];
        setNotes(storedNotes);
    }, [userNotesKey]);

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        navigate('/login');
    };

    const openModal = (type, note = null) => {
        setModalType(type);
        setIsModalVisible(true);

        if (note) {
            setSelectedNote(note);
            setNoteTitle(note.title);
            setNoteDescription(note.description);
        } else {
            setSelectedNote(null);
            setNoteTitle('');
            setNoteDescription('');
        }
    };

    const handleSaveNote = () => {
        if (!noteTitle.trim() || !noteDescription.trim()) {
            message.error('Both Title and Description are required.');
            return;
        }

        if (modalType === 'create') {
            const currentDate = new Date().toLocaleString();
            const newNote = { title: noteTitle, description: noteDescription, date: currentDate };

            const updatedNotes = [...notes, newNote];
            setNotes(updatedNotes);
            localStorage.setItem(userNotesKey, JSON.stringify(updatedNotes));
            message.success('Note created successfully!');
        }

        if (modalType === 'edit' && selectedNote) {
            const updatedNotes = notes.map(note =>
                note === selectedNote ? { ...note, title: noteTitle, description: noteDescription } : note
            );
            setNotes(updatedNotes);
            localStorage.setItem(userNotesKey, JSON.stringify(updatedNotes));
            message.success('Note updated successfully!');
        }
        setIsModalVisible(false);
        setNoteTitle('');
        setNoteDescription('');
    };

    const showModal = (type, note = null) => {
        setIsModalOpen(true);
        if (type === 'view' && note) {
            setSelectedNote(note);
            setNoteTitle(note.title);
            setNoteDescription(note.description);
        }
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const cancel = () => {
        setIsModalOpen(false);
    };
    const handleDeleteNote = (noteToDelete) => {
        const updatedNotes = notes.filter(note => note !== noteToDelete);
        setNotes(updatedNotes);
        localStorage.setItem(userNotesKey, JSON.stringify(updatedNotes));
        message.success('Note deleted successfully!');
    };
    const handleCancel = () => {
        setIsModalVisible(false);
        setNoteTitle('');
        setNoteDescription('');
    };
    return (
        <div className="dashboard-container">
            <div className="nav_bar">
                <div className="nav_logo">
                    <h3>Logo</h3>
                </div>
                <div className="navUserProfile">
                    <Space direction="vertical" size={0}>
                        <Space wrap size={2}>
                            <p>{currUser.name}</p>
                            <Avatar size={30} icon={<UserOutlined />} />
                        </Space>
                    </Space>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </div>
            <div className="CRED_buttons">
                <button>Add notes</button>
                <button>Add notes</button>
                <button>Add notes</button>
            </div>
            <div className='Notes_section'>
                <div className='Create_button'>
                    <h3>Create Notes</h3>
                    <PlusCircleFilled onClick={() => setIsModalVisible(true)} />
                </div>
                <div className='List_notes'>
                    {notes.map((note, index) => (
                        <div className="card" key={index}>
                            <div className="card-content">
                                <h2 className="card-title">{note.title.slice(0, 20)}...</h2>
                                <p className="card-description">{note.description.slice(0, 50)}...</p>
                                <button onClick={() => showModal('view', note)} > <EyeOutlined />View</button>
                                <button onClick={() => openModal('edit', note)} > <EditOutlined />Edit</button>
                                <button onClick={() => handleDeleteNote(note)} > <DeleteOutlined />Delete</button>
                                <small>{note.date}</small>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Modal
                title="View Note"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={cancel}
                footer={null}
            >
                <h2>{noteTitle}</h2>
                <p>{noteDescription}</p>
            </Modal>

            <Modal
                title="Create Note"
                open={isModalVisible}
                onOk={handleSaveNote}
                onCancel={handleCancel}
                okText="Create"
                cancelText="Cancel"
            >
                <Input
                    placeholder="Enter Title"
                    value={noteTitle}
                    required
                    onChange={(e) => setNoteTitle(e.target.value)}
                    style={{ marginBottom: '10px' }}
                />
                <Input.TextArea
                    placeholder="Enter Notes"
                    value={noteDescription}
                    required
                    onChange={(e) => setNoteDescription(e.target.value)}
                    rows={10}
                />
            </Modal>
        </div>
    );
}

export default Dashboard;

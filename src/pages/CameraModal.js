import React from 'react';
import Modal from 'react-modal';
import './Modal.css';

const customModalStyles = {
    content: {
        width: '50%',
        height: '50%',
        top: '25%',
        left: '25%',
    },
};

function CameraModal({ isOpen, closeModal, onTakePicture }) {
    const handleTakePicture = () => {
        onTakePicture();
        closeModal();
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            style={customModalStyles}
            contentLabel="Camera Modal"
        >
            <h2>Take a Picture</h2>
            <button onClick={handleTakePicture}>Take Picture</button>
        </Modal>
    );
}

export default CameraModal;

import React from 'react';

type ConfirmModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
};

const DeleteCharModal = ({ isOpen, onClose, onConfirm, title, message}: ConfirmModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{title}</h2>
                <p>{message}</p>
                <div className="modal-buttons">
                    <button className="cancel-button" onClick={onClose}>Cancel</button>
                    <button className="confirm-button" onClick={onConfirm}>Delete Character</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteCharModal;
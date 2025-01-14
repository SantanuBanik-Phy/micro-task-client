
import React from 'react';

const ConfirmationModal = ({ title, message, closeModal, handleConfirmation }) => {
    return (
        <div className="modal modal-open">
            <div className="modal-box">
                <h3 className="font-bold text-lg">{title}</h3>
                <p className="py-4">{message}</p>
                <div className="modal-action">
                    <button onClick={closeModal} className="btn btn-outline">Cancel</button>
                    <button onClick={handleConfirmation} className="btn btn-error">Confirm</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
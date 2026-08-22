import React, { useEffect, useRef } from 'react';

const ConfirmDialog = ({ title, message, confirmLabel = 'Confirm', onConfirm, onCancel }) => {
    const dialogRef = useRef(null);
    const cancelRef = useRef(null);

    useEffect(() => {
        const previouslyFocused = document.activeElement;
        if (cancelRef.current) cancelRef.current.focus();

        const onKeyDown = (event) => {
            if (event.key === 'Escape') {
                onCancel();
                return;
            }
            if (event.key !== 'Tab' || !dialogRef.current) return;

            const focusables = dialogRef.current.querySelectorAll('button');
            if (focusables.length === 0) return;
            const first = focusables[0];
            const last = focusables[focusables.length - 1];

            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        };

        document.addEventListener('keydown', onKeyDown);
        return () => {
            document.removeEventListener('keydown', onKeyDown);
            if (previouslyFocused && previouslyFocused.focus) previouslyFocused.focus();
        };
    }, [onCancel]);

    const onOverlayMouseDown = (event) => {
        if (event.target === event.currentTarget) onCancel();
    };

    return (
        <div className="overlay" onMouseDown={onOverlayMouseDown}>
            <div
                className="dialog"
                role="dialog"
                aria-modal="true"
                aria-labelledby="confirm-dialog-title"
                ref={dialogRef}
            >
                <h2 className="dialog__title" id="confirm-dialog-title">{title}</h2>
                <p className="dialog__body">{message}</p>
                <div className="dialog__actions">
                    <button type="button" className="btn btn--ghost" onClick={onCancel} ref={cancelRef}>
                        Cancel
                    </button>
                    <button type="button" className="btn btn--danger" onClick={onConfirm}>
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDialog;

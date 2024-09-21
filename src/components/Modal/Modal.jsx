import React, { useRef, useState, useEffect, useCallback } from 'react';
import { X } from 'lucide-react';
import { Dialog } from '@/components/ui/dialog';

const Modal = ({ isOpen, onClose, children, title }) => {
  const modalRef = useRef(null);
  const [isInteractingWithPortal, setIsInteractingWithPortal] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handleClickOutside = useCallback(
    (event) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        !isInteractingWithPortal
      ) {
        setIsVisible(false);
        setTimeout(onClose, 300);
      }
    },
    [onClose, isInteractingWithPortal]
  );

  const handleEscapeKey = useCallback(
    (event) => {
      if (event.key === 'Escape') {
        setIsVisible(false);
        setTimeout(onClose, 300);
      }
    },
    [onClose]
  );

  const handlePortalInteraction = useCallback(
    () => setIsInteractingWithPortal(true),
    []
  );
  const handlePortalInteractionEnd = useCallback(
    () => setIsInteractingWithPortal(false),
    []
  );

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
      document.addEventListener('focusin', handlePortalInteraction);
      document.addEventListener('focusout', handlePortalInteractionEnd);
    } else {
      setIsVisible(false);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
      document.removeEventListener('focusin', handlePortalInteraction);
      document.removeEventListener('focusout', handlePortalInteractionEnd);
    };
  }, [
    isOpen,
    handleClickOutside,
    handleEscapeKey,
    handlePortalInteraction,
    handlePortalInteractionEnd,
  ]);

  useEffect(() => {
    if (isOpen) {
      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements?.length) {
        focusableElements[0].focus();
      }
    }
  }, [isOpen]);

  if (!isOpen && !isVisible) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <div
        className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          ref={modalRef}
          className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-2xl mx-4 my-8 relative overflow-auto max-h-[90vh] transform transition-all duration-300 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <h2 id="modal-title" className="text-xl font-semibold mb-4">
            {title}
          </h2>
          <button
            onClick={() => {
              setIsVisible(false);
              setTimeout(onClose, 300);
            }}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100 transition-colors"
            aria-label="Close"
          >
            <X size={24} />
          </button>
          <div className="mt-2">{children}</div>
        </div>
      </div>
    </Dialog>
  );
};

export default Modal;

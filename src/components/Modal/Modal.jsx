import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  const modalRef = React.useRef(null);
  const [isInteractingWithPortal, setIsInteractingWithPortal] =
    React.useState(false);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        !isInteractingWithPortal
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, isInteractingWithPortal]);

  const handlePortalInteraction = () => setIsInteractingWithPortal(true);
  const handlePortalInteractionEnd = () => setIsInteractingWithPortal(false);

  React.useEffect(() => {
    document.addEventListener('focusin', handlePortalInteraction);
    document.addEventListener('focusout', handlePortalInteractionEnd);

    return () => {
      document.removeEventListener('focusin', handlePortalInteraction);
      document.removeEventListener('focusout', handlePortalInteractionEnd);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="relative bg-white p-6 rounded shadow-lg w-full max-w-2xl mx-4 overflow-auto max-h-[90vh]"
      >
        {/* Sticky Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 float-right right-4 text-gray-500 hover:text-gray-700 p-2 bg-gray-100 rounded-m"
          aria-label="Close"
          style={{ zIndex: 1000 }} // Ensure the button stays on top of the content
        >
          &#10005; {/* X symbol */}
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;

import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  const modalRef = React.useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50'>
      <div
        ref={modalRef}
        className='bg-white p-6 rounded shadow-lg w-full max-w-2xl mx-4 overflow-auto max-h-[90vh]'
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;

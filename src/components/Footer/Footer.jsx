import React from "react";
import Modal from "../Modal/Modal";
import ModalRegulamento from "../Modal/ModalRegulamento";

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <footer className='w-full bg-black h-11 text-white flex justify-around items-center'>
      <p>Todos os direitos reservados • 2024</p>
      <p onClick={openModal} className='cursor-pointer'>
        Regulamento
      </p>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalRegulamento />
      </Modal>
    </footer>
  );
};

export default Footer;

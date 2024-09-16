import React from 'react';
import { Button } from '../../ui/button';
import ModalFormCompra from '@/components/Modal/ModalFormCompra';
import Modal from '@/components/Modal/Modal';

const FormButtons = ({ loading }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex justify-center items-center mt-8 gap-10">
      <Button onClick={openModal}>Adicionar Compra</Button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalFormCompra />
      </Modal>
      {loading ? (
        <Button disabled>Finalizar</Button>
      ) : (
        <Button>Finalizar</Button>
      )}
    </div>
  );
};

export default FormButtons;

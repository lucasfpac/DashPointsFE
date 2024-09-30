import React, { useContext } from "react";
import { Button } from "../../ui/button";
import ModalFormCompra from "@/components/Modal/ModalFormCompra";
import Modal from "@/components/Modal/Modal";
import VoucherModal from "@/components/Modal/ModalVoucher";
import { CustomerContext } from "@/CustomerContext";

const FormButtons = ({ loading, totalCompras, targetValue }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isVoucherModalOpen, setIsVoucherModalOpen] = React.useState(false);
  const { data, hasActiveEvent } = useContext(CustomerContext);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openVoucherModal = () => setIsVoucherModalOpen(true);
  const closeVoucherModal = () => setIsVoucherModalOpen(false);

  const isTargetReached = totalCompras >= targetValue;

  return (
    <div className='flex justify-center items-center mt-8 gap-10'>
      <Button onClick={openModal} disabled={!hasActiveEvent}>
        Adicionar Compra
      </Button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalFormCompra onClose={closeModal} />
      </Modal>
      {loading ? (
        <Button disabled>Finalizar</Button>
      ) : (
        <Button
          onClick={openVoucherModal}
          disabled={!isTargetReached || !hasActiveEvent}
        >
          Finalizar
        </Button>
      )}
      <VoucherModal
        isOpen={isVoucherModalOpen}
        onClose={closeVoucherModal}
        customerData={data}
        totalCompras={totalCompras}
      />
    </div>
  );
};

export default FormButtons;

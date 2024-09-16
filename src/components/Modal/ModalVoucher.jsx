import React from 'react';
import { Button } from '../ui/button';
import Modal from './Modal';

const VoucherModal = ({ isOpen, onClose, customerData, totalCompras }) => {
  const handlePrint = () => {
    const style = document.createElement('style');
    style.innerHTML = `
      @page {
        size: 62mm 100mm;
        margin: 0;
      }
      body {
        width: 62mm;
        height: 100mm;
        margin: 0;
        padding: 0;
      }
    `;
    document.head.appendChild(style);

    window.print();

    document.head.removeChild(style);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6 bg-white rounded-lg">
        <div className="print:block print:absolute print:top-0 print:left-0 print:right-0">
          <div className="receipt w-[62mm] mx-auto p-5 border border-gray-300 shadow-md font-mono print:w-[62mm] print:h-[100mm] print:p-0 print:border-0 print:shadow-none">
            <div className="text-center mb-5">
              <h2 className="text-lg font-bold">Comprovante de Compras</h2>
              <p className="text-sm">{new Date().toLocaleDateString()}</p>
            </div>
            <div className="mb-5">
              <p>
                <strong>Nome:</strong> {customerData.name}
              </p>
              <p>
                <strong>CPF:</strong> {customerData.cpf}
              </p>
              <p>
                <strong>Total de Compras:</strong> R$ {totalCompras.toFixed(2)}
              </p>
            </div>
            <div className="text-center text-sm">
              <p>Obrigado pela sua compra!</p>
              <p>Volte sempre</p>
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-4 print:hidden">
          <Button onClick={handlePrint}>Imprimir</Button>
          <Button onClick={onClose}>Fechar</Button>
        </div>
      </div>
    </Modal>
  );
};

export default VoucherModal;

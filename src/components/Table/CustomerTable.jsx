import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import PrintLayout from '../Voucher/VoucherPrintLayout';
import { Button } from '../ui/button';

const CustomerTable = ({
  totalCompras,
  purchases,
  customerData,
  loading,
  error,
}) => {
  const openPrintWindow = (invoice, customer) => {
    const printWindow = window.open('', '', 'width=300,height=500');

    const content = PrintLayout({ invoice, customer });

    printWindow.document.open();
    printWindow.document.write(content);
    printWindow.document.close();

    printWindow.onload = () => {
      printWindow.focus();
      printWindow.print();
      printWindow.onafterprint = () => printWindow.close();
    };
  };

  if (loading) {
    return <p>Carregando dados...</p>;
  }

  if (error) {
    return <p>Erro ao carregar dados: {error}</p>;
  }

  if (!purchases || purchases.length === 0) {
    return <p>Não há compras disponíveis.</p>;
  }

  return (
    <div>
      <Table>
        <TableCaption>Lista de Compras Realizadas.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">NF</TableHead>
            <TableHead>Loja</TableHead>
            <TableHead className="text-right">Valor</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {purchases.map((purchase) => (
            <TableRow key={purchase.id}>
              <TableCell className="font-medium">{purchase.invoice}</TableCell>
              <TableCell>{purchase.store}</TableCell>
              <TableCell className="text-right">
                R$ {Number(purchase.value).toFixed(2)}
              </TableCell>
              <TableCell className="text-right">
                <Button onClick={() => openPrintWindow(purchase, customerData)}>
                  Imprimir Voucher
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">
              R$ {Number(totalCompras).toFixed(2)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default CustomerTable;

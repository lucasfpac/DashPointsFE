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
import { CustomerContext } from '@/CustomerContext';

export const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

const formatDate = (dateString) => {
  const [year, month, day] = dateString.split('-');
  return `${day}/${month}/${year}`;
};

const CustomerTable = ({
  totalCompras,
  purchases,
  customerData,
  loading,
  error,
}) => {
  const { hasActiveEvent, activeEventId } = React.useContext(CustomerContext);

  const openPrintWindow = (invoice, customer) => {
    const purchase = purchases.find((p) => p.invoice === invoice);
    if (!purchase) {
      alert('Compra não encontrada.');
      return;
    }
    const printWindow = window.open('', '', 'width=300,height=500');
    const content = PrintLayout({ purchase, customer });

    printWindow.document.open();
    printWindow.document.write(content);
    printWindow.document.close();

    printWindow.onload = () => {
      printWindow.focus();
      printWindow.print();
      printWindow.onafterprint = () => printWindow.close();
    };
  };

  const currentPurchases = Array.isArray(purchases)
    ? purchases.filter((purchase) => purchase.event === activeEventId)
    : [];

  if (loading) {
    return <p>Carregando dados...</p>;
  }

  if (!hasActiveEvent) {
    return <p className="text-center">Não há eventos em andamento</p>;
  }

  if (!currentPurchases || currentPurchases.length === 0) {
    return <p className="text-center">Não há compras disponíveis.</p>;
  }

  if (error) {
    return <p>Erro ao carregar dados: {error}</p>;
  }

  return (
    <div>
      <Table>
        <TableCaption>Lista de Compras Realizadas.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">NF</TableHead>
            <TableHead>Loja</TableHead>
            <TableHead>Data</TableHead>
            <TableHead className="text-right">Valor</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentPurchases.map((purchase) => (
            <TableRow key={purchase.id}>
              <TableCell className="font-medium">{purchase.invoice}</TableCell>
              <TableCell>{purchase.store_name}</TableCell>
              <TableCell>{formatDate(purchase.date)}</TableCell>
              <TableCell className="text-right">
                {formatCurrency(purchase.value)}{' '}
              </TableCell>
              <TableCell className="text-right">
                <Button
                  onClick={() =>
                    openPrintWindow(purchase.invoice, customerData)
                  }
                >
                  Imprimir Voucher
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>Total</TableCell>
            <TableCell className="text-right">
              {formatCurrency(totalCompras)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default CustomerTable;

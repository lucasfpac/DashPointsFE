import React, { useContext } from 'react';
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
import { CustomerContext } from '@/CustomerContext';
import PrintLayout from '../Voucher/VoucherPrintLayout';
import { Button } from '../ui/button';

const CustomerTable = ({ totalCompras }) => {
  const { data } = useContext(CustomerContext);

  const customer = data[0];

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

  if (!data || !data[0] || !data[0].compras) {
    return <p>Carregando dados...</p>;
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
          {data[0].compras.map((invoice) => (
            <TableRow key={invoice.nf}>
              <TableCell className="font-medium">{invoice.nf}</TableCell>
              <TableCell>{invoice.loja}</TableCell>
              <TableCell className="text-right">
                R$ {invoice.valor.toFixed(2)}
              </TableCell>
              <TableCell className="text-right">
                <Button onClick={() => openPrintWindow(invoice, customer)}>
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
              R$ {totalCompras.toFixed(2)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default CustomerTable;

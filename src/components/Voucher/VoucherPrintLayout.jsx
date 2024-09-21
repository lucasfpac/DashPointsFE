import React from 'react';
import ReactDOMServer from 'react-dom/server';
import VoucherContent from './VoucherContent';

const PrintLayout = ({ purchase, customer }) => {
  const purchaseHTML = ReactDOMServer.renderToString(
    <VoucherContent purchase={purchase} customer={customer} />
  );

  return `
    <html>
      <head>
        <title>VOUCHER PARA TROCA</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            width: 62mm;
            height: 100mm;
            padding: 10px;
            margin: 0;
            box-sizing: border-box;
          }
          h1 {
            font-size: 16px;
            text-align: center;
            margin-bottom: 5px;
          }
          hr {
            margin: 10px 0;
            border: 1px solid #000;
          }
          .section {
            margin-bottom: 10px;
          }
          p {
            font-size: 14px;
            margin: 2px 0;
          }
          .center {
            text-align: center;
            font-size: 16px;
            font-weight: bold;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        ${purchaseHTML}
      </body>
    </html>
  `;
};

export default PrintLayout;

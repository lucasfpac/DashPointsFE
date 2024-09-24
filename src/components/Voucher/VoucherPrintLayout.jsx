import React from "react";
import ReactDOMServer from "react-dom/server";
import VoucherContent from "./VoucherContent";

const PrintLayout = ({ purchase, customer }) => {
  const purchaseHTML = ReactDOMServer.renderToString(
    <VoucherContent purchase={purchase} customer={customer} />
  );

  return `
    <!DOCTYPE html>
      <html lang="pt-br">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Voucher</title>
          <style>
              
              @media print {
                  body {
                      margin: 0;
                      padding: 0;
                  }
              }

              .voucher {
                  width: 62mm;
                  height: 100mm;
                  padding: 5px;
                  box-sizing: border-box;
                  font-family: Arial, sans-serif;
                  border: 1px dashed #333;
                  display: flex;
                  flex-direction: column;
                  justify-content: space-between;
              }

              .voucher-info, .voucher-personal-info, .voucher-purchase-info, .voucher-footer {
                  margin: 5px 0;
                  font-size: 10px;
                  color: #333;
              }

              .voucher-info p, .voucher-personal-info p, .voucher-purchase-info p, .voucher-footer p {
                  margin: 2px 0;
              }

              .separator {
                  margin: 5px 0;
                  border-bottom: 1px solid #000;
              }

              .voucher-confirmation-code {
                  text-align: center;
                  margin-top: 5px;
              }

              .voucher-confirmation-code p {
                  font-size: 12px;
                  font-weight: bold;
                  color: #333;
              }

              .centered-bold {
                  text-align: center;
                  font-weight: bold;
              }

              .centered {
                  text-align: center;
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

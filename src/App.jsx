import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import './App.css';
import Cadastro from './components/Cadastro/Cadastro';
import ReimprimirVoucher from './components/Cadastro/CustomerSearch';
import ProtectedRoute from './components/Helper/ProtectedRoute';
import { CustomerStorage } from './CustomerContext';
import CustomerInfo from './components/Cadastro/CustomerInfo';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <CustomerStorage>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="cadastro/*" element={<Cadastro />} />
            <Route
              path="cadastro/compra"
              element={
                <ProtectedRoute>
                  <CustomerInfo />
                </ProtectedRoute>
              }
            />
            <Route path="/reimprimir-voucher" element={<ReimprimirVoucher />} />
          </Routes>
        </CustomerStorage>
      </BrowserRouter>
    </div>
  );
};

export default App;

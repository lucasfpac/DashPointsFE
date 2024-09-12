import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import "./App.css";
import Cadastro from "./components/Cadastro/Cadastro";
import ReimprimirVoucher from "./components/Voucher/ReimprimirVoucher";
import CadastroCompra from "./components/Cadastro/CadastroCompra";

const App = () => {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cadastro' element={<Cadastro />} />
          <Route path='/cadastro-compra' element={<CadastroCompra />} />
          <Route path='/reimprimir-voucher' element={<ReimprimirVoucher />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

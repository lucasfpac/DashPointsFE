import React from "react";
import logo from "../../assets/img/logo.png";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";

const Home = () => {
  return (
    <section className='flex flex-col min-h-screen bg-black'>
      <div className='flex flex-col justify-center items-center flex-grow'>
        <div className='flex flex-col items-center justify-center text-white font-bold'>
          <div className='w-[500px] max-w-full'>
            <img src={logo} alt='Logo' />
          </div>
          <p>Seja bem-vindo!</p>
          <p>
            Clique no botão abaixo, preencha os dados e cadastre sua compra em
            poucos cliques
          </p>
        </div>
        <div className='flex flex-col gap-5 mt-5'>
          <Link to='/cadastro-compra'>
            <Button variant='outline'>CADASTRAR COMPRA</Button>
          </Link>
          <Link to='/reimprimir-voucher'>
            <Button variant='outline'>REIMPRIMIR VOUCHER</Button>
          </Link>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default Home;

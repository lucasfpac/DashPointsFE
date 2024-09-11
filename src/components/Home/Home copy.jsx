import React from "react";
import logo from "../../assets/img/logo.png";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";

const Home = (props) => {
  return (
    <section className='bg-black h-full'>
      <div className='flex flex-col justify-center items-center'>
        <div className='flex flex-col items-center justify-center text-white font-bold'>
          <div className='w-[500px] max-w-full'>
            <img src={logo} alt='' />
          </div>
          <p>Seja bem-vindo!</p>
          <p>
            Clique no botão abaixo, preencha os dados e cadastre sua compra em
            poucos cliques
          </p>
        </div>
        <div className='flex flex-col gap-5 mt-5'>
          <Link to='/cadastro'>
            <Button variant='outline'>CADASTRAR COMPRA</Button>
          </Link>
          <Link to='/reimprimir-voucher'>
            <Button variant='outline'>REIMPRIMIR VOUCHER</Button>
          </Link>
        </div>
      </div>
      <div className='mt-72'>
        <Footer />
      </div>
    </section>
  );
};

export default Home;

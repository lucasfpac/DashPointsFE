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
          <div className='w-[300px] max-w-full'>
            <img src={logo} alt='Logo' />
          </div>
          <p>Seja bem-vindo!</p>
          <p className='text-center p-4'>
            Clique no botão abaixo, preencha os dados e cadastre sua compra em
            poucos cliques
          </p>
        </div>
        <div className='flex flex-col gap-5 mt-7 w-[300px] max-w-full'>
          <Link to='/cadastro'>
            <Button variant='outline' className='w-full'>
              CADASTRAR CLIENTE
            </Button>
          </Link>
          <Link to='/busca'>
            <Button variant='outline' className='w-full'>
              BUSCAR CLIENTE
            </Button>
          </Link>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default Home;

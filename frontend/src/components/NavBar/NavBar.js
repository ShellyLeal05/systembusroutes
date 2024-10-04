// components/NavBar/NavBar.js
import React from 'react';
import logoBoaVista from '../../assets/logo_boa_vista.png'; // Ajuste o caminho para sua imagem

const NavBar = () => {
  return (
    <nav className="bg-green-600 py-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="text-white text-2xl font-bold">
          <img src={logoBoaVista} alt="Logo Boa Vista" className="h-12 inline-block mr-2" />
          Rotas da cidade de Boa Vista
        </div>
        <div className="text-white">
          <a href="#rotas" className="mr-6 hover:text-gray-300">Todas as Rotas</a>
          <a href="#salvas" className="mr-6 hover:text-gray-300">Rotas Salvas</a>
          <a href="#atualizacoes" className="hover:text-gray-300">Atualizações</a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;


//BACKUP

/*
import React from 'react';
import logoBoaVista from '../../assets/logo_boa_vista.png'; // Importa a logo da cidade

function NavBar() {
  return (
    <nav className="bg-blue-500 p-4 flex justify-between items-center">
      <div className="flex items-center">
        <img src={logoBoaVista} alt="Logo Boa Vista" className="h-12" />
      </div>
      <ul className="flex space-x-4 text-white font-semibold">
        <li>Todas as Rotas</li>
        <li>Rotas Salvas</li>
        <li>Atualizações</li>
      </ul>
    </nav>
  );
}

export default NavBar;
*/
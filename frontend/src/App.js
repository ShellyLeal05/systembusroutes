import React from 'react';
import NavBar from './components/NavBar/NavBar';
import Form from './components/Form/Form'; // Mantemos o Form
import Map from './components/Map/Map';
import './App.css'; // Corrigida a importação do App.css

function App() {
  return (
    <div className="App bg-city-logo bg-cover bg-opacity-50 min-h-screen">
      {/* Define o fundo e altura mínima */}
      <NavBar /> {/* Mantemos a NavBar */}
      
      <header className="bg-primary text-white p-4">
        {/* Barra superior em verde com texto branco */}
        <div className="container mx-auto flex justify-between items-center">
          {/* Caminho da logo ajustado para src/assets */}
          <img src="./assets/boa_vista_logo.png" alt="Boa Vista Logo" className="h-12" /> 
          <h1 className="text-xl font-bold">Rotas da cidade de Boa Vista</h1>
        </div>
      </header>

      <div className="main-content flex flex-col items-center p-6">
        <h2 className="text-3xl font-semibold mb-6 text-center">Para onde estamos indo?</h2>
        {/* O formulário para buscar rotas */}
        <Form />
      </div>
      
      <footer className="bg-secondary text-white text-center p-4 mt-auto">
        <p>Mapa de Boa Vista</p>
        {/* Mantemos o Map */}
        <Map />
      </footer>
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import axios from 'axios';

const Form = () => {
  const [busCode, setBusCode] = useState('');
  const [routeData, setRouteData] = useState(null);
  const [nextBusInfo, setNextBusInfo] = useState(null);
  const [currentTime, setCurrentTime] = useState('');
  const [day, setDay] = useState('');

  // Função para buscar a rota pelo busCode
  const fetchRouteByBusCode = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/bus/route/${busCode}`);
      setRouteData(response.data);  // Armazena os dados da rota no estado
    } catch (error) {
      console.error('Erro ao buscar rota:', error);
    }
  };

  // Função para buscar o próximo ônibus com base no busCode, horário atual e dia
  const fetchNextBus = async () => {
    try {
      const response = await axios.get('http://localhost:5000/bus/nextbus', {
        params: {
          busCode,  // Adiciona o busCode à requisição
          currentTime,
          day,
        },
      });
      setNextBusInfo(response.data);
    } catch (error) {
      console.error('Erro ao buscar próximo ônibus:', error);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="mb-6">
        <label className="block text-sm text-gray-700 font-semibold">Código do Ônibus</label>
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
          value={busCode}
          onChange={(e) => setBusCode(e.target.value)}
          placeholder="Digite o código do ônibus"
        />
        <button 
          className="mt-3 w-full bg-blue-500 text-white py-3 rounded-lg transition-all hover:bg-blue-600 hover:shadow-lg"
          onClick={fetchRouteByBusCode}
        >
          Buscar Rota
        </button>
      </div>

      {routeData && (
        <div className="mb-6 bg-gray-100 p-4 rounded-lg">
          <h2 className="text-lg font-bold text-gray-800">Rota: {routeData.origin} para {routeData.destination}</h2>
          <ul className="list-disc list-inside">
            {routeData.routes.map((route, index) => (
              <li key={index} className="mt-2">
                <strong>Dia:</strong> {route.days}, <strong>Horários:</strong> {route.times.join(', ')}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mb-6">
        <label className="block text-sm text-gray-700 font-semibold">Horário</label>
        <input
          type="time"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
          value={currentTime}
          onChange={(e) => setCurrentTime(e.target.value)}
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm text-gray-700 font-semibold">Dia da Semana</label>
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
          value={day}
          onChange={(e) => setDay(e.target.value)}
          placeholder="Ex: Dias Úteis, Sábados, Domingos"
        />
        <button 
          className="mt-3 w-full bg-green-500 text-white py-3 rounded-lg transition-all hover:bg-green-600 hover:shadow-lg"
          onClick={fetchNextBus}
        >
          Buscar Próximo Ônibus
        </button>
      </div>

      {nextBusInfo && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <h2 className="text-lg font-bold text-gray-800">Próximo ônibus para {nextBusInfo.origin} - {nextBusInfo.destination}</h2>
          <p><strong>Horário do próximo ônibus:</strong> {nextBusInfo.nextBusTime}</p>
          <p><strong>Faltam:</strong> {nextBusInfo.remainingTime} minutos</p>
        </div>
      )}
    </div>
  );
};

export default Form;


// BACKUp
/*
import React, { useState } from 'react';
import axios from 'axios';

const Form = () => {
  const [busCode, setBusCode] = useState('');
  const [routeData, setRouteData] = useState(null);
  const [nextBusInfo, setNextBusInfo] = useState(null);
  const [currentTime, setCurrentTime] = useState('');
  const [day, setDay] = useState('');

  // Função para buscar a rota pelo busCode
  const fetchRouteByBusCode = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/bus/route/${busCode}`);
      setRouteData(response.data);  // Armazena os dados da rota no estado
    } catch (error) {
      console.error('Erro ao buscar rota:', error);
    }
  };

  // Função para buscar o próximo ônibus com base no busCode, horário atual e dia
  const fetchNextBus = async () => {
    try {
      const response = await axios.get('http://localhost:5000/bus/nextbus', {
        params: {
          busCode,  // Adiciona o busCode à requisição
          currentTime,
          day,
        },
      });
      setNextBusInfo(response.data);
    } catch (error) {
      console.error('Erro ao buscar próximo ônibus:', error);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="mb-4">
        <label className="block text-sm text-gray-700">Código do Ônibus</label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-lg"
          value={busCode}
          onChange={(e) => setBusCode(e.target.value)}
          placeholder="Digite o código do ônibus"
        />
        <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg" onClick={fetchRouteByBusCode}>Buscar Rota</button>
      </div>

      {routeData && (
        <div className="mb-4">
          <h2 className="text-lg font-bold">Rota: {routeData.origin} para {routeData.destination}</h2>
          <ul>
            {routeData.routes.map((route, index) => (
              <li key={index}>
                <strong>Dia:</strong> {route.days}, <strong>Horários:</strong> {route.times.join(', ')}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mb-4">
        <label className="block text-sm text-gray-700">Horário</label>
        <input
          type="time"
          className="w-full p-2 border border-gray-300 rounded-lg"
          value={currentTime}
          onChange={(e) => setCurrentTime(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm text-gray-700">Dia da Semana</label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-lg"
          value={day}
          onChange={(e) => setDay(e.target.value)}
          placeholder="Ex: Dias Úteis, Sábados, Domingos"
        />
        <button className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg" onClick={fetchNextBus}>Buscar Próximo Ônibus</button>
      </div>

      {nextBusInfo && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <h2 className="text-lg font-bold">Próximo ônibus para {nextBusInfo.origin} - {nextBusInfo.destination}</h2>
          <p>Horário do próximo ônibus: {nextBusInfo.nextBusTime}</p>
          <p>Faltam: {nextBusInfo.remainingTime} minutos</p>
        </div>
      )}
    </div>
  );
};

export default Form;
*/




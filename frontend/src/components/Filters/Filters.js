import React, { useState } from 'react';

function Filters() {
  const [day, setDay] = useState('');
  const [time, setTime] = useState('');

  const handleFilter = () => {
    console.log('Filtrando por:', day, time);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Filtros</h2>
      <div className="mb-4">
        <label className="block text-sm text-gray-700 mb-2">Dia da Semana:</label>
        <select className="p-2 border border-gray-300 rounded-lg w-full" value={day} onChange={(e) => setDay(e.target.value)}>
          <option value="">Selecione um dia</option>
          <option value="Dias Úteis">Dias Úteis</option>
          <option value="Sábados">Sábados</option>
          <option value="Domingos e Feriados">Domingos e Feriados</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm text-gray-700 mb-2">Horário:</label>
        <input
          type="time"
          className="p-2 border border-gray-300 rounded-lg w-full"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </div>

      <button className="px-4 py-2 bg-blue-500 text-white rounded-lg" onClick={handleFilter}>Aplicar Filtros</button>
    </div>
  );
}

export default Filters;
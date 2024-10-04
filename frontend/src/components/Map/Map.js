import React from 'react';

function Map() {
  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Mapa de Boa Vista</h2>
      {/* Aqui você pode integrar uma API de mapas */}
      <iframe
        title="Mapa de Boa Vista"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3943.3371370305825!2d-60.675833484773045!3d2.81935029859557!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8da6e5b08ca36a43%3A0x4e229d4ed77ecb0!2sBoa%20Vista%2C%20Roraima!5e0!3m2!1sen!2sbr!4v1623076021212!5m2!1sen!2sbr"
        width="100%"
        height="450"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
      ></iframe>
    </div>
  );
}

export default Map;
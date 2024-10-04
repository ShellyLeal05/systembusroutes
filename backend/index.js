const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware para lidar com JSON e CORS
app.use(express.json());
app.use(cors());

// Conectar ao MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/busroutes', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Esquema e modelo de rotas de ônibus
const BusRouteSchema = new mongoose.Schema({
  busCode: String,
  origin: String,
  destination: String,
  routes: [
    {
      departureLocation: String,
      arrivalLocation: String,
      days: String, // Dias (Dias Úteis, Sábados, Domingos e Feriados)
      times: [String] // Horários de partida
    }
  ]
});

const BusRoute = mongoose.model('BusRoute', BusRouteSchema);

// Função para calcular o tempo restante para o próximo ônibus
function calculateTimeRemaining(currentTime, nextTime) {
  const [currentHour, currentMinute] = currentTime.split(':').map(Number);
  const [nextHour, nextMinute] = nextTime.split(':').map(Number);

  const currentTotalMinutes = currentHour * 60 + currentMinute;
  const nextTotalMinutes = nextHour * 60 + nextMinute;

  // Se o próximo ônibus for em um horário posterior, calcular o tempo restante
  const minutesRemaining = nextTotalMinutes - currentTotalMinutes;

  // Caso o resultado seja negativo (nenhum próximo ônibus no dia), retornar null
  return minutesRemaining >= 0 ? minutesRemaining : null;
}

// Rota GET para buscar todas as rotas de ônibus
app.get('/bus/routes', async (req, res) => {
  try {
    const routes = await BusRoute.find();
    res.json(routes);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar rotas no MongoDB' });
  }
});

// **Atualização: Rota GET para buscar uma rota específica pelo busCode**
app.get('/bus/route/:busCode', async (req, res) => {
  const { busCode } = req.params;
  try {
    const route = await BusRoute.findOne({ busCode });
    if (!route) {
      return res.status(404).json({ error: 'Rota não encontrada' });
    }
    res.json(route);  // Retorna a rota completa
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar a rota no MongoDB' });
  }
});

// Rota GET para buscar o próximo ônibus com base no código do ônibus e horário atual
app.get('/bus/nextbus', async (req, res) => {
  let { busCode, currentTime, day } = req.query;

  try {
    // Verificar os parâmetros recebidos
    if (!busCode || !currentTime || !day) {
      return res.status(400).json({ error: 'Parâmetros incompletos. Verifique o código do ônibus, horário e dia.' });
    }

    // Busca a rota pelo código do ônibus e o dia
    const route = await BusRoute.findOne({ busCode, "routes.days": day });

    if (!route) {
      return res.status(404).json({ error: `Nenhuma rota encontrada para o dia ${day}` });
    }

    // Busca o próximo horário de ônibus que seja maior que o horário atual
    const nextBus = route.routes.find(r => r.days === day)
      .times.find(time => time > currentTime);

    if (!nextBus) {
      return res.status(404).json({ error: 'Nenhum próximo ônibus disponível' });
    }

    // Cálculo do tempo restante até o próximo ônibus
    const remainingTime = calculateTimeRemaining(currentTime, nextBus);

    if (remainingTime === null) {
      return res.status(404).json({ error: 'Nenhum próximo ônibus disponível para o dia de hoje.' });
    }

    // Retornar a resposta com o horário do próximo ônibus e o tempo restante
    res.json({
      busCode: route.busCode,
      origin: route.origin,
      destination: route.destination,
      nextBusTime: nextBus,
      remainingTime: `${remainingTime} minutos`
    });
  } catch (error) {
    console.error('Erro ao buscar o próximo ônibus:', error);  // Log do erro
    res.status(500).json({ error: 'Erro ao buscar o próximo ônibus no MongoDB' });
  }
});

// Iniciar o servidor na porta 5000
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});




// BACKUP 
/*
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware para lidar com JSON e CORS
app.use(express.json());
app.use(cors());

// Conectar ao MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/busroutes', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Esquema e modelo de rotas de ônibus
const BusRouteSchema = new mongoose.Schema({
  busCode: String,
  origin: String,
  destination: String,
  routes: [
    {
      departureLocation: String,
      arrivalLocation: String,
      days: String, // Dias (Dias Úteis, Sábados, Domingos e Feriados)
      times: [String] // Horários de partida
    }
  ]
});

const BusRoute = mongoose.model('BusRoute', BusRouteSchema);

// Função para calcular o tempo restante para o próximo ônibus
function calculateTimeRemaining(currentTime, nextTime) {
  const [currentHour, currentMinute] = currentTime.split(':').map(Number);
  const [nextHour, nextMinute] = nextTime.split(':').map(Number);

  const currentTotalMinutes = currentHour * 60 + currentMinute;
  const nextTotalMinutes = nextHour * 60 + nextMinute;

  // Se o próximo ônibus for em um horário posterior, calcular o tempo restante
  const minutesRemaining = nextTotalMinutes - currentTotalMinutes;

  // Caso o resultado seja negativo (nenhum próximo ônibus no dia), retornar null
  return minutesRemaining >= 0 ? minutesRemaining : null;
}

// Rota GET para buscar todas as rotas de ônibus
app.get('/bus/routes', async (req, res) => {
  try {
    const routes = await BusRoute.find();
    res.json(routes);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar rotas no MongoDB' });
  }
});

// Rota GET para buscar uma rota específica pelo ID
app.get('/bus/route/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const route = await BusRoute.findById(id);
    if (!route) {
      return res.status(404).json({ error: 'Rota não encontrada' });
    }
    res.json(route);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar a rota no MongoDB' });
  }
});

// Rota GET para buscar o próximo ônibus com base no código do ônibus e horário atual
app.get('/bus/nextbus', async (req, res) => {
  let { busCode, currentTime, day } = req.query;

  try {
    // Verificar os parâmetros recebidos
    if (!busCode || !currentTime || !day) {
      return res.status(400).json({ error: 'Parâmetros incompletos. Verifique o código do ônibus, horário e dia.' });
    }

    // Busca a rota pelo código do ônibus e o dia
    const route = await BusRoute.findOne({ busCode, "routes.days": day });

    if (!route) {
      return res.status(404).json({ error: `Nenhuma rota encontrada para o dia ${day}` });
    }

    // Busca o próximo horário de ônibus que seja maior que o horário atual
    const nextBus = route.routes.find(r => r.days === day)
      .times.find(time => time > currentTime);

    if (!nextBus) {
      return res.status(404).json({ error: 'Nenhum próximo ônibus disponível' });
    }

    // Cálculo do tempo restante até o próximo ônibus
    const remainingTime = calculateTimeRemaining(currentTime, nextBus);

    if (remainingTime === null) {
      return res.status(404).json({ error: 'Nenhum próximo ônibus disponível para o dia de hoje.' });
    }

    // Retornar a resposta com o horário do próximo ônibus e o tempo restante
    res.json({
      busCode: route.busCode,
      origin: route.origin,
      destination: route.destination,
      nextBusTime: nextBus,
      remainingTime: `${remainingTime} minutos`
    });
  } catch (error) {
    console.error('Erro ao buscar o próximo ônibus:', error);  // Log do erro
    res.status(500).json({ error: 'Erro ao buscar o próximo ônibus no MongoDB' });
  }
});

// Iniciar o servidor na porta 5000
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
*/





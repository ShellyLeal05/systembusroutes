# Sistema de Rotas de Ônibus

Este é um projeto de Sistema de Rotas de Ônibus desenvolvido para auxiliar na busca de horários e rotas de ônibus na cidade de Boa Vista. O sistema permite consultar o próximo ônibus disponível em uma rota, calcular o tempo de espera e exibir todas as rotas disponíveis.

## Funcionalidades

- **Buscar Rota por Código**: Permite ao usuário buscar os horários de saída de uma rota específica fornecendo o código do ônibus.
- **Buscar Próximo Ônibus**: O sistema calcula e exibe o próximo ônibus com base no código do ônibus, horário atual e dia da semana.
- **Exibição de Rotas**: Mostra todas as informações sobre uma rota, como a origem, destino, dias de funcionamento e horários de partida.
- **Mapa Interativo**: Exibe o mapa da cidade de Boa Vista para localização das rotas.

## Tecnologias Utilizadas

- **Frontend**:
  - ReactJS
  - Tailwind CSS (para estilização)
  - Axios (para realizar requisições HTTP)
  
- **Backend**:
  - Node.js
  - Express.js
  - MongoDB (para armazenamento de rotas e horários)

- **Ferramentas Auxiliares**:
  - Postman (para testar as APIs)
  
## Como Executar o Projeto

### Pré-requisitos

- **Node.js** (versão 12 ou superior)
- **MongoDB** (deve estar instalado e em execução)

### Passos para rodar o projeto:

### 1. **Clone o repositório**:

   git clone https://github.com/seu-usuario/seu-repositorio.git

### 2. **Instale as dependências no diretório backend**:

cd backend
npm install

### Configure o MongoDB:
Certifique-se de que o MongoDB está rodando na porta padrão 27017.

### 3. Execute o servidor backend:
npm start
O servidor estará rodando na porta 5000.

### 4. Instale as dependências no diretório frontend:

cd ../frontend
npm install

### 5. Compile o CSS com Tailwind:
npm run build:css

### 6. Execute o frontend:
npm start

O frontend estará disponível na porta 3000 (http://localhost:3000).

## Estrutura do Projeto

backend/: Código-fonte do servidor Node.js com Express, que gerencia as rotas e o banco de dados MongoDB.
index.js: Arquivo principal do servidor.
models/: Contém os modelos do MongoDB (ex: BusRoute).

frontend/: Código-fonte do frontend em React.js.
src/components/: Contém os componentes React como Form, Map, NavBar.
src/styles/: Estilos com Tailwind CSS.

### Testando a API com Postman

Abra o Postman e crie uma nova coleção para suas requisições.

Adicione as seguintes rotas para teste:

Buscar Rota: GET http://localhost:5000/bus/route/:busCode

Buscar Próximo Ônibus: GET http://localhost:5000/bus/nextbus?busCode=BUS_CODE&currentTime=HORARIO&day=DIA




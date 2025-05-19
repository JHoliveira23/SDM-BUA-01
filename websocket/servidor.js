
// Importa as bibliotecas necessárias
const express = require("express");  // Express para gerenciamento da API
const http = require("http");      // Para criar o servidor HTTP
const cors = require("cors");      // Middleware para CORS
const socketIo = require("socket.io");  // Socket.IO para comunicação em tempo real

// Cria uma instância do app Express
const app = express();

// Cria o servidor HTTP, passando o app Express como parâmetro
const server = http.createServer(app);

// Aplica o CORS para permitir que o frontend acesse a API
app.use(cors());
app.use(express.json()); // Middleware para processar requisições com corpo JSON

// Configura o Socket.IO no servidor
const io = socketIo(server, {
  cors: {
    origin: "*",          // Permite que qualquer origem faça requisições. Em produção, especifique origens permitidas.
    methods: ["GET", "POST"]  // Métodos permitidos para comunicação
  }
});

// Banco de dados em memória (simulando um banco)
let usuarios = [];
let pedidos = [];

// Quando um cliente se conecta via WebSocket
io.on("connection", (socket) => {
  console.log("Cliente conectado via WebSocket:", socket.id);

  // Quando o cliente se desconecta
  socket.on("disconnect", () => {
    console.log("Cliente desconectado:", socket.id);
  });
});

// Rota para cadastrar novo usuário
app.post("/usuarios", (req, res) => {
  const usuario = req.body;  // Obtém os dados do usuário enviados no corpo da requisição
  usuarios.push(usuario);    // Adiciona o usuário ao banco de dados em memória

  // Emite um evento WebSocket para notificar todos os clientes sobre o novo usuário
  io.emit("novo_usuario", usuario);

  res.send({ message: "Usuário cadastrado!", usuario });
});

// Rota para criar pedido
app.post("/pedidos", (req, res) => {
  const pedido = req.body;  // Obtém os dados do pedido enviados no corpo da requisição
  pedidos.push(pedido);     // Adiciona o pedido ao banco de dados em memória

  // Emite um evento WebSocket para notificar todos os clientes sobre o novo pedido
  io.emit("novo_pedido", pedido);

  res.send({ message: "Pedido criado!", pedido });
});

// Rota para consultar dados (apenas para debug)
app.get("/dados", (req, res) => {
  res.send({ usuarios, pedidos });
});

// Inicia o servidor HTTP na porta 3000
server.listen(3000, () => {
  console.log("Servidor rodando na porta 3000 com WebSocket");
});

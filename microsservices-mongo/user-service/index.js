const express = require('express');
const mongoose = require('mongoose');
const axios = require ('mongoose');

const app = express();

// Conexão mongo Atlas

const mongoUri = "mongodb+srv://jotaagaacademico822154533:usjt*2025@sdm-bua.dypaiwh.mongodb.net/orderservice?retryWrites=true&w=majority&appName=sdm-bua";
mongoose.connect(mongoUri, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('mongoDB connected');
    })
    .catch((err) => {
        console.log('mongoDB connection error:', err); 
    });

const orderSchema = new mongoose.Schema({
 id: String,
 name: String,
 email: String,
 produto: String,
 quantidade: Number,
});

const User = mongoose.model('User', orderSchema);

// Rota para cadastrar um usuário
app.post("/usuarios", async (req, res) => {
    try {
      const usuario = req.body;
  
      // Salva o usuário no banco
      const user = new User(usuario);
      await user.save();
  
      // Notifica o order-service com dados do pedido
     /* await axios.post("http://localhost:4000/pedidos", {
        userId: usuario.id,
        produto: usuario.produto,
        quantidade: usuario.quantidade
      });*/
  
      res.send({ message: "Usuário cadastrado!", usuario: user });
    } catch (error) {
      res.status(500).send({ error: "Erro ao cadastrar usuário" });
    }
  });
  
  // 🔍 Rota para listar todos os usuários
  app.get("/usuarios", async (req, res) => {
    try {
      const usuarios = await User.find();
      console.log("Usuários cadastrados:", usuarios); // Exibe no console
      res.send(usuarios);
    } catch (error) {
      res.status(500).send({ error: "Erro ao buscar usuários" });
    }
  });
  
  // ✏️ Rota para atualizar usuário por ID
  app.put("/usuarios/:id", async (req, res) => {
    try {
      const usuarioAtualizado = await User.findOneAndUpdate(
        { id: req.params.id },
        req.body,
        { new: true }
      );
      if (!usuarioAtualizado) {
        return res.status(404).send({ error: "Usuário não encontrado" });
      }
      res.send({ message: "Usuário atualizado", usuario: usuarioAtualizado });
    } catch (error) {
      res.status(500).send({ error: "Erro ao atualizar usuário" });
    }
  });
  
  // 🗑️ Rota para deletar usuário por ID
  app.delete("/usuarios/:id", async (req, res) => {
    try {
      const resultado = await User.findOneAndDelete({ id: req.params.id });
      if (!resultado) {
        return res.status(404).send({ error: "Usuário não encontrado" });
      }
      res.send({ message: "Usuário removido" });
    } catch (error) {
      res.status(500).send({ error: "Erro ao remover usuário" });
    }
  });
  
  app.listen(3000, () => console.log("User-Service rodando na porta 3000"));
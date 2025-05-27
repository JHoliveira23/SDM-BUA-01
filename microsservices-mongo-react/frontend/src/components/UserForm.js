import React, { useState } from "react";
import axios from "axios";

export default function UserForm() {
  // Estados para armazenar os dados do formulário
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [produto, setProduto] = useState("");
  const [quantidade, setQuantidade] = useState(null);

  // Função para enviar o formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Monta o objeto usuário para enviar para o backend
      const usuario = { id, name, email, produto, quantidade };
      // Chama o User-Service para cadastrar usuário e gerar pedido
      const response = await axios.post("http://localhost:3002/usuarios", usuario);

      alert("Usuário cadastrado com sucesso!");
      
      // Limpa o formulário
      setId("");
      setName("");
      setEmail("");
      setProduto("");
      setQuantidade(null);
    } catch (error) {
      alert("Erro ao cadastrar usuário.");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Cadastrar Usuário e Pedido</h2>

      <label>ID:</label>
      <input type="text" value={id} onChange={e => setId(e.target.value)} required />

      <label>Nome:</label>
      <input type="text" value={name} onChange={e => setName(e.target.value)} required />

      <label>Email:</label>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />

      <label>Produto:</label>
      <input type="text" value={produto} onChange={e => setProduto(e.target.value)} />

      <label>Quantidade:</label>
      <input type="number" value={quantidade} min="1" onChange={e => setQuantidade(Number(e.target.value))} />

      <button type="submit">Cadastrar</button>
    </form>
  );
}
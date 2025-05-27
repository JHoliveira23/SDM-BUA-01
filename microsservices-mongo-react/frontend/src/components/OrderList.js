import React, { useEffect, useState } from "react";
import axios from "axios";

export default function OrderList() {
  // Estado para guardar os pedidos buscados
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    // Função para buscar pedidos na API
    async function fetchOrders() {
      try {
        const response = await axios.get("http://localhost:4000/pedidos");
        setPedidos(response.data);
      } catch (error) {
        console.error("Erro ao buscar pedidos", error);
      }
    }
    fetchOrders();
  }, []);

  return (
    <div>
      <h2>Pedidos Cadastrados</h2>
      <ul>
        {pedidos.map((p) => (
          <li key={p._id}>
            Produto: {p.produto} | Quantidade: {p.quantidade} | Status: {p.status} | Criado em: {new Date(p.createdAt).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function UserList() {
  // Estado para guardar os usuários buscados
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    // Função para buscar usuários na API
    async function fetchUsers() {
      try {
        const response = await axios.get("http://localhost:3002/usuarios");
        setUsuarios(response.data);
      } catch (error) {
        console.error("Erro ao buscar usuários", error);
      }
    }
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Usuários Cadastrados</h2>
      <ul>
        {usuarios.map((u) => (
          <li key={u._id || u.id}>
            {u.name} ({u.email}) - Produto: {u.produto} - Quantidade: {u.quantidade}
          </li>
        ))}
      </ul>
    </div>
  );
}
const express = require('express');
const app = express();


app.use(express.json());



app.post('pedidos', async (req, res) => {
    const pedido = req.body

    console.log('pedido recebido', pedido);
    
    res.send({message: "Pedido cadastrado com sucesso!", pedido})
})
app.listen(4000, () => console.log("Order Service rodando na porta 4000"))
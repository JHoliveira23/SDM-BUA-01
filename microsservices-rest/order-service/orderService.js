const express = require('express');
const app = express();
app.use(express.json());

let orders = []; //Array to store orders

app.post('/pedidos', (req, res) => {
    
    if(!Array.isArray(orders)){
        return res.status(400).send({message: "Esperado um array!"})
    }

    const {id, product, quantify} = req.body;
    if(!id || !product || !quantify){
        return res.status(400).send({message: "Dados do pedido invalido!"});
    }
    const newOrder = {id, product, quantify};
    orders.push(newOrder); // Add thr new order to the array
    res.status(201).send({message: "Pedido cadastrado com sucesso!", order: newOrder});
});

app.get('/pedidos', (req, res) => {
    res.status(200).json(orders) //Return the list of orders
})

app.get('/pedidos/:id', (req, res) => {
    const orderId = req.params.id; // Get the order ID from the request parameters
    const order = orders.find(o => o.id === orderId); // Find the order by ID
    if (!order) {
        return res.status(404).send({ message: 'Pedido não encontrado!' });
    }
    res.status(200).json(order); // Return the order details
});

app.put('/pedidos/:id', (req, res) => {
    const orderId = req.params.id; // Get the order ID from the request parameters
    const orderIndex = orders.findIndex(o => o.id === orderId); // Find the order index by ID
    if (orderIndex === -1) {
        return res.status(404).send({ message: 'Pedido não encontrado!' });
    }

    const {product, quantity} = req.body; // Destructure the updated order details
    if (!product || !quantity) {
        return res.status(400).send({ message: 'Dados do pedido inválidos!' });
    }
    orders[orderIndex] = { id: orderId, product, quantity }; // Update the order details
    res.status(200).send({ message: 'Pedido atualizado com sucesso!', order: orders[orderIndex] });
});

app.delete('/pedidos/:id', (req, res) => {
    const orderId = req.params.id; // Get the order ID from the request parameters
    const orderIndex = orders.findIndex(o => o.id == orderId); // Find the order index by ID
    if (orderIndex === -1) {
        return res.status(404).send({ message: 'Pedido não encontrado!' });
    }
    orders.splice(orderIndex, 1); // Remove the order from the array
    res.status(200).send({ message: 'Pedido excluído com sucesso!' });
});

app.listen(4000, () => console.log('Order Service rodando na porta 4000'));
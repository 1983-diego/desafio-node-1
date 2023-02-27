const express = require("express") 
const { pedido, listarPedidos, alterarPedido, deletarPedido, listarPedidoID, alterarStatusPedido } = require("./controladores/pedidos")

const rotas = express()

rotas.post("/order", pedido)
rotas.get("/order", listarPedidos)
rotas.put("/order/:id", alterarPedido)
rotas.delete("/order/:id", deletarPedido)

rotas.get("/order/:id", listarPedidoID)
rotas.patch("/order/:id", alterarStatusPedido)

module.exports = rotas



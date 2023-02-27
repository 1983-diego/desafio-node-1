const { v4 } = require("uuid")
const arrayDados =require("../bancodedados")

const pedido = (req, res) => {
    const { order, clientName, price } =req.body

    const newOrder = {
        id: v4(),
        order,
        clientName,
        price,
        status: "Em preparação"
    }

    arrayDados.push(newOrder)

    return res.status(201).json([
        newOrder
    ])
}

const listarPedidos = (req, res) => {
    return res.json(arrayDados)
}

const alterarPedido = (req, res) => {
    const {id} = req.params
    const {order, clientName, price} = req.body

    const encontrarPedido = arrayDados.findIndex((pedido) => {
        return pedido.id == id
    })

    if(encontrarPedido < 0) {
        return res.status(404).json({ mensagem: "Pedido não encontrado"})
    }

    const ordemModificada = {
        id,
        order,
        clientName,
        price
    }

    arrayDados[encontrarPedido] = ordemModificada

    return res.status(201).json(ordemModificada)
}

const deletarPedido = (req, res) => {
    const {id} = req.params

    const encontrarPedido = arrayDados.findIndex((pedido) => {
        return pedido.id == id
    })

    if(encontrarPedido == -1) {
        return res.status(404).json({ mensagem: "Pedido não encontrado"})
    }

    arrayDados.splice(encontrarPedido, 1)

    return res.status(200).json({mensagem: "Pedido deletado"})
}

const listarPedidoID = (req, res) => {
    const { id } = req.params

    const encontrarPedido = arrayDados.findIndex((pedido) => {
        return pedido.id == id
    })

    if(encontrarPedido == -1) {
        return res.status(404).json({ mensagem: "Pedido não encontrado"})
    }

    const pedidoEncontrado = arrayDados[encontrarPedido]

    return res.json(pedidoEncontrado)
}

const alterarStatusPedido = (req, res) => {
    const { id } = req.params

    const encontrarPedido = arrayDados.findIndex((pedido) => {
        return pedido.id == id
    })

    if(encontrarPedido == -1) {
        return res.status(404).json({ mensagem: "Pedido não encontrado"})
    }

    arrayDados[encontrarPedido].status = "Pronto"

    return res.status(200).json({ mensagem: "Status alterado para pronto"})
}

module.exports = {
    pedido,
    listarPedidos,
    alterarPedido,
    deletarPedido,
    listarPedidoID,
    alterarStatusPedido
}
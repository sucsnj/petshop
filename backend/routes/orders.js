const express = require('express');
const router = express.Router();
const {
  pegarPedidos,
  pegarPedidoPorId,
  criarPedido,
  atualizarPedido,
  apagarPedido
} = require('../model/orders');
const autenticarToken = require('../middleware/auth'); // Importa a proteção por token

/**
 * @swagger
 * /orders:
 *  get:
 *    summary: Retorna uma lista de pedidos
 *    tags: [Pedidos]
 *    description: Retorna uma lista de todos os pedidos cadastrados
 *    responses:
 *      200:
 *        description: Lista de pedidos obtida com sucesso
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  idPedido:
 *                    type: integer
 *                  tutorName:
 *                    type: string
 *                  petName:
 *                    type: string
 *                  productNames:
 *                    type: array
 *                    items:
 *                      type: string
 *                  quantidadeProduto:
 *                    type: integer
 *                  serviceNames:
 *                    type: array
 *                    items:
 *                      type: string
 *                  quantidadeServico:
 *                    type: integer
 *                  total:
 *                    type: integer
 *                  status:
 *                    type: string
 *      404:
 *        description: Pedidos não encontrados
 */
router.get('/', function (req, res, next) {
  pegarPedidos(res, next);
});

/**
 * @swagger
 * /orders/{id}:
 *  get:
 *    summary: Retorna um pedido
 *    tags: [Pedidos]
 *    description: Retorna um pedido com base no ID fornecido
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID do pedido a ser retornado
 *        required: true
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: Pedido obtido com sucesso
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                idPedido:
 *                  type: integer
 *                tutorName:
 *                  type: string
 *                petName:
 *                  type: string
 *                productNames:
 *                  type: array
 *                  items:
 *                    type: string
 *                quantidadeProduto:
 *                  type: integer
 *                serviceNames:
 *                  type: array
 *                  items:
 *                    type: string
 *                quantidadeServico:
 *                  type: integer
 *                total:
 *                  type: integer
 *                status:
 *                  type: string
 *      404:
 *        description: Pedido não encontrado
 */
router.get('/:id', function (req, res, next) {
  pegarPedidoPorId(req, res, next);
});

/**
 * @swagger
 * /orders:
 *  post:
 *    summary: Cria um novo pedido
 *    tags: [Pedidos]
 *    description: Cria um novo pedido com os dados fornecidos
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              tutorId:
 *                type: integer
 *              petId:
 *                type: integer
 *              products:
 *                type: array
 *                items:
 *                  type: string
 *              services:
 *                type: array
 *                items:
 *                  type: string
 *    responses:
 *      201:
 *        description: Pedido criado com sucesso
 *      400:
 *        description: Dados inválidos
 */
router.post('/', (req, res) => {
  criarPedido(req, res);
});

/**
 * @swagger
 * /orders/{id}:
 *  patch:
 *    summary: Atualiza um pedido existente
 *    tags: [Pedidos]
 *    description: Atualiza os dados de um pedido com base no ID fornecido
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID do pedido a ser atualizado
 *        required: true
 *        schema:
 *          type: integer
 *    requestBody:
 *      required: false
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              tutorId:
 *                type: integer
 *              petId:
 *                type: integer
 *              products:
 *                type: array
 *                items:
 *                  type: string
 *              services:
 *                type: array
 *                items:
 *                  type: string
 *              status:
 *                type: string
 *    responses:
 *      200:
 *        description: Pedido atualizado com sucesso
 *      404:
 *        description: Pedido não encontrado
 */
router.patch('/:id', (req, res) => {
  atualizarPedido(req, res);
});

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Apaga um pedido existente
 *     tags: [Pedidos]
 *     description: Apaga os dados de um pedido com base no ID fornecido
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID do pedido a ser apagado
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pedido apagado com sucesso
 *       404:
 *         description: Pedido não encontrado
 */
router.delete('/:id', (req, res) => {
  apagarPedido(req, res);
});

module.exports = router;
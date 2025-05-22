const express = require('express');
const router = express.Router();
const {
  pegarProdutos,
  pegarProdutoPorId,
  criarProduto,
  atualizarProduto,
  apagarProduto
} = require('../model/products');
const autenticarToken = require('../middleware/auth'); // Importa a proteção por token

// trecho com estrutura para requisições de segurança (token)
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /products:
 *  get:
 *    summary: Retorna uma lista de produtos
 *    tags: [Produtos]
 *    description: Retorna uma lista de todos os produtos cadastrados
 *    responses:
 *      200:
 *        description: Lista de produtos obtida com sucesso
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  id:
 *                    type: integer
 *                  name:
 *                    type: string
 *                  price:
 *                    type: integer
 *                  category:
 *                    type: string
 *                  stock:
 *                    type: integer
 *      404:
 *        description: Produtos não encontrados
 */
router.get('/', function (req, res, next) {
  pegarProdutos(res, next);
});

/**
 * @swagger
 * /products/{id}:
 *  get:
 *    summary: Retorna um produto
 *    tags: [Produtos]
 *    description: Retorna um produto com base no ID fornecido
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID do produto a ser retornado
 *        required: true
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: Produto obtido com sucesso
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: integer
 *                name:
 *                  type: string
 *                price:
 *                  type: integer
 *                category:
 *                  type: string
 *                stock:
 *                  type: integer
 *      404:
 *        description: Produto não encontrado
 */
router.get('/:id', function (req, res, next) {
  pegarProdutoPorId(req, res, next);
});

/**
 * @swagger
 * /products:
 *  post:
 *    summary: Cria um novo produto
 *    tags: [Produtos]
 *    description: Cria um novo produto com os dados fornecidos
 *    security:
 *      - BearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *              price:
 *                type: integer
 *              category:
 *                type: string
 *              stock:
 *                type: integer
 *    responses:
 *      201:
 *        description: Produto criado com sucesso
 *      400:
 *        description: Dados inválidos
 */
router.post('/', autenticarToken, (req, res) => {
  criarProduto(req, res);
});

/**
 * @swagger
 * /products/{id}:
 *  patch:
 *    summary: Atualiza um produto existente
 *    tags: [Produtos]
 *    description: Atualiza os dados de um produto com base no ID fornecido
 *    security:
 *      - BearerAuth: []
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID do produto a ser atualizado
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
 *              name:
 *                type: string
 *              price:
 *                type: integer
 *              category:
 *                type: string
 *              stock:
 *                type: integer
 *    responses:
 *      200:
 *        description: Produto atualizado com sucesso
 *      404:
 *        description: Produto não encontrado
 */
router.patch('/:id', autenticarToken, (req, res) => {
  atualizarProduto(req, res);
});

/**
 * @swagger
 * /products/{id}:
 *  delete:
 *    summary: Apaga um produto existente
 *    tags: [Produtos]
 *    description: Apaga os dados de um produto com base no ID fornecido
 *    security:
 *      - BearerAuth: []
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID do produto a ser apagado
 *        required: true
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: Produto apagado com sucesso
 *      404:
 *        description: Produto não encontrado
 */
router.delete('/:id', autenticarToken, (req, res) => {
  apagarProduto(req, res);
});

module.exports = router;
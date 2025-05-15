const express = require('express');
const router = express.Router();
const {
  pegarServicos,
  pegarServicoPorId,
  criarServico,
  atualizarServico,
  apagarServico
} = require('../model/services');
const autenticarToken = require('../middleware/auth'); // Importa a proteção por token

/**
 * @swagger
 * /services:
 *  get:
 *    summary: Retorna uma lista de serviços
 *    tags: [Serviços]
 *    description: Retorna uma lista de todos os serviços cadastrados
 *    responses:
 *      200:
 *        description: Lista de serviços obtida com sucesso
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
 *                  duration:
 *                    type: string
 *                  description:
 *                    type: string
 *      404:
 *        description: Serviços não encontrados
 */
router.get('/', function (req, res, next) {
  pegarServicos(res, next);
});

/**
 * @swagger
 * /services/{id}:
 *  get:
 *    summary: Retorna um serviço
 *    tags: [Serviços]
 *    description: Retorna um serviço com base no ID fornecido
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID do serviço a ser retornado
 *        required: true
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: Serviço obtido com sucesso
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
 *                duration:
 *                  type: string
 *                description:
 *                  type: string
 *      404:
 *        description: Serviço não encontrado
 */
router.get('/:id', function (req, res, next) {
  pegarServicoPorId(req, res, next);
});

/**
 * @swagger
 * /services:
 *  post:
 *    summary: Cria um novo serviço
 *    tags: [Serviços]
 *    description: Cria um novo serviço com os dados fornecidos
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
 *              duration:
 *                type: string
 *              description:
 *                type: string
 *    responses:
 *      201:
 *        description: Serviço criado com sucesso
 *      400:
 *        description: Dados inválidos
 */
router.post('/', (req, res) => {
  criarServico(req, res);
});

/**
 * @swagger
 * /services/{id}:
 *  patch:
 *    summary: Atualiza um serviço existente
 *    tags: [Serviços]
 *    description: Atualiza os dados de um serviço com base no ID fornecido
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID do serviço a ser atualizado
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
 *              duration:
 *                type: string
 *              description:
 *                type: string
 *    responses:
 *      200:
 *        description: Serviço atualizado com sucesso
 *      404:
 *        description: Serviço não encontrado
 */
router.patch('/:id', (req, res) => {
  atualizarServico(req, res);
});

/**
 * @swagger
 * /services/{id}:
 *  delete:
 *    summary: Apaga um serviço existente
 *    tags: [Serviços]
 *    description: Apaga os dados de um serviço com base no ID fornecido
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID do serviço a ser apagado
 *        required: true
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: Serviço apagado com sucesso
 *      404:
 *        description: Serviço não encontrado
 */
router.delete('/:id', (req, res) => {
  apagarServico(req, res);
});

module.exports = router;
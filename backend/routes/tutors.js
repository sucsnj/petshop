const express = require('express');
const router = express.Router();
const {
  pegarTutores,
  pegarTutorPorId,
  criarTutor,
  atualizarTutor,
  apagarTutor
} = require('../model/tutors');
const autenticarToken = require('../middleware/auth'); // Importa a proteção por token

/**
 * @swagger
 * /tutors:
 *  get:
 *    summary: Retorna uma lista de tutores
 *    tags: [Tutores]
 *    description: Retorna uma lista de todos os tutores cadastrados
 *    responses:
 *      200:
 *        description: Lista de tutors obtida com sucesso
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
 *                  email:
 *                    type: string
 *                  phone:
 *                    type: string
 *      404:
 *        description: Tutores não encontrados
 */
router.get('/', function (req, res, next) {
  pegarTutores(res, next);
});

/**
 * @swagger
 * /tutors/{id}:
 *  get:
 *    summary: Retorna um tutor
 *    tags: [Tutores]
 *    description: Retorna um tutor com base no id fornecido
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID do tutor a ser retornado
 *        required: true
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: Tutor obtido com sucesso
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  id:
 *                    type: integer
 *                  name:
 *                    type: string
 *                  email:
 *                    type: string
 *                  phone:
 *                    type: string
 *      404:
 *        description: Tutor não encontrado
 */
router.get('/:id', function (req, res, next) {
  pegarTutorPorId(req, res, next);
});

/**
 * @swagger
 * /tutors:
 *  post:
 *    summary: Cria um novo tutor
 *    tags: [Tutores]
 *    description: Cria um novo tutor com os dados fornecidos
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *              email:
 *                type: string
 *              phone:
 *                type: string
 *    responses:
 *      201:
 *        description: Tutor criado com sucesso
 *      400:
 *        description: Dados inválidos
 */
router.post('/', (req, res) => {
  criarTutor(req, res);
});

/**
 * @swagger
 * /tutors/{id}:
 *   patch:
 *     summary: Atualiza um tutor existente
 *     tags: [Tutores] 
 *     description: Atualiza os dados de um tutor com base no id fornecido
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID do tutor a ser atualizado
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tutor atualizado com sucesso
 *       404:
 *         description: Tutor não encontrado
 */
router.patch('/:id', (req, res) => {
  atualizarTutor(req, res);
});

/**
 * @swagger
 * /tutors/{id}:
 *   delete:
 *     summary: Apaga um tutor existente
 *     tags: [Tutores] 
 *     description: Apaga os dados de um tutor com base no id fornecido
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID do tutor a ser apagado
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tutor apagado com sucesso
 *       404:
 *         description: Tutor não encontrado
 */
router.delete('/:id', (req, res) => {
  apagarTutor(req, res);
});

module.exports = router;
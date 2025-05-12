const express = require('express');
const router = express.Router();
const fs = require('fs');
const {
  pegarPets,
  pegarPetPorId,
  criarPet,
  atualizarPet,
  apagarPet
} = require('../model/pets');

/**
 * @swagger
 * /pets:
 *  get:
 *    summary: Retorna uma lista de pets
 *    tags: [Pets]
 *    description: Retorna uma lista de todos os pets cadastrados
 *    responses:
 *      200:
 *        description: Lista de pets obtida com sucesso
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
 *                  species:
 *                    type: string
 *                  age:
 *                    type: integer
 *                  tutorId:
 *                    type: integer
 *      404:
 *        description: Tutores não encontrados
 */
router.get('/', function (req, res, next) {
  pegarPets(res, next);
});

/**
 * @swagger
 * /pets/{id}:
 *   get:
 *     summary: Retorna um pet
 *     tags: [Pets]
 *     description: Retorna um pet específico com base no ID fornecido
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID do pet a ser retornado
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pet obtido com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 species:
 *                   type: string
 *                 age:
 *                   type: integer
 *                 tutorId:
 *                   type: integer
 *       404:
 *         description: Pet não encontrado
 */
router.get('/:id', function (req, res, next) {
  pegarPetPorId(req, res, next);
});

/**
 * @swagger
 * /pets:
 *   post:
 *     summary: Cria um novo pet
 *     tags: [Pets]
 *     description: Cria um novo pet com base nos dados fornecidos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               species:
 *                 type: string
 *               age:
 *                 type: integer
 *               tutorId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Pet criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post('/', (req, res) => {
  criarPet(req, res);
});

/**
 * @swagger
 * /pets/{id}:
 *   patch:
 *     summary: Atualiza um pet existente
 *     tags: [Pets]
 *     description: Atualiza os dados de um pet com base no ID fornecido
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID do pet a ser atualizado
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
 *               species:
 *                 type: string
 *               age:
 *                 type: integer
 *               tutorId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Pet atualizado com sucesso
 *       404:
 *         description: Pet não encontrado
 */
router.patch('/:id', (req, res) => {
  const id = Number(req.params.id);
  atualizarPet(req, res, id);
});

/**
 * @swagger
 * /pets/{id}:
 *   delete:
 *     summary: Apaga um pet existente
 *     tags: [Pets]
 *     description: Apaga os dados de um pet com base no ID fornecido
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID do pet a ser apagado
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pet apagado com sucesso
 *       404:
 *         description: Pet não encontrado
 */
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id); // recebe o id (como string) do tutor a ser deletado e converte para numero
  apagarPet(req, res, id);
});

module.exports = router;
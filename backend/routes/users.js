var express = require('express');
var router = express.Router();

/**
 * @swagger
 * /users:
 *  get:
 *    summary: Retorna uma lista de usuários
 *    tags: [Usuários]
 *    description: Retorna uma lista de todos os usuários cadastrados
 *    responses:
 *      200:
 *        description: Lista de usuários obtida com sucesso
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
 */
router.get('/', function (req, res, next) {
  res.send('Página de usuários');
});



module.exports = router;

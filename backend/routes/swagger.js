const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const configs = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Petshop API',
      version: '1.0.0',
      description: 'API para gerenciamento de um petshop',
    },
    servers: [
      {
        url: process.env.URL_API || 'http://localhost:4000',
      },
    ]
  },
  apis: ['./routes/*.js'],
};

const specs = swaggerJsDoc(configs);

module.exports = {
  swaggerUi,
  specs,
};

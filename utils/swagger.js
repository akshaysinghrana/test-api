// import { Express, Request, Response } from 'express';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
// import { version } from '../package.json' assert { type: 'json' };
import { logger } from './logger.js';

const swaggerOptions = {
  host: 'localhost:8000',
  basePath: '/',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'API documentation for the test application',
    },
    servers: [
      {
        url: 'http://localhost:8000/api/v1',
        description: 'API server',
      },
    ],
    tags: [
      {
        name: 'Health Check',
        description: 'Health check endpoints',
      },
      {
        name: 'News',
        description: 'News endpoints',
      },
    ],
    paths: {
      '/healthcheck': {
        get: {
          tags: ['Health Check'],
          summary: 'Health check endpoint',
          description: 'Returns a 200 status code if the server is running',
          responses: {
            200: {
              description: 'Server is running',
            },
          },
        },
      },
      '/addNews': {
        get: {
          tags: ['News'],
          summary: 'Add news',
          description: 'Add news to the database',
          responses: {
            200: {
              description: 'News added successfully',
            },
            400: {
              description: 'Bad request',
            },
            500: {
              description: 'Internal server error',
            },
            requestBody: {
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      articles: {
                        type: 'array',
                        items: {
                          type: 'object',
                          properties: {
                            source: {
                              type: 'object',
                              properties: {
                                id: { type: 'string' },
                                name: { type: 'string' },
                              },
                            },
                            author: { type: 'string' },
                            title: { type: 'string' },
                            description: { type: 'string' },
                            url: { type: 'string', format: 'uri' },
                            urlToImage: { type: 'string', format: 'uri' },
                            publishedAt: { type: 'string', format: 'date-time' },
                            content: { type: 'string' },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/getAllNews': {
        get: {
          tags: ['News'],
          summary: 'Get all news',
          description: 'Fetch all news from the database',
          responses: {
            200: {
              description: 'List of all news',
            },
          },
        },
      },
    },
    components: {
      securitySchemas: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'JWT Authorization header using the Bearer scheme. Example: "Authorization: Bearer {token}"',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
      },
  apis: ['./routers/*.js', './models/*.js'],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
const swaggerUiOptions = {
  explorer: true,
  swaggerOptions: {
    url: '/swagger.json',
  },
};
const swaggerUiSetup = (app, port) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, swaggerUiOptions));
  app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerDocs);
  });
  logger.info(`Swagger UI is available at http://localhost:${port}/api-docs`);
};
export { swaggerUiSetup };
export default swaggerDocs;
export { swaggerOptions };
export { swaggerUiOptions };
export { swaggerUi };

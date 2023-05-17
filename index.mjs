import getFastify from "fastify";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";

const fastify = getFastify();
await fastify.register(swagger);

await fastify.register(swaggerUi, {
  routePrefix: "/documentation",
  uiConfig: {
    docExpansion: "full",
    deepLinking: false,
  },
  uiHooks: {
    onRequest: function (request, reply, next) {
      next();
    },
    preHandler: function (request, reply, next) {
      next();
    },
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
  transformSpecification: (swaggerObject, request, reply) => {
    return swaggerObject;
  },
  transformSpecificationClone: true,
});

fastify.put(
  "/some-route/:id",
  {
    schema: {
      description: "post some data",
      tags: ["user", "code"],
      summary: "qwerty",
      params: {
        type: "object",
        properties: {
          id: {
            type: "string",
            description: "user id",
          },
        },
      },
      body: {
        type: "object",
        properties: {
          hello: { type: "string" },
          obj: {
            type: "object",
            properties: {
              some: { type: "string" },
            },
          },
        },
      },
      response: {
        201: {
          description: "Successful response",
          type: "object",
          properties: {
            hello: { type: "string" },
          },
        },
        default: {
          description: "Default response",
          type: "object",
          properties: {
            foo: { type: "string" },
          },
        },
      },
    },
  },
  (req, reply) => {}
);
await fastify.ready();
fastify.swagger();
await fastify.listen({ port: 8080 });

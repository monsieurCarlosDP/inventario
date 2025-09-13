export default () => ({
  documentation: {
    enabled: true,
    config: {
      // Opcional: personaliza metadatos OpenAPI
      info: {
        title: "Strapi API",
        description: "Documentación OpenAPI generada por Strapi",
        version: "1.0.0",
      },
      // Opcional: servidores
      servers: [{ url: "http://localhost:1337" }],
    },
  },
});

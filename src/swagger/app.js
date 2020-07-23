const express = require("express");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();

const swaggerDefinition = {
  components: {},
  openapi: "3.0.1",
  info: {
    title: "Swagger API V1",
    version: "0.1.0",
    description: "EveryThing About V1 SWAGGER TUTORIAL",
  },
  //   host: "blockscan.shop", // the host or url of the app
  basePath: "/api/v1",
};

const options = {
  swaggerDefinition,
  apis: ["./docs/*.yaml"],
};

const swaggerSpec = swaggerJSDoc(options);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const server = app.listen(process.env.PORT || 3030, () => {
  console.log(`'Listening on port '${server.address().port}`);
});
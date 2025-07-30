const express = require("express");
const app = express();
const PORT =  3000;
const casosRouter = require("./routes/casosRoutes");
const agentesRoutes = require("./routes/agentesRoutes");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./docs/swagger.json");


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());
app.use(casosRouter);
app.use(agentesRoutes);

app.listen(PORT, () => {
  console.log(
    `Servidor do Departamento de Polícia rodando em http://localhost:${PORT} em modo de desenvolvimento`
  );
});

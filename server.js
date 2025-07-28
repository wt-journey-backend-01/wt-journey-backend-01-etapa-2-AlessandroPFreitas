require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());
const casosRouter = require("./routes/casosRoutes");
const agentesRoutes = require("./routes/agentesRoutes");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./docs/swagger.json");

const PORT = process.env.PORT || 3000;

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(casosRouter);
app.use(agentesRoutes);

app.listen(PORT, () => {
  console.log(
    `Servidor do Departamento de Polícia rodando em http://localhost:${PORT} em modo de desenvolvimento`
  );
});

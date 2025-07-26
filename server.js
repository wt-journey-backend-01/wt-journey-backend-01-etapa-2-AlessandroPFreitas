const express = require("express");
const app = express();
app.use(express.json());
const casosRouter = require("./routes/casosRoutes");
const agentesRoutes = require("./routes/agentesRoutes");

// Use environment variable for port, fallback to 3000
const PORT = process.env.PORT || 3000;
app.use(casosRouter);
app.use(agentesRoutes);

app.listen(PORT, () => {
  console.log(
    `Servidor do Departamento de Polícia rodando em http://localhost:${PORT} em modo de desenvolvimento`
  );
});

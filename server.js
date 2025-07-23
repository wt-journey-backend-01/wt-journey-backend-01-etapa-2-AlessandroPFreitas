const express = require('express');
const app = express();
const casosRouter = require("./routes/casosRoutes")
const PORT = 3000;
app.use(express.json());
app.use(casosRouter);

app.listen(PORT, () => {
    console.log(`Servidor do Departamento de Polícia rodando em http://localhost:${PORT} em modo de desenvolvimento`);
}); 
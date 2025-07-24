const express = require("express");
const router = express.Router();
const agentesController = require("../controllers/agentesController");

router.get("/agentes", agentesController.getAllAgentes);

router.get("/agentes/:id", agentesController.getIdAgente);

router.post("/agentes", agentesController.createAgente);

router.put("/agentes/:id", agentesController.attAgente);

router.patch("/agentes/:id", agentesController.pieceAgente);

router.delete("/agentes/:id", agentesController.removeAgente);

module.exports = router;

const { v4: uuidv4 } = require("uuid");
const agentesRepository = require("../repositories/agentesRepository");
const { errorHandler, isValidUUID } = require("../utils/errorHandler");

const dataValidation = (data) => {
  const regex = /^\d{4}\/\d{2}\/\d{2}$/;
  return regex.test(data);
};

function getAllAgentes(req, res) {
  const agentes = agentesRepository.findAll();
  res.json(agentes);
}

function getIdAgente(req, res) {
  const id = req.params.id;

  // Validate UUID
  if (!isValidUUID(id)) {
    return errorHandler.invalidUUID(res);
  }

  const agenteId = agentesRepository.findId(id);
  if (!agenteId) {
    return errorHandler.notFound(res, "Esse agente não existe!");
  }

  return errorHandler.success(res, agenteId);
}

function createAgente(req, res) {
  const { nome, dataDeIncorporacao, cargo } = req.body;
  if (!nome || !dataDeIncorporacao || !cargo) {
    return errorHandler.missingFields(res);
  }

  if (!dataValidation(dataDeIncorporacao)) {
    return errorHandler.badRequest(res, "Data incorreta, tente nesse formato YYYY/MM/DD.");
  }
  const agente = {
    id: uuidv4(),
    nome,
    dataDeIncorporacao,
    cargo,
  };

  const newAgente = agentesRepository.newAgente(agente);
  return errorHandler.success(res, newAgente, 201);
}

function attAgente(req, res) {
  const id = req.params.id;

  // Validate UUID
  if (!isValidUUID(id)) {
    return errorHandler.invalidUUID(res);
  }

  const { nome, dataDeIncorporacao, cargo } = req.body;
  if (!nome || !dataDeIncorporacao || !cargo) {
    return errorHandler.missingFields(res);
  }

  if (!dataValidation(dataDeIncorporacao)) {
    return errorHandler.badRequest(res, "Data incorreta, tente nesse formato YYYY/MM/DD.");
  }

  const agente = {
    nome,
    dataDeIncorporacao,
    cargo,
  };

  const updateAgente = agentesRepository.putAgente(id, agente);
  if (!updateAgente) {
    return errorHandler.notFound(res, "Agente não encontrado!");
  }
  return errorHandler.success(res, updateAgente);
}

function pieceAgente(req, res) {
  const id = req.params.id;

  // Validate UUID
  if (!isValidUUID(id)) {
    return errorHandler.invalidUUID(res);
  }

  const { nome, dataDeIncorporacao, cargo } = req.body;
  const updateAgente = {};
  
  if (nome !== undefined) {
    updateAgente.nome = nome;
  }
  if (dataDeIncorporacao !== undefined) {
    if (!dataValidation(dataDeIncorporacao)) {
      return errorHandler.badRequest(res, "Data incorreta, tente nesse formato YYYY/MM/DD.");
    }
    updateAgente.dataDeIncorporacao = dataDeIncorporacao;
  }
  if (cargo !== undefined) {
    updateAgente.cargo = cargo;
  }

  if (Object.keys(updateAgente).length === 0) {
    return errorHandler.noFieldsForUpdate(res);
  }
  
  const agenteAtualizado = agentesRepository.patchAgente(id, updateAgente);
  if (!agenteAtualizado) {
    return errorHandler.notFound(res, "Esse agente não existe!");
  }
  return errorHandler.success(res, agenteAtualizado);
}

function removeAgente(req, res) {
  const id = req.params.id;

  // Validate UUID
  if (!isValidUUID(id)) {
    return errorHandler.invalidUUID(res);
  }

  const agenteDeletado = agentesRepository.deleteAgente(id);

  if (!agenteDeletado) {
    return errorHandler.notFound(res, "Agente não encontrado!");
  }

  return errorHandler.noContent(res);
}

module.exports = {
  getAllAgentes,
  getIdAgente,
  createAgente,
  attAgente,
  pieceAgente,
  removeAgente,
};

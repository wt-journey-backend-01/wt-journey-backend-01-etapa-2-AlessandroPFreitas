const { v4: uuidv4 } = require("uuid");
const casosRepository = require("../repositories/casosRepository");
const agentesRepository = require("../repositories/agentesRepository");
const { errorHandler, isValidUUID } = require("../utils/errorHandler");
function getAllCasos(req, res) {
  const casos = casosRepository.findAll();
  res.json(casos);
}

function getIdCasos(req, res) {
  const id = req.params.id;
  
  // Validate UUID
  if (!isValidUUID(id)) {
    return errorHandler.invalidUUID(res);
  }
  
  const caso = casosRepository.findId(id);
  if (!caso) {
    return errorHandler.notFound(res, "Caso não encontrado!");
  }
  return errorHandler.success(res, caso);
}

function createCaso(req, res) {
  const { titulo, descricao, status, agente_id } = req.body;

  if (!titulo || !descricao || !status || !agente_id) {
    return errorHandler.missingFields(res);
  }

  // Validate agent ID is a valid UUID
  if (!isValidUUID(agente_id)) {
    return errorHandler.invalidUUID(res, "ID do agente deve ser um UUID válido");
  }

  const statusPermitidos = ["aberto", "solucionado"];
  if (!statusPermitidos.includes(status)) {
    return errorHandler.invalidField(res, "Status", statusPermitidos);
  }

  // Validate if agent exists
  const agente = agentesRepository.findId(agente_id);
  if (!agente) {
    return errorHandler.notFound(res, "Agente não encontrado!");
  }

  const novoCaso = {
    id: uuidv4(),
    titulo,
    descricao,
    status,
    agente_id,
  };

  casosRepository.addCaso(novoCaso);
  return errorHandler.success(res, novoCaso, 201);
}

function updateCaso(req, res) {
  const id = req.params.id;

  // Validate UUID
  if (!isValidUUID(id)) {
    return errorHandler.invalidUUID(res);
  }

  const { titulo, descricao, status, agente_id } = req.body;

  if (!titulo || !descricao || !status || !agente_id) {
    return errorHandler.missingFields(res);
  }

  // Validate agent ID is a valid UUID
  if (!isValidUUID(agente_id)) {
    return errorHandler.invalidUUID(res, "ID do agente deve ser um UUID válido");
  }

  const statusPermitidos = ["aberto", "solucionado"];
  if (!statusPermitidos.includes(status)) {
    return errorHandler.invalidField(res, "Status", statusPermitidos);
  }

  const agente = agentesRepository.findId(agente_id);
  if (!agente) {
    return errorHandler.notFound(res, "Agente não encontrado!");
  }

  const updateCaso = {
    titulo,
    descricao,
    status,
    agente_id,
  };

  const casoAtualizado = casosRepository.attCaso(id, updateCaso);
  if (!casoAtualizado) {
    return errorHandler.notFound(res, "Caso não encontrado!");
  }
  return errorHandler.success(res, casoAtualizado);
}

function patchCaso(req, res) {
  const id = req.params.id;

  // Validate UUID
  if (!isValidUUID(id)) {
    return errorHandler.invalidUUID(res);
  }

  const { titulo, descricao, status, agente_id } = req.body;

  const updateCaso = {};

  if (titulo !== undefined) {
    updateCaso.titulo = titulo;
  }
  if (descricao !== undefined) {
    updateCaso.descricao = descricao;
  }
  if (status !== undefined) {
    const statusPermitidos = ["aberto", "solucionado"];
    if (!statusPermitidos.includes(status)) {
      return errorHandler.invalidField(res, "Status", statusPermitidos);
    }
    updateCaso.status = status;
  }
  if (agente_id !== undefined) {
    // Validate agent ID is a valid UUID
    if (!isValidUUID(agente_id)) {
      return errorHandler.invalidUUID(res, "ID do agente deve ser um UUID válido");
    }

    const agente = agentesRepository.findId(agente_id);
    if (!agente) {
      return errorHandler.notFound(res, "Agente não encontrado!");
    }
    updateCaso.agente_id = agente_id;
  }

  if (Object.keys(updateCaso).length === 0) {
    return errorHandler.noFieldsForUpdate(res);
  }

  const casoAtualizado = casosRepository.partialCaso(id, updateCaso);
  if (!casoAtualizado) {
    return errorHandler.notFound(res, "Caso não encontrado!");
  }
  return errorHandler.success(res, casoAtualizado);
}

function removeCaso(req, res) {
  const id = req.params.id;

  // Validate UUID
  if (!isValidUUID(id)) {
    return errorHandler.invalidUUID(res);
  }

  const casoDeletado = casosRepository.deleteCaso(id);
  if (!casoDeletado) {
    return errorHandler.notFound(res, "Caso não encontrado!");
  }

  return errorHandler.noContent(res);
}

module.exports = {
  getAllCasos,
  getIdCasos,
  createCaso,
  updateCaso,
  patchCaso,
  removeCaso,
};

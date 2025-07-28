const { v4: uuidv4, validate: uuidValidate, version: uuidVersion } = require("uuid");
const casosRepository = require("../repositories/casosRepository");
const agentesRepository = require("../repositories/agentesRepository");

// Função para validar se o ID é um UUID v4 válido
function isValidUUIDv4(id) {
  return uuidValidate(id) && uuidVersion(id) === 4;
}

function getAllCasos(req, res) {
  const casos = casosRepository.findAll();
  res.json(casos);
}

function getIdCasos(req, res) {
  const id = req.params.id;
  if (!isValidUUIDv4(id)) {
    return res.status(400).json({ mensagem: "ID inválido (deve ser UUID v4)" });
  }
  const caso = casosRepository.findId(id);
  if (!caso) {
    return res.status(404).json({ mensagem: "Caso não encontrado!" });
  }
  res.json(caso);
}

function createCaso(req, res) {
  const { titulo, descricao, status, agente_id } = req.body;

  if (!titulo || !descricao || !status || !agente_id) {
    return res
      .status(400)
      .json({ mensagem: "Todos os campos são obrigatorios!" });
  }
  const agente = agentesRepository.findId(agente_id);
  if (!agente) {
    return res.status(404).json({ mensagem: "Agente não encontrado!" });
  }

  const statusPermitidos = ["aberto", "solucionado"];
  if (!statusPermitidos.includes(status)) {
    return res
      .status(400)
      .json({ mensagem: "Status deve ser 'aberto' ou 'solucionado'." });
  }

  const novoCaso = {
    id: uuidv4(),
    titulo,
    descricao,
    status,
    agente_id,
  };

  casosRepository.addCaso(novoCaso);
  return res.status(201).json(novoCaso);
}

function updateCaso(req, res) {
  const id = req.params.id;
  if (!isValidUUIDv4(id)) {
    return res.status(400).json({ mensagem: "ID inválido (deve ser UUID v4)" });
  }
  const { titulo, descricao, status, agente_id } = req.body;

  if (!titulo || !descricao || !status || !agente_id) {
    return res
      .status(400)
      .json({ mensagem: "Todos os campo são obrigatorios!" });
  }

  const statusPermitidos = ["aberto", "solucionado"];
  if (!statusPermitidos.includes(status)) {
   return res
      .status(400)
      .json({ mensagem: "Status deve ser 'aberto' ou 'solucionado." });
  }

  const agente = agentesRepository.findId(agente_id);
  if (!agente) {
    return res.status(404).json({ mensagem: "Agente não encontrado!" });
  }

  const updateCaso = {
    titulo,
    descricao,
    status,
    agente_id,
  };

  const casoAtualizado = casosRepository.attCaso(id, updateCaso);
  if (!casoAtualizado) {
   return res.status(404).json({ mensagem: "O caso não existe!" });
  }
  return res.status(200).json(casoAtualizado);
}

function patchCaso(req, res) {
  const id = req.params.id;
  if (!isValidUUIDv4(id)) {
    return res.status(400).json({ mensagem: "ID inválido (deve ser UUID v4)" });
  }
  const { titulo, descricao, status, agente_id } = req.body;

  const attCaso = {};

  if (titulo !== undefined) {
    attCaso.titulo = titulo;
  }
  if (descricao !== undefined) {
    attCaso.descricao = descricao;
  }
  if (status !== undefined) {
    const statusPermitidos = ["aberto", "solucionado"];
    if (!statusPermitidos.includes(status)) {
    return  res
        .status(400)
        .json({ mensagem: "Status deve ser 'aberto' ou 'solucionado." });
    }
    attCaso.status = status;
  }
  if (agente_id !== undefined) {
    const agente = agentesRepository.findId(agente_id);
    if (!agente) {
      return res.status(404).json({ mensagem: "Agente não encontrado!" });
    }
    attCaso.agente_id = agente_id;
  }

  if (Object.keys(attCaso).length === 0) {
  return  res
      .status(400)
      .json({ mensagem: "Pelo menos um campo tem que ser enviado!" });
  }

  const casoAtualizado = casosRepository.partialCaso(id, attCaso);
  if (!casoAtualizado) {
    return res.status(404).json({ mensagem: "Caso não encontrado!" });
  }
  return res.status(200).json(casoAtualizado);
}

function removeCaso(req, res) {
  const id = req.params.id;
  if (!isValidUUIDv4(id)) {
    return res.status(400).json({ mensagem: "ID inválido (deve ser UUID v4)" });
  }
  const casoDeletado = casosRepository.deleteCaso(id);
  if (!casoDeletado) {
    return res.status(404).json({ mensagem: "Caso não encontrado!" });
  }

  return res.status(204).send();
}

module.exports = {
  getAllCasos,
  getIdCasos,
  createCaso,
  updateCaso,
  patchCaso,
  removeCaso,
};
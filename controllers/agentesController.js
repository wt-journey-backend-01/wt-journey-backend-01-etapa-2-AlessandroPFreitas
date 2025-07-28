const { v4: uuidv4, validate: uuidValidate, version: uuidVersion } = require("uuid");
const agentesRepository = require("../repositories/agentesRepository");

const dataValidation = (data) => {
  const regex = /^\d{4}\/\d{2}\/\d{2}$/;
  return regex.test(data);
};

// Função para validar se o ID é um UUID v4 válido
function isValidUUIDv4(id) {
  return uuidValidate(id) && uuidVersion(id) === 4;
}

function getAllAgentes(req, res) {
  const agentes = agentesRepository.findAll();
  res.json(agentes);
}

function getIdAgente(req, res) {
  const id = req.params.id;
  if (!isValidUUIDv4(id)) {
    return res.status(400).json({ mensagem: "ID inválido (deve ser UUID v4)" });
  }
  const agenteId = agentesRepository.findId(id);
  if (!agenteId) {
    return res.status(404).json({ mensagem: "Esse agente não existe!" });
  }

  return res.status(200).json(agenteId);
}

function createAgente(req, res) {
  const { nome, dataDeIncorporacao, cargo } = req.body;
  if (!nome || !dataDeIncorporacao || !cargo) {
    return res
      .status(400)
      .json({ mensagem: "Todos os campos são obrigatorios!" });
  }

  if (!dataValidation(dataDeIncorporacao)) {
    return res
      .status(400)
      .json({ mensagem: "Data incorreta, tente nesse formato YYYY/MM/DD." });
  }
  const agente = {
    id: uuidv4(),
    nome,
    dataDeIncorporacao,
    cargo,
  };

  const newAgente = agentesRepository.newAgente(agente);
  return res.status(201).json(newAgente);
}

function attAgente(req, res) {
  const id = req.params.id;
  if (!isValidUUIDv4(id)) {
    return res.status(400).json({ mensagem: "ID inválido (deve ser UUID v4)" });
  }
  const { nome, dataDeIncorporacao, cargo } = req.body;
  if (!nome || !dataDeIncorporacao || !cargo) {
    return res
      .status(400)
      .json({ mensagem: "Todos os campo são obrigatorios!" });
  }

  if (!dataValidation(dataDeIncorporacao)) {
    return res
      .status(400)
      .json({ mensagem: "Data incorreta, tente nesse formato YYYY/MM/DD." });
  }

  const agente = {
    nome,
    dataDeIncorporacao,
    cargo,
  };

  const updateAgente = agentesRepository.putAgente(id, agente);
  if (!updateAgente) {
    return res.status(404).json({ mensagem: "O agente não existe" });
  }
  return res.status(200).json(updateAgente);
}

function pieceAgente(req, res) {
  const id = req.params.id;
  if (!isValidUUIDv4(id)) {
    return res.status(400).json({ mensagem: "ID inválido (deve ser UUID v4)" });
  }
  const { nome, dataDeIncorporacao, cargo } = req.body;
  const agente = {};
  if (nome !== undefined) {
    agente.nome = nome;
  }
  if (dataDeIncorporacao !== undefined) {
    if (!dataValidation(dataDeIncorporacao)) {
      return res
        .status(400)
        .json({ mensagem: "A data está no formato errado!" });
    }
    agente.dataDeIncorporacao = dataDeIncorporacao;
  }
  if (cargo !== undefined) {
    agente.cargo = cargo;
  }

  if (Object.keys(agente).length === 0) {
    return res
      .status(400)
      .json({ mensagem: "Pelo menos um campo tem que ser enviado!" });
  }
  const updateAgente = agentesRepository.patchAgente(id, agente);
  if (!updateAgente) {
    return res.status(404).json({ mensagem: "Esse agente não existe!" });
  }
  return res.status(200).json(updateAgente);
}

function removeAgente(req, res) {
  const id = req.params.id;
  if (!isValidUUIDv4(id)) {
    return res.status(400).json({ mensagem: "ID inválido (deve ser UUID v4)" });
  }

  const agenteDeletado = agentesRepository.deleteAgente(id);
  if (!agenteDeletado) {
    return res.status(404).json({ mensagem: "Agente não encontrado!" });
  }

  return res.status(204).send();
}

module.exports = {
  getAllAgentes,
  getIdAgente,
  createAgente,
  attAgente,
  pieceAgente,
  removeAgente,
};
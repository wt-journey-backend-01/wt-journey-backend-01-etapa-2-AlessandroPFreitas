const { v4: uuidv4 } = require("uuid");
const casosRepository = require("../repositories/casosRepository");
function getAllCasos(req, res) {
  const casos = casosRepository.findAll();
  res.json(casos);
}

function getIdCasos(req, res) {
  const id = req.params.id;
  const caso = casosRepository.findId(id);
  if (!caso) {
    return req.status(404).json({ mensagem: "Caso não encontrado!" });
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

  const { titulo, descricao, status, agente_id } = req.body;

  if (!titulo || !descricao || !status || !agente_id) {
    return res
      .status(400)
      .json({ mensagem: "Todos os campo são obrigatorios!" });
  }

  const statusPermitidos = ["aberto", "solucionado"];
  if (!statusPermitidos.includes(status)) {
    res
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
    res.status(404).json({ mensagem: "O caso não existe!" });
  }
  return res.status(200).json(casoAtualizado);
}

function patchCaso(req, res) {
  const id = req.params.id;
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
      res
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
    res
      .status(400)
      .json({ mensagem: "Pelo menos um campo tem que ser enviado!" });
  }

  const casoAtualizado = casosRepository.partialCaso(id, updateCaso);
  if (!casoAtualizado) {
    return res.status(404).json({ mensagem: "Caso não encontrado!" });
  }
  return res.status(200).json(casoAtualizado);
}

function removeCaso(req, res) {
  const id = req.params.id;
  const casoDeletado = casosRepository.deleteCaso(id);
  if (!casoDeletado) {
    return res.status(404).json({ mensagem: "Caso não encontrado!" });
  }

  return res.status(204).json({ mensagem: "Caso removido!" });
}

module.exports = {
  getAllCasos,
  getIdCasos,
  createCaso,
  updateCaso,
  patchCaso,
  removeCaso,
};

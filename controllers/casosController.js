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
    return req.status(404).json({ message: "Caso não encontrado!" });
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

module.exports = {
  getAllCasos,
  getIdCasos,
  createCaso,
};

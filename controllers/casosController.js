import {findAll, findId } from "../repositories/casosRepository";
const casosRepository = require("");
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

function createCaso() {
  
}

module.exports = {
  getAllCasos,
  getIdCasos,
  createCaso
};

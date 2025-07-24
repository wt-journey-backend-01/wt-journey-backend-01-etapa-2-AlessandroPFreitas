const agentes = [
  {
    id: "401bccf5-cf9e-489d-8412-446cd169a0f1",
    nome: "Rommel Carneiro",
    dataDeIncorporacao: "1992/10/04",
    cargo: "delegado",
  },
];

function findAll() {
  return agentes;
}

function findId(id) {
  const agenteId = agentes.find((agente) => agente.id === id);
  return agenteId;
}

function newAgente(agente) {
  agentes.push(agente);
  return agente;
}

function putAgente(id, updateAgente) {
  const agenteIndex = agentes.findIndex((agente) => agente.id === id);
  if (agenteIndex === -1) {
    return undefined;
  }
  agentes[agenteIndex] = { ...agentes[agenteIndex], ...updateAgente };
  return agentes[agenteIndex];
}

function patchAgente(id, updateAgente) {
  const agenteIndex = agentes.findIndex((agente) => agente.id === id);
  if (agenteIndex === -1) {
    return undefined;
  }
  agentes[agenteIndex] = { ...agentes[agenteIndex], ...updateAgente };
  return agentes[agenteIndex];
}

function deleteAgente(id) {
  const agenteIndex = agentes.findIndex((agente) => agente.id === id);
  if (agenteIndex !== -1) {
    return agentes.splice(agenteIndex, 1);
  }
}

module.exports = {
  findAll,
  findId,
  newAgente,
  putAgente,
  patchAgente,
  deleteAgente,
};

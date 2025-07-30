const agentes = [
  {
    id: "d7ea7f4c-9e32-4b8c-9e41-7c4c7c9a1c2e",
    nome: "Rommel Carneiro",
    dataDeIncorporacao: "1992/10/04",
    cargo: "delegado",
  },
  {
    id: "d7ea7f4c-9e32-4b8c-9e41-7c4c7c9a1c2e",
    nome: "Rommel Carneiro",
    dataDeIncorporacao: "1930/10/04",
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
 const index = agentes.findIndex(agente => agente.id === id);
  if (index === -1) return null;
  const [removido] = agentes.splice(index, 1);
  return removido; 
  }

module.exports = {
  findAll,
  findId,
  newAgente,
  putAgente,
  patchAgente,
  deleteAgente,
};

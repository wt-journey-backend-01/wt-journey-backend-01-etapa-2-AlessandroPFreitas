const casos = [
  {
    id: "f5fb2ad5-22a8-4cb4-90f2-8733517a0d46",
    titulo: "homicidio",
    descricao:
      "Disparos foram reportados às 22:33 do dia 10/07/2007 na região do bairro União, resultando na morte da vítima, um homem de 45 anos.",
    status: "aberto",
    agente_id: "401bccf5-cf9e-489d-8412-446cd169a0f1",
  },
];

function findAll() {
  return casos;
}

function findId(id) {
  return casos.find((caso) => caso.id === id);
}

function addCaso(novoCaso) {
  casos.push(novoCaso);
  return novoCaso;
}

function attCaso(id, updatedCaso) {
  const casoIndex = casos.findIndex((caso) => caso.id === id);
  if (casoIndex === -1) {
    return undefined;
  }
  casos[casoIndex] = { ...casos[casoIndex], ...updatedCaso };
  return casos[casoIndex];
}

function partialCaso(id, updateCaso) {
  const casoIndex = casos.findIndex((caso) => caso.id === id);
  if (casoIndex === -1) {
    return undefined;
  }

  if (updateCaso.titulo !== undefined) {
    casos[casoIndex].titulo = updateCaso.titulo;
  }
  if (updateCaso.descricao !== undefined) {
    casos[casoIndex].descricao = updateCaso.descricao;
  }
  if (updateCaso.status !== undefined) {
    casos[casoIndex].status = updateCaso.status;
  }
  if (updateCaso.agente_id !== undefined) {
    casos[casoIndex].agente_id = updateCaso.agente_id;
  }

  return casos[casoIndex];
}

function deleteCaso(id) {
  const casoIndex = casos.findIndex((caso) => caso.id === id);
  if (casoIndex === -1) return null;

  const [removido] = casos.splice(casoIndex, 1);
  return removido;
}

module.exports = { findAll, findId, addCaso, attCaso, partialCaso, deleteCaso };

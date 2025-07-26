const { v4: isUuid } = require('uuid');

// UUID validation helper
function isValidUUID(uuid) {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}

// Centralized error responses
const errorHandler = {
  // Bad Request (400)
  badRequest(res, message = 'Requisição inválida') {
    return res.status(400).json({ mensagem: message });
  },

  // Not Found (404)
  notFound(res, message = 'Recurso não encontrado') {
    return res.status(404).json({ mensagem: message });
  },

  // Invalid UUID
  invalidUUID(res, message = 'ID deve ser um UUID válido') {
    return res.status(400).json({ mensagem: message });
  },

  // Missing fields
  missingFields(res, message = 'Todos os campos são obrigatórios') {
    return res.status(400).json({ mensagem: message });
  },

  // Invalid field value
  invalidField(res, fieldName, validValues = null) {
    const message = validValues 
      ? `${fieldName} deve ser um dos seguintes valores: ${validValues.join(', ')}`
      : `Valor inválido para o campo ${fieldName}`;
    return res.status(400).json({ mensagem: message });
  },

  // No fields for partial update
  noFieldsForUpdate(res, message = 'Pelo menos um campo deve ser fornecido para atualização') {
    return res.status(400).json({ mensagem: message });
  },

  // Success responses
  success(res, data, statusCode = 200) {
    return res.status(statusCode).json(data);
  },

  // Success with no content
  noContent(res) {
    return res.status(204).send();
  }
};

module.exports = { errorHandler, isValidUUID };
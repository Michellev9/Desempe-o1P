const { body, validationResult } = require('express-validator');

// Middleware de validación para un producto
const validateProduct = [
    body('nombre')
        .isString()
        .notEmpty()
        .withMessage('El nombre es requerido y debe ser una cadena.'),
    body('precio')
        .isFloat({ gt: 0 })
        .withMessage('El precio debe ser un número positivo.'),
];

// Exportar el middleware
module.exports = { validateProduct, validate };

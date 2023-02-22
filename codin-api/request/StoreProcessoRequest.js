const Yup = require('yup');

const processoSchema = Yup.object().shape({
    posse: Yup.number()
      .integer()
      .required(),
    tipo: Yup.string()
      .trim()
      .required(),
    numero: Yup.string()
      .trim()
      .required(),
    tema: Yup.string()
      .trim()
      .required(),
    situacao: Yup.string()
      .trim()
      .required(),
    dataInicio: Yup.date()
      .required(),
    dataPrazo: Yup.date()
      .required()
  });
  

const storeProcessoRequest = async (req, res, next) => {
    try {
      await processoSchema.validate(req.body, { abortEarly: false });
      return next();
    } catch (error) {
      return res.status(400).json({ error: error.errors });
    }
  };
  
module.exports = storeProcessoRequest
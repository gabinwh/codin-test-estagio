const Yup = require('yup');

const processoSchema = Yup.object().shape({
    dono: Yup.number()
      .integer(),
    posse: Yup.number()
      .integer(),
    tipo: Yup.string()
      .trim(),
    numero: Yup.string()
      .trim(),
    tema: Yup.string()
      .trim(),
    situacao: Yup.string()
      .trim(),
    dataInicio: Yup.date(),
    dataPrazo: Yup.date()
  });
  

const updateProcessoRequest = async (req, res, next) => {
    try {
      await processoSchema.validate(req.body, { abortEarly: false });
      return next();
    } catch (error) {
      return res.status(400).json({ error: error.errors });
    }
  };
  
module.exports = updateProcessoRequest
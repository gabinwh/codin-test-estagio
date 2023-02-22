const Yup = require('yup');

const usuarioController = require('../controller/UsuarioController')

const usuarioSchema = Yup.object().shape({
    nome: Yup.string()
      .trim(),
    email: Yup.string()
      .trim()
      .email(),
    //   .test('unique-email', 'Este email já existe.', async function(value) {
    //         return await !usuarioController.validaEmail(value)
    //   }),
    senha: Yup.string()
      .trim()
      .min(6)
      .max(20),
    cargo: Yup.string()
      .trim(),
    setor: Yup.string()
      .trim(),
  });
  

const updateUsuarioRequest = async (req, res, next) => {
    try {
      await usuarioSchema.validate(req.body, { abortEarly: false });
      return next();
    } catch (error) {
      return res.status(400).json({ error: error.errors });
    }
  };
  
module.exports = updateUsuarioRequest
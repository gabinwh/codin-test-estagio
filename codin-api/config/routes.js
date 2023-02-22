const express = require('express')
const routes = express.Router()
const jwt = require('jsonwebtoken')
const auth = require('../config/auth')

const storeUsuarioRequest = require('../request/StoreUsuarioRequest')
const updateUsuarioRequest = require('../request/UpdateUsuarioRequest')
const usuarioController = require('../controller/UsuarioController')

const storeProcessoRequest = require('../request/StoreProcessoRequest')
const updateProcessoRequest = require('../request/UpdateProcessoRequest')
const processoController = require('../controller/ProcessoController')

function verificarToken(req, res, next) {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      return res.status(401).json({ mensagem: 'Usuário não autenticado (sem header)!' })
    }
  
    const token = authHeader.split(' ')[1]
    const config = auth.secretKey
    
    jwt.verify(token, config, (err, decoded) => {
      if (err) {
        return res.status(401).json({mensagem: 'Usuário não autenticado!' })
      }
      req.usuarioId = decoded.usuario
      req.usuarioEmail = decoded.email
      next()
    })
  }

//Rotas

//ACL
routes.post('/login', (req, res, next) => {
    
    usuarioController.login(req, res, next)
})
//TODO: Logout

routes.post('/usuario/cadastrar', verificarToken, storeUsuarioRequest, (req, res) => {

    usuarioController.store(req, res)
})

routes.put('/usuario/editar/:id', verificarToken, updateUsuarioRequest, (req, res, next) => {

  usuarioController.update(req.params.id, req, res, next)
})

routes.put('/usuario/desativar/:id', verificarToken, (req, res) => {

  usuarioController.desativar(req.params.id, req, res)
})

routes.put('/usuario/ativar/:id', verificarToken, (req, res) => {

  usuarioController.ativar(req.params.id, req, res)
})

routes.get('/usuario/index', verificarToken, (req, res) => {
  
  usuarioController.index(req, res)
})

routes.get('/usuario/ativos', verificarToken, (req, res) => {

  usuarioController.usuariosAtivos(req, res)
})


// Processos judicais

routes.post('/processo/cadastrar', verificarToken, storeProcessoRequest, (req, res) => {

  processoController.store(req, res)
})

routes.put('/processo/arquivar/:id', verificarToken, (req, res) => {

  processoController.arquivar(req.params.id, req, res)
})

routes.put('/processo/desarquivar/:id', verificarToken, (req, res) => {

  processoController.desarquivar(req.params.id, req, res)
})

routes.put('/processo/editar/:id', verificarToken, updateProcessoRequest, (req, res) => {

  processoController.update(req.params.id, req, res)
})

routes.get('/processo/index', verificarToken, (req, res) => {

  processoController.index(req, res)
})

routes.get('/processo/caixa-entrada', verificarToken, (req, res) => {

  processoController.caixaEntrada(req, res)
})

routes.get('/processo/caixa-saida', verificarToken, (req, res) => {

  processoController.caixaSaida(req, res)
})

routes.get('/processo/caixa-arquivado', verificarToken, (req, res) => {

  processoController.caixaArquivado(req, res)
})

routes.get('/processo/caixa-desarquivado', verificarToken, (req, res) => {

  processoController.caixaDesarquivado(req, res)
})

routes.delete('/processo/excluir/:id', verificarToken, (req, res) => {

  processoController.destroy(req.params.id, req, res)
})


module.exports = routes
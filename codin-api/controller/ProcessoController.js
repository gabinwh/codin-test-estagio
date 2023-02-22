const Processo = require('../models/Processo')
const Usuario = require('../models/Usuario')
const ProcessoResource = require('../resource/ProcessoResource')
const Sequelize = require('sequelize')
const Op = Sequelize.Op


async function store(req, res) {
    try {
        const body = req.body
        const usuarioPosse = Usuario.findByPk(body.posse)
        if (!usuarioPosse){
            return res.status(400).json({
                mensagem: 'Id do usuário da posse inválido!'
            })
        }
        // O dono do processo vai ser o usuário que criou, podendo ser modificado no update
        const atributos = {
            tipo: body.tipo,
            numero: body.numero,
            tema: body.tema,
            situacao: body.situacao,
            dataInicio: body.dataInicio,
            dataPrazo: body.dataPrazo,
            dono: req.usuarioId,
            posse: body.posse
        }
    
        await Processo.create(atributos)
        
        return res.status(201).json({
            mensagem: "Processo cadastrado com sucesso!"
        })
    } catch(error){
        return res.status(500).json({
            mensagem: "Processo não cadastrado com sucesso!",
            error: error.message
        })
    }
}

async function update(id, req, res) {
    try {
        const body = req.body

        if(body.posse){
            const usuarioPosse = Usuario.findByPk(body.posse)
            if (!usuarioPosse){
                return res.status(400).json({
                    mensagem: 'Id do usuário da posse inválido!'
                })
            }
        }

        if(body.dono){
            const usuarioDono = Usuario.findByPk(body.dono)
            if (!usuarioDono){
                return res.status(400).json({
                    mensagem: 'Id do usuário do dono inválido!'
                })
            }
        }

        const processo = await Processo.findByPk(id)

        if (!processo) {
            return res.status(404).json({
                mensagem: 'Processo não encontrado!'
            })
        }

        await processo.update(body)

        return res.status(200).json({
            mensagem: 'Usuário atualizado com sucesso.'
        })
    } catch(error){
        return res.status(500).json({
            mensagem: "Processo não cadastrado com sucesso!",
            error: error.message
        })
    }
}

async function arquivar(id, req, res) {
    try {
        const processo = await Processo.findByPk(id)

        if(processo){
            await processo.update({arquivado: true})
            return res.status(200).json({
                mensagem: 'Processo arquivado com sucesso.'
            })
        }
        
        return res.status(404).json({
            mensagem: 'Processo não existe!'
        })
        
    } catch (error){
        return res.status(500).json({
            mensagem: 'Internal Server Error',
            error: error.message
        })
    }
}

async function desarquivar(id, req, res) {
    try {
        const processo = await Processo.findByPk(id)

        if(processo){
            await processo.update({arquivado: false})
            return res.status(200).json({
                mensagem: 'Processo desarquivado com sucesso.'
            })
        }
        
        return res.status(404).json({
            mensagem: 'Processo não existe!'
        })
        
    } catch (error){
        return res.status(500).json({
            mensagem: 'Internal Server Error',
            error: error.message
        })
    }
}

async function index(req, res){
    try {
        const processos = await Processo.findAll({
            include: 
              [{ model: Usuario, as: 'dono_usuario' },
              { model: Usuario, as: 'posse_usuario' }]
          })

        return res.status(200).json(processos ? ProcessoResource(processos) : [])
    } catch (error){
        return res.status(500).json({
            mensagem: 'Internal Server Error',
            error: error.message
        })
    }
}

async function caixaEntrada(req, res){
    try {
        const processos = await Processo.findAll({
            where: {
                posse: req.usuarioId
            },
            include: 
              [{ model: Usuario, as: 'dono_usuario' },
              { model: Usuario, as: 'posse_usuario' }]
          })

        return res.status(200).json(processos ? ProcessoResource(processos) : [])
    } catch (error){
        return res.status(500).json({
            mensagem: 'Internal Server Error',
            error: error.message
        })
    }
}

async function caixaSaida(req, res){
    try {
        const processos = await Processo.findAll({
            where: {
                dono: req.usuarioId,
                posse: {[Op.ne]: req.usuarioId}
            },
            include: 
              [{ model: Usuario, as: 'dono_usuario' },
              { model: Usuario, as: 'posse_usuario' }]
          })

        return res.status(200).json(processos ? ProcessoResource(processos) : [])
    } catch (error){
        return res.status(500).json({
            mensagem: 'Internal Server Error',
            error: error.message
        })
    }
}

async function caixaArquivado(req, res){
    try {
        const processos = await Processo.findAll({
            where: {
                arquivado: true
            },
            include: 
              [{ model: Usuario, as: 'dono_usuario' },
              { model: Usuario, as: 'posse_usuario' }]
          })

        return res.status(200).json(processos ? ProcessoResource(processos) : [])
    } catch (error){
        return res.status(500).json({
            mensagem: 'Internal Server Error',
            error: error.message
        })
    }
}

async function caixaDesarquivado(req, res){
    try {
        const processos = await Processo.findAll({
            where: {
                arquivado: false
            },
            include: 
              [{ model: Usuario, as: 'dono_usuario' },
              { model: Usuario, as: 'posse_usuario' }]
          })

        return res.status(200).json(processos ? ProcessoResource(processos) : [])
    } catch (error){
        return res.status(500).json({
            mensagem: 'Internal Server Error',
            error: error.message
        })
    }
}

async function destroy(id, req, res){
    try {
        const processo = await Processo.findByPk(id)

        await processo.destroy()

        return res.status(200).json({mensagemm: 'Processo deletado com sucesso!'})
    } catch (error){
        return res.status(500).json({
            mensagem: 'Internal Server Error',
            error: error.message
        })
    }
}


module.exports = {
    store: store,
    arquivar: arquivar,
    desarquivar: desarquivar,
    update: update,
    index: index,
    caixaEntrada: caixaEntrada,
    caixaSaida: caixaSaida,
    caixaArquivado: caixaArquivado,
    caixaDesarquivado: caixaDesarquivado,
    destroy: destroy,
}
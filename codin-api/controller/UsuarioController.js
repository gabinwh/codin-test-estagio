const bcrypt = require('bcrypt');
const saltRounds = 10;
const Usuario = require('../models/Usuario')
const auth = require('../config/auth')
const UsuarioResource = require('../resource/UsuarioResource')

async function store(req, res) {
    try {
        const body = req.body

        const emailExiste = await validaEmail(body.email)
        if(emailExiste){
            res.status(400).json({
                mensagem: 'Email já existe!'
            })
        }

        const senhaHashed = await bcrypt.hash(body.senha, saltRounds)

        const atributos = {
            nome: body.nome,
            email: body.email,
            cargo: body.cargo,
            setor: body.setor,
            senha: senhaHashed
        }

        await Usuario.create(atributos)

        return res.status(201).json({
            erro: false,
            mensagem: "Usuário cadastrado com sucesso!"
        })
    } catch(err){
        return res.status(400).json({
            mensagem: "Usuário não cadastrado com sucesso!",
            error: err.message
        })
    }
}

async function update(id, req, res, next) {
    try {

        const body = req.body

        if(body.email){
            if(await validaEmail(body.email)){
                return res.status(400).json({
                    mensagem: 'Email já existe!'
                })
            }
        }

        const usuario = await Usuario.findByPk(id)

        if (!usuario) {
            return res.status(404).json({
                mensagem: 'Usuário não encontrado!'
            })
        }

        let hashedSenha = usuario.senha
        
        if(body.senha){
            hashedSenha = await bcrypt.hash(body.senha, saltRounds)
        }

        await usuario.update({
            nome: body.nome || usuario.nome,
            email: body.email || usuario.email,
            senha: hashedSenha,
            cargo: body.cargo || usuario.cargo,
            setor: body.setor || usuario.setor
            })

        return res.status(200).json({
            mensagem: 'Usuário atualizado com sucesso.'
        })

    } catch (error) {
        return res.status(500).json({
            mensagem: 'Internal server error'
        })
    }
}

async function login(req, res, next) {
    const body = req.body

    const email = body.email;
    const senha = body.senha;
    const usuario = await Usuario.findOne({ where: { email: email } })

    if(!usuario) {
        return res.status(401).json({
            mensagem: "Email ou senha inválidos.",
        })
    }

    try {
        const result = await bcrypt.compare(senha, usuario.senha);
        if (result) {
            const token = await auth.gerarToken(usuario);
            return res.status(200).json({ token });
        } else {
            return res.status(401).json({
                mensagem: "Email ou senha inválidos.",
            });
        }
    } catch (error) {
        next(error);
        return res.status(500).json({
            mensagem: "Internal server error",
        });
    }
}

async function desativar(id, req, res) {

    try { 
        const usuario = await Usuario.findByPk(id)

        if(usuario){
            await usuario.update({
                statusAtivo: false,
              });

            return res.status(200).json({
                mensagem: 'Usuário atualizado com sucesso.'
            })
        }
        else if(!usuario){
            return res.status(404).json({
                mensagem: 'Usuário não encontrado'
            })
        }

    } catch (error) {
        return res.status(500).json({
            mensagem: 'Internal server error'
        })
    }
}

async function ativar(id, req, res) {
    try { 
        const usuario = await Usuario.findByPk(id)

        if(usuario){
            await usuario.update({
                statusAtivo: true,
              });

            return res.status(200).json({
                mensagem: 'Usuário atualizado com sucesso.'
            })
        }
        else if(!usuario){
            return res.status(404).json({
                mensagem: 'Usuário não encontrado'
            })
        }

    } catch (error) {
        return res.status(500).json({
            mensagem: 'Internal server error'
        })
    }
}

async function validaEmail(email) {
    const usuario = await Usuario.findOne({ where: { email: email } })

    return usuario ? true : false
}

async function index(req, res) {
    try {
        const usuarios = await Usuario.findAll()

        return res.status(200).json(usuarios ? UsuarioResource(usuarios) : [])

    } catch(err) {
        return res.status(500).json({
            mensagem: 'Internal Server Error',
            error: err.message
        })
    }
}

async function usuariosAtivos(req, res) {
    try {
        const usuarios = await Usuario.findAll({
            where: {
                statusAtivo: true
            }
        })

        return res.status(200).json(usuarios ? UsuarioResource(usuarios) : [])
    } catch (err) {
        return res.status(500).json({
            mensagem: 'Internal Server Error',
            error: err.message
        })
    }
}

module.exports = {
    store: store,
    validaEmail: validaEmail,
    login: login,
    update: update,
    desativar: desativar,
    ativar: ativar,
    index: index,
    usuariosAtivos: usuariosAtivos,
}
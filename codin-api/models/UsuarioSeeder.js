const Usuario = require('./Usuario')
const bcrypt = require('bcrypt')


const atributos1 = {
        nome: 'Jorge Costa',
        email: 'jorge_costa@email.com',
        cargo: 'Procurador',
        setor: 'CCAC',
    }
const atributos2 = {
        nome: 'João Silva',
        email: 'joao_silva@email.com',
        cargo: 'Procurador Chefe',
        setor: 'CCAC',
    }
const atributos3 = {
        nome: 'Maria Santos',
        email: 'maria_santos@email.com',
        cargo: 'Procurador',
        setor: 'CCVASP',
    }

async function createNewUsuario(atributos) {
    const user = await Usuario.findOne({ where: { email: atributos.email } })

    if (user) {
        return;
    }

    const senhaHashed = await bcrypt.hash('password', 10)

    const newAtributos = {
        nome: atributos.nome,
        email: atributos.email,
        cargo: atributos.cargo,
        setor: atributos.setor,
        senha: senhaHashed
    }

    await Usuario.create(newAtributos)
}
createNewUsuario(atributos1)
createNewUsuario(atributos2)
createNewUsuario(atributos3)
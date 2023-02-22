function UsuarioResource (dados) {

     return dados.map(element => {
        return {
            id: element.id,
            nome: element.nome,
            email: element.email,
            cargo: element.cargo,
            setor: element.setor,
            statusAtivo: element.statusAtivo
        }
    })
}

module.exports = UsuarioResource
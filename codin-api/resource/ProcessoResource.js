function ProcessoResource (dados) {

    return dados.map(element => {
       return {
           id: element.id,
           tipo: element.tipo,
           numero: element.numero,
           tema: element.tema,
           situacao: element.situacao,
           dataInicio: element.dataInicio,
           dataPrazo: element.dataPrazo,
           dono_id: element.dono,
           dono: element.dono_usuario.nome,
           posse: element.posse_usuario.nome,
           posse_id: element.posse,
           arquivado: element.arquivado,
           statusAtivo: element.statusAtivo
       }
   })
}

module.exports = ProcessoResource
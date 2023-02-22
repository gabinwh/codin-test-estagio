const Processo = require('./Processo')

const processos = [
    {
        "tipo": "administrativo",
        "numero": "2023002548",
        "tema": "ICMS",
        "situacao": "JULGADO",
        "dataInicio": "2023/02/14",
        "dataPrazo": "2023/02/23",
        "dono": 2,
        "posse": 2,
        "arquivado": false,
        "statusAtivo": true
    },{
        "tipo": "administrativo",
        "numero": "2023006597",
        "tema": "ICMS",
        "situacao": "EM ANDAMENTO",
        "dataInicio": "2023/02/16",
        "dataPrazo": "2023/02/21",
        "dono": 1,
        "posse": 1,
        "arquivado": false,
        "statusAtivo": true
    },{
        "tipo": "administrativo",
        "numero": "2023006158",
        "tema": "ICMS",
        "situacao": "EM ANDAMENTO",
        "dataInicio": "2023/02/12",
        "dataPrazo": "2023/02/18",
        "dono": 3,
        "posse": 3,
        "arquivado": false,
        "statusAtivo": true
    },{
        "tipo": "administrativo",
        "numero": "2023007615",
        "tema": "ICMS",
        "situacao": "JULGADO",
        "dataInicio": "2023/02/10",
        "dataPrazo": "2023/02/28",
        "dono": 2,
        "posse": 3,
        "arquivado": false,
        "statusAtivo": true
    },{
        "tipo": "administrativo",
        "numero": "2023001975",
        "tema": "ICMS",
        "situacao": "EM ANDAMENTO",
        "dataInicio": "2023/02/04",
        "dataPrazo": "2023/02/13",
        "dono": 1,
        "posse": 1,
        "arquivado": false,
        "statusAtivo": true
    },{
        "tipo": "administrativo",
        "numero": "2023004687",
        "tema": "ICMS",
        "situacao": "JULGADO",
        "dataInicio": "2023/02/01",
        "dataPrazo": "2023/02/10",
        "dono": 2,
        "posse": 2,
        "arquivado": true,
        "statusAtivo": true
    }
]

async function createNewProcesso(processo) {

    await Processo.create(processo)
}

processos.map((processo) => {
    createNewProcesso(processo)
})
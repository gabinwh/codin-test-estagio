const Sequelize = require('sequelize')
const db = require('./db')
const Usuario = require('./Usuario')

const Processo = db.define('processos', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    tipo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    numero: {
        type: Sequelize.STRING,
        allowNull: false
    },
    tema: {
        type: Sequelize.STRING,
        allowNull: false
    },
    situacao: {
        type: Sequelize.STRING,
        allowNull: false
    },
    dataInicio: {
        type: Sequelize.DATE,
        allowNull: false
    },
    dataPrazo: {
        type: Sequelize.DATE,
        allowNull: false
    },
    // dono: {
    //     type: Sequelize.INTEGER,
    //     references: {
    //         model: Usuario,
    //         key: 'id'
    //     }
    // },
    // posse: {
    //     type: Sequelize.INTEGER,
    //     references: {
    //         model: Usuario,
    //         key: 'id'
    //     }
    // },
    arquivado: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    statusAtivo: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    }
})

Processo.belongsTo(Usuario, {
    foreignKey: 'dono',
    as: 'dono_usuario'
});

Processo.belongsTo(Usuario, {
    foreignKey: 'posse',
    as: 'posse_usuario'
});

Processo.sync()

module.exports = Processo
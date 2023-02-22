const Sequelize = require('sequelize')
const db = require('./db')

const Usuario = db.define('usuarios', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cargo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    setor: {
        type: Sequelize.STRING,
        allowNull: false
    },
    statusAtivo: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    }
})
Usuario.sync()

module.exports = Usuario
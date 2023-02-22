const Sequelize = require('sequelize')

//CONFIGURE O SEU BANCO DE DADOS: 
//No lugar de "codin" troque pelo nome do banco;
//No lugar de "root" e de "" coloque o usuário e senha;
//Mude o host para o qual está utilizando;
const sequelize = new Sequelize("codin", "root", "", {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = sequelize;

//importing modules
const {Sequelize, DataTypes} = require('sequelize')

//Database connection with dialect of postgres specifying the database we are using
//port for my database is 5432
const sequelize = new Sequelize(`postgres://postgres:admin@localhost:5432/PFE2`, 
    {
    dialect: "postgres",  define: {
    freezeTableName: true,
  },}
  ,)

//checking if connection is done
    sequelize.authenticate().then(() => {
        console.log(`Database connected yahya to postgres`)
    }).catch((err) => {
        console.log(err)
    })

    const db = {}
    db.Sequelize = Sequelize
    db.sequelize = sequelize



//connecting to model

db.citoyen = require('./citoyenModel')(sequelize, DataTypes)
db.AgentMunicipalite = require('./agentMunicipaliteModel')(sequelize, DataTypes)
db.locataire = require('./locataireModel')(sequelize, DataTypes) 



//exporting the module
module.exports = db
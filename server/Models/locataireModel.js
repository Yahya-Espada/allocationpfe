// locataire model
module.exports = (sequelize, DataTypes) => {
        const Locataire = sequelize.define('locataire', {
            id_locataire: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
            },
            cin_locataire: {
            type: DataTypes.STRING,
            allowNull: false
            },
            nom_locataire: {
            type: DataTypes.STRING,
            allowNull: false
            },
            prenom_locataire: {
            type: DataTypes.STRING,
            allowNull: false
            },
            adresse_locataire: {
            type: DataTypes.STRING,
            allowNull: false
            },
            telephone_locataire: {
            type: DataTypes.INTEGER,
            allowNull: false
            },
            email_locataire: {
            type: DataTypes.STRING,
            allowNull: false
            }
        }, {
            tableName: 'locataire',
            timestamps: false
        });
    return Locataire
}
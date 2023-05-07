

module.exports = (sequelize, DataTypes) => {
  const AgentMunicipalite = sequelize.define('agent_municipalite', {
    id_municipalite: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nom_municipalite: {
      type: DataTypes.STRING,
      allowNull: false
    },
    prenom_municipalite: {
      type: DataTypes.STRING,
      allowNull: false
    },
    matricule_municipalite: {
      type: DataTypes.STRING,
      allowNull: false
    },
    telephone_municipalite: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    email_municipalite: {
      type: DataTypes.STRING,
      allowNull: false
    },
    adresse_municipalite: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    privilege_municipalite: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fonction_municipalite: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'agent_municipalite',
    timestamps: false
  });
  return AgentMunicipalite;
};

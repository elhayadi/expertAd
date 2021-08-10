const connection = require("../dbconnection");
const {Model, DataTypes} = connection.sequelize;

class Hotel extends Model {}

Hotel.init({
    id: {
        type: DataTypes.INTEGER,
        field: 'ID',
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        field: 'NAME'
    },
    street: {
        type: DataTypes.STRING,
        field: 'STREET'
    },
    city: {
        type: DataTypes.STRING,
        field: 'CITY'
    },
    stars: {
        type: DataTypes.INTEGER,
        field: 'STAR_RATING'
    },
}, {
    modelName: 'hotel',
    tableName: 'HOTELS',
    sequelize: connection,
    timestamps: false
});

//Exportation du modèle
module.exports = Hotel;


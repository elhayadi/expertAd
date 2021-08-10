const connection = require("../dbconnection");
const {Model, DataTypes} = connection.sequelize;

class Occupation extends Model {}

Occupation.init({
    id: {
        type: DataTypes.INTEGER,
        field: 'ID',
        unique: true
    },
    reservation_id: {
        type: DataTypes.INTEGER,
        field: 'RESERVATION_ID',
        primaryKey: true
    },
    room_id: {
        type: DataTypes.INTEGER,
        field: 'ROOM_ID',
        primaryKey: true
    },
    is_client_present: {
        type: DataTypes.BOOLEAN,
        field: 'IS_CLIENT_PRESENT'
    },
    is_archived: {
        type: DataTypes.BOOLEAN,
        field: 'IS_ARCHIVED'
    },
}, {
    modelName: 'occupation',
    tableName: 'OCCUPATIONS',
    sequelize: connection,
    timestamps: false
});

//Exportation du modèle
module.exports = Occupation;


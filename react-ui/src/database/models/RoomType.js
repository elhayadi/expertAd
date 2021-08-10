const connection = require("../dbconnection");
const {Model, DataTypes} = connection.sequelize;

class RoomType extends Model {}

RoomType.init({
    id: {
        type: DataTypes.INTEGER,
        field: 'ID',
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        field: 'NAME'
    },
    price: {
        type: DataTypes.INTEGER,
        field: 'PRICE'
    },
    bed_capacity: {
        type: DataTypes.INTEGER,
        field: 'BED_CAPACITY'
    },
    has_phone: {
        type: DataTypes.BOOLEAN,
        field: 'HAS_PHONE'
    },
    has_tv: {
        type: DataTypes.BOOLEAN,
        field: 'HAS_TV'
    }
}, {
    modelName: 'roomtype',
    tableName: 'ROOMTYPES',
    sequelize: connection,
    timestamps: false
});

//Exportation du modèle
module.exports = RoomType;


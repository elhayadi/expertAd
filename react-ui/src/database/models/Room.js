const connection = require("../dbconnection");
const {Model, DataTypes} = connection.sequelize;

class Room extends Model {}

Room.init({
    id: {
        type: DataTypes.INTEGER,
        field: 'ID',
        primaryKey: true
    },
    hotel_id: {
        type: DataTypes.INTEGER,
        field: 'HOTEL_ID',
    },
    roomtype_id: {
        type: DataTypes.STRING,
        field: 'ROOMTYPE_ID',
    }
}, {
    modelName: 'room',
    tableName: 'ROOMS',
    sequelize: connection,
    timestamps: false
});

Room.associate = () => {
    Room.belongsTo(connection.models.hotel, {foreignKey: "hotel_id", targetKey: "id"});
    Room.belongsTo(connection.models.roomtype, {foreignKey: "roomtype_id", targetKey: "id"});
};

module.exports = Room;

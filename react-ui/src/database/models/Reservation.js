const connection = require("../dbconnection");
const {Model, DataTypes} = connection.sequelize;

class Reservation extends Model {}

Reservation.init({
    id: {
        type: DataTypes.INTEGER,
        field: 'ID',
        unique: true
    },
    client_id: {
        type: DataTypes.INTEGER,
        field: 'CLIENT_ID',
        primaryKey: true
    },
    hotel_id: {
        type: DataTypes.INTEGER,
        field: 'HOTEL_ID',
        primaryKey: true
    },
    roomtype_id: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        field: 'ROOMTYPE_ID',
        primaryKey: true
    },
    arrival_date: {
        type: DataTypes.DATE,
        field: 'ARRIVAL_DATE',
        defaultValue: DataTypes.NOW,
        primaryKey: true
    },
    exit_date: {
        type: DataTypes.DATE,
        field: 'EXIT_DATE',
        defaultValue: DataTypes.NOW
    },
    duration: {
        type: DataTypes.INTEGER,
        field: 'DURATION'
    },
    room_count: {
        type: DataTypes.INTEGER,
        field: 'ROOM_COUNT'
    },
    people_count: {
        type: DataTypes.INTEGER,
        field: 'PEOPLE_COUNT'
    },
    is_payed: {
        type: DataTypes.BOOLEAN,
        field: 'IS_PAYED'
    },
    is_comfirmed: {
        type: DataTypes.BOOLEAN,
        field: 'IS_COMFIRMED'
    },
    is_cancelled: {
        type: DataTypes.BOOLEAN,
        field: 'IS_CANCELLED'
    },
    is_archived: {
        type: DataTypes.BOOLEAN,
        field: 'IS_ARCHIVED'
    },
}, {
    modelName: 'reservation',
    tableName: 'RESERVATIONS',
    sequelize: connection,
    timestamps: false
});

Reservation.associate = () => {
    Reservation.belongsTo(connection.models.client, {foreignKey: "client_id", targetKey: "id"});
    Reservation.belongsTo(connection.models.hotel, {foreignKey: "hotel_id", targetKey: "id"});
    Reservation.belongsTo(connection.models.roomtype, {foreignKey: "roomtype_id", targetKey: "id"});
};

//Exportation du modèle
module.exports = Reservation;


const connection = require("../dbconnection");
const {Model, DataTypes} = connection.sequelize;
const Client = require("./Client");
const Reservation = require("./Reservation");

class Bill extends Model {}

Bill.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        field: 'ID',
        unique: true
    },
    reservation_id: {
        type: DataTypes.INTEGER,
        field: 'RESERVATION_ID',
        references: {
            model: Reservation,
            key: 'ID'
        },
        primaryKey: true
    },
    client_id: {
        type: DataTypes.INTEGER,
        field: 'CLIENT_ID',
        references: {
            model: Client,
            key: 'ID'
        },
        primaryKey: true
    },
    amount: {
        type: DataTypes.DOUBLE,
        field: 'AMOUNT'
    },
    is_payed: {
        type: DataTypes.BOOLEAN,
        field: 'IS_PAYED'
    },
    is_archived: {
        type: DataTypes.BOOLEAN,
        field: 'IS_ARCHIVED'
    }
}, {
    modelName: 'bill',
    tableName: 'BILLS',
    sequelize: connection,
    timestamps: false
});

Bill.associate = () => {
    Bill.belongsTo(connection.models.reservation, {foreignKey: "reservation_id", targetKey: "id"});
};

//Exportation du modèle
module.exports = Bill;


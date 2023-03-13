module.exports = (sequelize, DataTypes) => {
    return sequelize.define('status', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
}

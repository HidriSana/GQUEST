module.exports = (sequelize, DataTypes) => {
    return sequelize.define('role', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
}

console.log(role === sequelize.models.User);
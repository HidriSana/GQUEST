module.exports = (sequelize, DataTypes) => {
    return sequelize.define('guild', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        guild: {
            type: DataTypes.STRING,
            allowNull: false
        },
        secretKey: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
}

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('quest', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        duration: {
            type: DataTypes.STRING,
            allowNull: false
        },
        expiration: {
            type: 'TIMESTAMP',
            allowNull: false
        },
    })
}

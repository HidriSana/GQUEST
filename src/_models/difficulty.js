module.exports = (sequelize, DataTypes) => {
    return sequelize.define('difficulty', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        difficulty: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
}

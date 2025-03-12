module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        idComment: {
            type: DataTypes.STRING,
            primaryKey: true, 
            allowNull: false,
        },
        time_signature: {
            type: DataTypes.TIME, 
            alllowNull: false,
        },

        review: {
            type: DataTypes.STRING, 
            allowNull: false,
        },

        idAnswer: {
            type: DataTypes.STRING, 
            allowNull: false,
            references: {
                model: 'Answer', 
                key: 'idAnswer',
            },
            onDelete: 'CASCADE', 
            onUpdate: 'CASCADE',
        }

    },{
        freezeTableName: true,
    timestamps: false,
    });
    return Comment;
}
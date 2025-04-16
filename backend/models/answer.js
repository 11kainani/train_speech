

module.exports = (sequelize, DataTypes) => 
{
    const Answer = sequelize.define('Answer', {
        idAnswer: {
            type:DataTypes.STRING, 
            allowNull: false,
            primaryKey: true, 
        },
        file_location:{
            type:DataTypes.STRING,
            allowNull: false,
        
        },

        answer_time: {
            type: DataTypes.TIME,
            allowNull: false,

        },

        idSubject: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
              model: 'Subject',
              key: 'idSubject',
            },
            onDelete: 'CASCADE',  
            onUpdate: 'CASCADE',
        }, 

        review: {
            type: DataTypes.STRING, 
            allowNull: true,
        },

    }, {
        freezeTableName: true,
        timestamps: true,
        
    });


    return Answer;
}
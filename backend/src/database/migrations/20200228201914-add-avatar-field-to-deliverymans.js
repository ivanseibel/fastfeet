module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('deliverymans', 'avatar_id'),
      queryInterface.addColumn('deliverymans', 'avatar_id', {
        type: Sequelize.INTEGER,
        references: {
          model: 'avatars',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      }),
    ]);
  },

  down: queryInterface => {
    return queryInterface.removeColumn('deliverymans', 'avatar_id');
  },
};

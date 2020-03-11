module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('deliveries', 'recipient_id', {
        type: Sequelize.INTEGER,
        references: {
          model: 'recipients',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      }),
    ]);
  },

  down: queryInterface => {
    return queryInterface.removeColumn('deliveriries', 'recipient_id');
  },
};

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('deliveries', 'deliveryman_id', {
        type: Sequelize.INTEGER,
        references: {
          model: 'deliverymans',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      }),
    ]);
  },

  down: queryInterface => {
    return queryInterface.removeColumn('deliveries', 'deliveryman_id');
  },
};

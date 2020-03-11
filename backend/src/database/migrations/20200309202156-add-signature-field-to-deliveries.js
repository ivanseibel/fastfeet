module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('deliveries', 'signature_id', {
        type: Sequelize.INTEGER,
        references: {
          model: 'signatures',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      }),
    ]);
  },

  down: queryInterface => {
    return queryInterface.removeColumn('deliveries', 'signatures_id');
  },
};

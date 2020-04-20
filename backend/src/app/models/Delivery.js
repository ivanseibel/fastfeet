import Sequelize, { Model } from 'sequelize';

class Delivery extends Model {
  static init(sequelize) {
    super.init(
      {
        product: Sequelize.STRING,
        canceled_at: Sequelize.DATE,
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,

        status: {
          type: Sequelize.VIRTUAL,
          get() {
            let status = '';

            if (!this.end_date && !this.canceled_at) {
              status = 'pendent';
            } else if (this.end_date && !this.canceled_at) {
              status = 'delivered';
            } else if (this.canceled_at) {
              status = 'canceled';
            } else if (this.start_date) {
              status = 'started';
            }

            return status;
          },
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Recipient, {
      foreignKey: 'recipient_id',
      as: 'recipient',
    });
    this.belongsTo(models.Deliveryman, {
      foreignKey: 'deliveryman_id',
      as: 'deliveryman',
    });
    this.belongsTo(models.Signature, {
      foreignKey: 'signature_id',
      as: 'signature',
    });
    this.hasMany(models.DeliveryProblem, {
      as: 'problem',
    });
  }
}

export default Delivery;

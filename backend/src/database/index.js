import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import User from '../app/models/User';
import Recipient from '../app/models/Recipient';
import Deliveryman from '../app/models/Deliveryman';
import Avatar from '../app/models/Avatar';
import Delivery from '../app/models/Delivery';
import Signature from '../app/models/Signature';

const models = [User, Recipient, Deliveryman, Avatar, Delivery, Signature];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();

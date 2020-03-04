import Sequelize from 'sequelize';

import databaseConfig from '../config/database';
import User from '../app/models/User';
import Recipient from '../app/models/Recipient';
import Deliveryman from '../app/models/Deliveryman';
import Avatar from '../app/models/Avatar';

const models = [User, Recipient, Deliveryman, Avatar];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connect = new Sequelize(databaseConfig);
    models.map(model => model.init(this.connect));
  }
}

export default new Database();

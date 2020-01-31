import Sequelize from 'sequelize';

import databaseConfig from '../config/database';
import User from '../app/models/User';

const models = [User];

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

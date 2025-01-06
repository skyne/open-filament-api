import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Service } from 'typedi';
import { mongo, app as appConfig } from './config';

const uri = process.env.MONGO_URI ?? `mongodb://${mongo.user}:${mongo.password}@${mongo.host}:${mongo.port}/${mongo.dbName}`;

mongoose.connection.on('connected', () => {
  console.log('Connected to database');
});

mongoose.connection.on('error', (err) => {
  console.error('Error connecting to database', err);
});


mongoose.connection.on('disconnected', () => {
  console.log('Disconnected from database');
});


@Service()
export class MongooseHandler {
  async connect() {
    if(appConfig.env !== 'test') {
      await mongoose.connect(uri, {

      });
    }
  };

  async disconnect() {
    if(appConfig.env !== 'test') {
      await mongoose.connection.close();
      await mongoose.disconnect();
    }
  }
}


@Service()
export class TestDbHandler {
  private mongod?: MongoMemoryServer;

  async connect() {
    this.mongod = await MongoMemoryServer.create();
    const uri = this.mongod.getUri();
    await mongoose.connect(uri, {
    });
  }

  async clear() {
    const collections = await mongoose.connection.db.collections();

    for (const collection of collections) {
      await collection.deleteMany({});
    }
  }

  async disconnect() {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoose.disconnect();
    if (this.mongod) {
      await this.mongod.stop();
    }
  }
}

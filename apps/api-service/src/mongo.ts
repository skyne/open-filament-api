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


export interface IDbHandler {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
}

@Service()
export class MongooseHandler implements IDbHandler {
  async connect() {
    if(appConfig.env !== 'test') {
      console.log('Connecting to MongoDB with URI:', uri.replace(/\/\/[^:]+:[^@]+@/, '//***:***@'));
      
      // Configure mongoose for better Atlas connectivity
      mongoose.set('strictQuery', false);
      
      await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 30000, // 30 seconds
        socketTimeoutMS: 45000, // 45 seconds
        maxPoolSize: 10, // Maintain up to 10 socket connections
        minPoolSize: 1, // Maintain at least 1 socket connection
        maxIdleTimeMS: 30000, // Close connections after 30 seconds of inactivity
        connectTimeoutMS: 30000, // 30 seconds connection timeout
        heartbeatFrequencyMS: 10000, // Send heartbeat every 10 seconds
        retryWrites: true, // Enable retryable writes
        retryReads: true, // Enable retryable reads
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
export class TestDbHandler implements IDbHandler {
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

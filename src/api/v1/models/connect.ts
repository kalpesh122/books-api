import mongoose, { Connection, ConnectOptions } from 'mongoose';

// @MongoDb Connection file
class MongoDBConnection {
  private connectMongod: Connection | undefined;
  private uri: string;

  constructor(
    private mongo_user: string | undefined,
    private mongo_password: string | undefined,
    private mongo_path: string | undefined,
    private options: ConnectOptions
  ) {
    this.uri = `mongodb+srv://${this.mongo_user}:${this.mongo_password}${this.mongo_path}`;
  }

  public async connect(): Promise<void> {
    try {
      this.connectMongod = (await mongoose.connect(
        this.uri,
        this.options
      )) as unknown as Connection;

      const connection = mongoose.connection;
      console.log('###########');
      console.log('Connected to MongoDB...');
      console.log(`Host :- ${connection.host}`);
      console.log(`Port :- ${connection.port}`);
      console.log(`Database Name :- ${connection.name}`);
      console.log('###########');
    } catch (error) {
      console.error('Failed to connect to MongoDB:', error);
      throw error;
    }
  }

  public async connectToSeed(): Promise<void> {
    try {
      this.connectMongod = (await mongoose.connect(
        this.uri,
        this.options
      )) as unknown as Connection;

      const connection = mongoose.connection;
    } catch (error) {
      console.error('Failed to connect to MongoDB:', error);
      throw error;
    }
  }

  public getConnection(): Connection {
    if (!this.connectMongod) {
      throw new Error('Not connected to MongoDB');
    }
    return this.connectMongod;
  }

  public async close(): Promise<void> {
    if (this.connectMongod) {
      await this.connectMongod.close();
      console.log('Disconnected from MongoDB');
    }
    this.connectMongod = undefined;
  }
}

export default MongoDBConnection;

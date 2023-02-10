import { MongoClient as Client, Db } from "mongodb";

export const MondoDB = {
  client: undefined as unknown as Client,
  db: undefined as unknown as Db,

  async connnect(): Promise<void> {
    const url = process.env.MONGODB_URL || "localhost:8000";
    const userName = process.env.MONGODB_USER;
    const password = process.env.MONGODB_PASSWORD;

    const client = new Client(url, { auth: { username: userName, password } });
    const db = client.db("user-db");

    this.client = client;
    this.db = db;

    console.log("connect mongodb");
  },
};

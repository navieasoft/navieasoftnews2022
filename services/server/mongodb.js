import { MongoClient } from "mongodb";

export async function dbConnection() {
  try {
    const uri = `mongodb+srv://${process.env.BD_USER}:${process.env.BD_PASS}@cluster0.wewoq.mongodb.net/?retryWrites=true&w=majority`;
    // const uri = "mongodb://localhost:27017";
    const client = new MongoClient(uri);
    await client.connect();
    const database = client.db("News_Portal");
    return { database };
  } catch (error) {
    return { database: null };
  }
}

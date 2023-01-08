import { MongoClient } from "mongodb";

const database_url = process.env.DATABASE_URL;


const client = new MongoClient(database_url, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});



export async function connect() {
  await client.connect();
  

  const db = client.db("Escola1");

  return { db, client };
}
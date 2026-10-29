// One-off cleanup: removes the throwaway test user created while verifying
// the auth endpoints. Safe to delete this file afterwards.
import { MongoClient } from "mongodb";

const uri = process.env.MONGO_DB_URI;
if (!uri) {
  console.error("MONGO_DB_URI not set");
  process.exit(1);
}

const email = "test-user-xyz@example.com";

const client = new MongoClient(uri);

try {
  await client.connect();
  const db = client.db("wanderlust");

  const user = await db.collection("user").findOne({ email });
  if (!user) {
    console.log("No test user found; nothing to remove.");
    process.exit(0);
  }

  const uid = user.id ?? user._id;

  const accounts = await db.collection("account").deleteMany({ userId: uid });
  const sessions = await db.collection("session").deleteMany({ userId: uid });
  const deleted = await db.collection("user").deleteOne({ _id: user._id });

  console.log(
    `Removed test user ${email} (user:${deleted.deletedCount}, account:${accounts.deletedCount}, session:${sessions.deletedCount})`
  );
} finally {
  await client.close();
}

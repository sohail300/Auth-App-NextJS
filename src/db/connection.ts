import mongoose from "mongoose";

export async function connection() {
  try {
    await mongoose.connect(process.env.DB_URI!);

    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("DB connected");
    });

    connection.on("error", (error) => {
      console.log("Error connection to db: " + error);
      process.exit(1);
    });
  } catch (error) {
    console.log(`Error connecting to DB: ${error}`);
  }
}

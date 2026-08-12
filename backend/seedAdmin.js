require("dotenv").config();

const connectDB = require("./config/db");
const createAdmin = require("./utils/createAdmin");

const seedAdmin = async () => {
  try {
    await connectDB();

    await createAdmin();

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedAdmin();
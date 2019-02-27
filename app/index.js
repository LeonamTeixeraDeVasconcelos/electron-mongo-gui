const { ipcMain } = require("electron");
const mongoose = require("mongoose");

const { Admin } = mongoose.mongo;

function connectToDatabase(connectionString, database) {
  return mongoose.connect(`${connectionString}/${database}`, {
    useNewUrlParser: true
  });
}

ipcMain.on("@databases/LIST_REQUEST", async (event, connectionString) => {
  try {
    await connectToDatabase(connectionString, "admin");

    new Admin(mongoose.connection.db).listDatabases((err, result) => {
      event.sender.send("@databases/LIST_SUCCESS", result.databases);
    });
  } catch (err) {
    event.sender.send("@databases/LIST_FAILURE");
  }
});

ipcMain.on("@collections/LIST_REQUEST", async (event, database) => {
  try {
    console.log(database);

    mongoose.connection.useDb(database);

    mongoose.connection.db.collections((err, result) => {
      console.log(result);
    });
  } catch (err) {
    event.sender.send("@databases/LIST_FAILURE");
  }
});

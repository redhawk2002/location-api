const { connectDatabase } = require("./config/database");
const app = require("./app.js");
connectDatabase();
app.listen(process.env.PORT, () => {
  console.log(`server is running in port ${process.env.PORT}`);
});

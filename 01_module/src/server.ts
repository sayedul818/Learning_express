import app from "./app";
import { client } from "./config/mongodb";

let server;
const port = 5000;



const bootstrap=async()=>{
  // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    console.log("You successfully connected to MongoDB!");

  server=app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
}
bootstrap();
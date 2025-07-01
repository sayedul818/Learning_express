import express, { Application, Request, Response } from 'express'
import fs from "fs"
import path from "path"
const app : Application = express()
const filePath = path.join(__dirname, "../db/index.json");
app.use(express.json());
const todosRouter=express.Router();
app.use("/items",todosRouter)


// get all items from index.json db
app.get('/items/list', (req : Request, res : Response) => {
  const data=fs.readFileSync(filePath,{encoding:"utf-8"});
  res.json(data);
})

// create a new item
app.post('/items/createitem', (req : Request, res : Response) => {
  const data=req.body;
  // console.log(data);
  const allitems=fs.readFileSync(filePath,{encoding:"utf-8"});
  const parseItems=JSON.parse(allitems);
  parseItems.push(data);
  console.log(parseItems)

  fs.writeFileSync(filePath,JSON.stringify(parseItems,null,2),{encoding : "utf-8"});
  res.send("succesfully new item created")
})

// getSingleItem
app.get('/items/item/:name/:department', (req: Request,res: Response)=>{
  console.log("from query",req.query)
  console.log("from params",req.params);
  const data=fs.readFileSync(filePath,{encoding:"utf-8"})
  res.json(data);
})

// using todosrouter to get item
todosRouter.get("/list",(req : Request, res : Response) => {
  const data=fs.readFileSync(filePath,{encoding:"utf-8"});
  res.json({
    message : "from todos router",
    data
  });
})
export default app;
import express, { Request, Response } from "express"
import { client } from "../config/mongodb";
import { ObjectId } from "mongodb";
export const todosRouter=express.Router();

// get all todos list
todosRouter.get("/all-list", async (req : Request, res : Response) => {
  const db = await client.db("todosDB")
  const collection= await db.collection("todos")
  const cursor=collection.find({})
  const todos= await cursor.toArray()
  res.json(todos)
})

// get a single todo list
todosRouter.get("/:id",async(req:Request,res:Response)=>{
  const id=req.params.id
  const db=await client.db("todosDB")
  const collection= await db.collection("todos")
  const data=await collection.findOne({_id: new ObjectId(id)})
  res.json(data)
})
// Create a new todo list

todosRouter.post("/create-list", async (req: Request,res: Response)=>{
  const {title,description,priority}=req.body;
  const db = await client.db("todosDB")
  const collection= await db.collection("todos")
  await collection.insertOne({
  title : title,
  description : description,
  priority: priority,
  isCompleted : true
  })
  const cursor=collection.find({})
  const data= await cursor.toArray()
  res.json(data)
})

// update-list
todosRouter.put("/update-list/:id",async(req:Request,res:Response)=>{
  const id=req.params.id
  const db= await client.db("todosDB")
  const collection= await db.collection("todos")
  const {title,description,priority,isCompleted}=req.body;
  const filter={_id: new ObjectId(id)}
  const updatedData=await collection.updateOne(
    filter,
    {$set: {title,description,priority,isCompleted}},
    {upsert: true}
  )
  res.json(updatedData)
})

// delete-list
todosRouter.delete("/delete-list/:id",async(req:Request,res:Response)=>{
  const id=req.params.id
  const db=await client.db("todosDB")
  const collection= await db.collection("todos")
  await collection.deleteOne({_id: new ObjectId(id)})
  
  res.json({
    message : "successfully deleted"
  })
})
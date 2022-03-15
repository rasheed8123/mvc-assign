console.log("happy")
const express = require("express")

const mongoose = require("mongoose")
const app = express()
app.use(express.json())

const connect = () =>{
    return mongoose.connect("mongodb://127.0.0.1:27017/mvc")
}

const UserSchema = new mongoose.Schema({
    firstname : {type:String,required:true},
    lastname : {type:String,required:true},
    gender : {type:String,required:true},
    dateofbirth : {type:String,required:true},
    type : {type:String,required:true}
},
{
    timestamp:true
})
const users = mongoose.model("user",UserSchema)
const StudentSchema = new mongoose.Schema({
    rollid : {type:Number,required:true},
    currentbatch: {type:String,required:true},
},{
    timestamp:true
})
const students = mongoose.model("student",StudentSchema)
const BatchSchema = new mongoose.Schema({
    batchname: {type:String,required:true},
},{
    timestamp:true
}) 
const batchs = mongoose.model("batch",BatchSchema)
const EvaluationSchema = new mongoose.Schema({
    dateofevaluation: {type:String,required:true},
    instructor : {type:mongoose.Schema.Types.ObjectId,ref:"user",required:true},
    batchid : {type:mongoose.Schema.Types.ObjectId,ref:"batch",required:true}
})
const evaluations = mongoose.model("evaluation",EvaluationSchema)
const SubmissionSchema = new mongoose.Schema({
    evaluationid : {type:mongoose.Schema.Types.ObjectId,ref:"evaluation",required:true},
    studentid: {type:mongoose.Schema.Types.ObjectId,ref:"students",required:true},
    marks: {type:Number,required:true},
},{
    timestamp:true
})
const submissions = mongoose.model("submission",SubmissionSchema)

app.get("/users",async(req,res)=>{
      try{
         const data = await users.find({}).lean().exec()
         return res.send(data)
      }catch(err){
          console.log(err.message)
          return res.send(err.message)
      }
})
app.post("/users",async(req,res)=>{
    try{
      const data = await users.create(req.body)
      return res.send(data)
    }
    catch(err){
        return res.send(err.message)
    }
})

app.listen(5000,async()=>{
  try{
      await connect()
  }
  catch(err){
      console.log(err.message)
  }
  console.log("listening")
})

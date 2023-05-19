import { AppDataSource } from "./data-source"
import { User } from "./entity/User"
const express=require("express")
const app=express()
const cors=require("cors")

AppDataSource.initialize().then(async () => {
    app.use(express.json())
    app.use(cors())
    const user = new User()

    const query=AppDataSource.getRepository(User)
    app.post("/users",async(req,res)=>{
        const {firstName,lastName,age}=req.body
        console.log(firstName)
        user.firstName=firstName
        user.lastName=lastName
        user.age=age
        const newUser=await query.save(user)
        res.send(newUser)
    })

    app.get('/users', async (req,res) => {
        const allUsers = await query.find()
        res.send(allUsers)
    })

    app.get("/users/:id", async (req,res) => {
        const {id} = req.params
        const getUser = await query.findOneBy({
            id : id
        })
        res.send(getUser)
    })

    app.put('/users/:id', async (req,res) => {
        const {id} = req.params
        const {firstName, lastName, age} = req.body
        const updateUser = await query.findOneBy({
            id : id
        })
        updateUser.firstName = firstName,
        updateUser.lastName = lastName,
        updateUser.age = age

        await query.save(updateUser)

        res.send("details updated !!")
    })

    app.delete("/users/:id" , async (req, res) => {
        const {id} = req.params
        const deleteUser = await query.findOneBy({
            id : id
        })
        await query.remove(deleteUser)
        res.send("user Deleted !!")
    })
 app.listen(7002,()=>{
    console.log("server running successfully on 7002")
 })  
}).catch(error => console.log(error))

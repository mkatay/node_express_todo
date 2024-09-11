import express from 'express'
const PORT=3000

const app=express()
app.use(express.json())//json formátumban érkeznek a bodyban

let todos=[
    {id:1,name:'Learn NodeJs',completed:false},
    {id:2,name:'Learn React',completed:false},
]

//az összes todo lekérése
app.get('/todos',(req,res)=>{
    res.send(todos)
})
//post -új teendő beírása
app.post('/todos',(req,res)=>{
    const newTodo={
        id:todos.length+1,
        name:req.body.name,
        completed:false
    }
    todos.push(newTodo)
    res.json(todos)
})
//delete:
app.delete('/todos/:id',(req,res)=>{
    const {id}=req.params
    //const id=req.params.id
    todos=todos.filter(item=>item.id!=id)
    res.json({msg:"Item deleted!"})
})
//put - name módosítása:
app.put('/todos/:id/name',(req,res)=>{
    const {id}=req.params
    const {name}=req.body
    const todo=todos.find(item=>item.id==id)
    if(!todo){
        res.json({msg:"Todo not found!"})
    }
    if(!name){
        res.json({msg:"Name is required!"})
    }else{
        todo.name=name
        res.json({msg:"Name updated succesfull!"})
    }
    
})
//put - completed módosítása
app.put('/todos/:id/completed',(req,res)=>{
    const {id}=req.params
    const todo=todos.find(item=>item.id==id)
    if(!todo){
        res.json({msg:"Todo not found!"})
    }
    todo.completed=!todo.completed
    res.json({msg:"Completed attr. updated succesfull!"})
})

//szerver indítása:
app.listen(PORT,()=>console.log(`server listening on port:  ${PORT}`))
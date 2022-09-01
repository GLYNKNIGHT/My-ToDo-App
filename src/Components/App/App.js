//import './App.css';
import React, { useEffect } from 'react';
import {useState} from 'react'
import Task from '../Task';
import List from '../Task List';
import Input from '../Input';
import styles from './App.module.css'




function App(){

const [input, setInput ] = useState();
const [task, setTask ]= useState({});
const [list, setList ] = useState([]);
const [editTask, setEditTask] = useState(null)
const [editText,setEditText]= useState("")

useEffect(()=> {
const temp = localStorage.getItem("list")
const savedList = JSON.parse(temp)
if (savedList){
  setList(savedList)
}
},[])

useEffect(()=>{
const json = JSON.stringify(list)
localStorage.setItem("list", json)
},[list]
)


function submitTask(){
  const newTask = {id: new Date().getTime(), task: input} 
  console.log(newTask)
  setTask (newTask);
  setList (list =>[...list, task]);

 } 

function removeTask(id){
  const newArr = list.filter((item)=> item.id !== id)
  console.log(newArr)
  setList(newArr)
}

function submitEdit(id){
 const updatedTasks = [...list].map((task)=>{
  if (task.id===id){
    task.task = editText
  }
  return task
 })
 setList(updatedTasks)
 setEditTask(null)
 setEditText("")
}

 return (
    <div className={styles.App}>
    <h1 className={styles.header}>To Do List</h1>
    
     <Input className={styles.input} onChange={(e)=> setInput(e.target.value)} value={task}/>
      <button className={styles.button} onClick={submitTask}>Add Task</button>
      <List>
          {list.map((item)=>{return <div className ={styles.task} key={item.id}>

              {editTask === item.id ?
                  (<input type="text" 
                      onChange={(e)=> setEditText(e.target.value)} 
                      value={editText}/>) 
                  :
                  (<Task text={item.task} />)}
            
            
              {editTask=== item.id ? 
                  (<button className={styles.button} onClick ={()=> submitEdit(item.id)}>Submit </button>) 
                  :
                  (<button className={styles.button} onClick= {()=> setEditTask(item.id)}>Edit</button>)
          
          }
          <button className={styles.button}  onClick={()=>removeTask(item.id)}>Done</button> 
          </div>})}
      </List>
    </div>
  );
}

export default App;

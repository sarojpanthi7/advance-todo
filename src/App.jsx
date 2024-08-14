import { useEffect, useState } from 'react'
import './App.css'
import { MdDeleteOutline } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

function App() {
  const [isCompletedScreen, setIsCompletedScreen] = useState(false);
  const [allTodos, setAllTodos] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [newTitle, setNewTitle]= useState("");
  const [newDescription, setNewDescription] = useState("");

  const handleAddToDo = ()=> {
    let newTodo = {
      title:newTitle,
      description:newDescription
    }
    let updatedTodo = [...allTodos];
    updatedTodo.push(newTodo);
    setAllTodos(updatedTodo);
    setNewTitle("");
    setNewDescription("");
    localStorage.setItem('todolist', JSON.stringify(updatedTodo));
  }
  const handleDeleteTodo = (index)=> {
    const reducedTodos = [...allTodos];
    reducedTodos.splice(index,1);
    
    localStorage.setItem('todolist',JSON.stringify(reducedTodos));

    setAllTodos(reducedTodos);
  }
  const handleCompleted = (index) =>
     {
      let filteredItem = {
        ...allTodos[index]
      }
      let updatedCompleted = [...completed];
      updatedCompleted.push(filteredItem);
      setCompleted(updatedCompleted);
      let newTodoUpdate = [...allTodos];
      newTodoUpdate.splice(index,1);
      setAllTodos(newTodoUpdate);
      localStorage.setItem('completelist',JSON.stringify(updatedCompleted));
      localStorage.setItem('todolist',JSON.stringify(newTodoUpdate));
     }
  useEffect(()=>{
    let savedTodo = JSON.parse(localStorage.getItem('todolist'));
    let savedCompleted = JSON.parse(localStorage.getItem('completelist'));
    if(savedTodo){
      setAllTodos(savedTodo);
    }
    if(savedCompleted)
    {
      setCompleted(savedCompleted);
    }
  },[])
  return (
    <>
      <div className='App'>
         <h1>My Todos</h1>
         <div className='wrapper'>
           <div className='to-do-input'>
             <div className='to-do-input-item'>
               <label>Title:</label>
               <input value={newTitle} onChange={(e)=> setNewTitle(e.target.value)} type='text' placeholder='What is your to do ?'></input>
             </div>
             <div className='to-do-input-item'>
               <label>Description:</label>
               <input value={newDescription} onChange={(e)=> setNewDescription(e.target.value)} type='text' placeholder='What is the description of your to do ?'></input>
             </div>
             <div className='to-do-input-item'>
               <button onClick={handleAddToDo} className='add-btn'>Add</button>
             </div>
           </div>

           <div className='btn-areas'>
             <button
              className={`secondary-btn ${isCompletedScreen===false && 'active'}`} 
              onClick={()=> setIsCompletedScreen(false)}>Todo</button>

             <button 
             className={`secondary-btn ${isCompletedScreen===true && 'active'}`}
             onClick={()=> setIsCompletedScreen(true)}>Completed</button>
           </div>
           <div className='to-do-list'>
             {isCompletedScreen==false && allTodos.map((item, index)=> {
              return(<div className='to-do-list-item' key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
  
                <div>
                  <MdDeleteOutline onClick={()=> handleDeleteTodo(index)} className='icon'/>
                  <FaCheck onClick={()=> handleCompleted(index)} className='check-icon'/>
                </div>
              </div>)
             })}

           {isCompletedScreen==true && completed.map((item, index)=> {
              return(<div className='to-do-list-item' key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
  
                <div>
                  <MdDeleteOutline onClick={()=> handleDeleteTodo(index)} className='icon'/>
                  <FaCheck onClick={()=> handleCompleted(index)} className='check-icon'/>
                </div>
              </div>)
             })}
           </div>
         </div>
      </div>
    </>
  )
}

export default App

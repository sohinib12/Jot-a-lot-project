// import React, { useState } from "react";
// import "./Notes.css";

// export default function ToDoTemplate() {
//     const [tasks, setTasks] = useState([
//         { task: "Take out the trash", completed: false },
//         { task: "Buy groceries", completed: false },
//         { task: "Do laundry", completed: true },
//       ]);
//       const [newTask, setNewTask] = useState("");
//       const [isVisible, setIsVisible] = useState(false);

//       const handleAddTask = (e) => {
//         e.preventDefault();
//         setTasks([...tasks, { task: newTask, completed: false }]);
//         setNewTask("");
//       };

//       const handleToggleCompleted = (index) => {
//         const updatedTasks = [...tasks];
//         updatedTasks[index].completed = !updatedTasks[index].completed;
//         setTasks(updatedTasks);
//       };

//       const handleEditTask = (index, updatedTask) => {
//         const updatedTasks = [...tasks];
//         updatedTasks[index].task = updatedTask;
//         setTasks(updatedTasks);
//       };

//       const handleDeleteTask = (index) => {
//         const updatedTasks = [...tasks];
//         updatedTasks.splice(index, 1);
//         setTasks(updatedTasks);
//       };

//       const handleSave = () => {
//         const updatedTasks = tasks.map((task) => {
//           return { task: task.task, completed: task.completed };
//         });
//         console.log(updatedTasks);
//       };

//       const handleShow = () => {
//         setIsVisible(!isVisible);
//         };


//       return (
//         <div>
//           <button onClick={() => setTasks([])}>Show To-Do List</button>
//           <div>

//             <form onSubmit={handleAddTask}>
//               <input
//                 type="text"
//                 placeholder="Add a new task"
//                 value={newTask}
//                 onChange={(e) => setNewTask(e.target.value)}
//               />
//               <button type="submit">Add</button>
//             </form>
//             {tasks.map((task, index) =>(
//               <div key={index}>
//                 <input
//                   type="checkbox"
//                   checked={task.completed}
//                   onChange={() => handleToggleCompleted(index)}
//                 />
//                 <input
//                   type="text"
//                   value={task.task}
//                   onChange={(e) => handleEditTask(index, e.target.value)}
//                 />
//                 <button onClick={() => handleDeleteTask(index)}>Delete</button>
//               </div>
//             ))}
//             <button onClick={handleSave}>Save</button>
//           </div>
//         </div>
//       );
// }

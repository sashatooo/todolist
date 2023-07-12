import { useState } from 'react'
import './App.css'
import { TaskType, Todolist } from './Todolist'
import {v1} from 'uuid'

export type FilterValuesType = "all" | "complited" | "active"
type TodoListType = {
	id: string
	title: string
	filter: FilterValuesType
}

function App() {

	let todoListId1 = v1()
	let todoListId2 = v1()

	let [todoLists, setTodolist] = useState<TodoListType[]>([
		{id:todoListId1, title:"What to learn", filter:"all"},
		{id:todoListId2, title:"What to buy", filter:"complited"}
	])

	let [tasks, setTasks] = useState({
		[todoListId1]: [
			{id: v1(), title:"HTML&CSS", isDone:true},
			{id: v1(), title:"JS", isDone:true},
			{id: v1(), title:"REACT", isDone:false}
		],
		[todoListId2]: [
			{id: v1(), title:"Milk", isDone:true},
			{id: v1(), title:"Tomato", isDone:false},
			{id: v1(), title:"Kivi", isDone:true}
		]
	})


	function changeFilter(todoListId: string, value: FilterValuesType) {
		let findTodoList = todoLists.find(t => t.id === todoListId)
		if(findTodoList) {
			findTodoList.filter = value
		}
		setTodolist([...todoLists])
	}

	function addTask(title: string, todoListId: string) {
		let newTask = {id: v1(), title:title, isDone:false}
		let targetTasks = tasks[todoListId]
		let newTasks = [newTask, ...targetTasks]
		tasks[todoListId] = newTasks
		setTasks({...tasks})
	}

	function removeTask(taskId: string, todoListId: string) {
		let targetTasks = tasks[todoListId]
		let newTasks = targetTasks.filter(t => t.id !== taskId)
		tasks[todoListId] = newTasks
		setTasks({...tasks})
	}

	function chandgeStatus(todoListId: string, taskId: string, isDone: boolean) {
		let targetTasks = tasks[todoListId]
		let task = targetTasks.find(t => t.id === taskId)
		if(task) {
			task.isDone = isDone
		}
		setTasks({...tasks})
	}

	function removeTodoList(todoListId: string) {
		let newTodoLists = todoLists.filter(t => t.id !== todoListId)
		setTodolist(newTodoLists)
		delete tasks[todoListId]
		setTasks({...tasks})
	}

	return (
		<div className="App">
			{todoLists.map(t =>  {

				let taskForTodoList = tasks[t.id]
				if(t.filter === "complited") {
					taskForTodoList = taskForTodoList.filter(t => t.isDone === false)
				}
				if(t.filter === "active") {
					taskForTodoList = taskForTodoList.filter(t => t.isDone === true)
				}
				
				return (
					<Todolist 	key={t.id}
								id={t.id}
								title={t.title} 
								tasks={taskForTodoList} 
								removeTask={removeTask}
								changeFilter={changeFilter}
								addTask={addTask}
								chandgeTaskStatus={chandgeStatus}
								filter={t.filter}
								removeTodoList={removeTodoList}/>
				)
			})}
		</div>
	)
}

export default App;

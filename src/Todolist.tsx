import { ChangeEvent, KeyboardEvent, useState } from "react"
import { FilterValuesType } from "./App"

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

type PropsType = {
	id: string
	title: string
	tasks: Array<TaskType>
	filter: FilterValuesType
	removeTask: (id: string, todoListId: string) => void
	changeFilter: (todoListId: string, value: FilterValuesType) => void
	addTask: (title: string, todoListId: string) => void
	chandgeTaskStatus: (todoListId: string, taskId: string, isDone: boolean) => void
	removeTodoList: (todoListId: string) => void
}

export function Todolist(props: PropsType) {

	let [newTaskTitle, setNewTaskTitle] = useState("")
	let [error, setError] = useState<string | null>(null)

	function onNewTitleChangeHendler(e: ChangeEvent<HTMLInputElement>) {
		setNewTaskTitle(e.currentTarget.value)
	}

	function onKeyPressHendler(e: KeyboardEvent<HTMLInputElement>) {
		setError(null)
		if(e.charCode === 13) {
			addTask()
		}
	}

	const onAllClickHendler = () => {props.changeFilter(props.id, "all")}
	const onComplitedClickHendler = () => {props.changeFilter(props.id, "complited")}
	const onActiveClickHendler = () => {props.changeFilter(props.id, "active")}
	const onClickHendler = () => {props.removeTodoList(props.id)}


	function addTask() {
		if(newTaskTitle.trim() !== "") {
			props.addTask(newTaskTitle, props.id)
			setNewTaskTitle("")
		} else {
			setError("Field is required")
		}
	
	}

	return (
		<div>
			<h1>{props.title}</h1>
			<button onClick={onClickHendler}>X</button>
			<div>
				<input 	value={newTaskTitle} 
						onChange={onNewTitleChangeHendler}
						onKeyPress={onKeyPressHendler}
						className={error ? "error" : ""}/>
				<button onClick={addTask}>+</button>
				{error && <div className="error-message">{error}</div>}
			</div>
			<ul>
				{props.tasks.map(t => {
					const onremoveHendler = () => {props.removeTask(t.id, props.id)}
					const onChandgeHengler = (e: ChangeEvent<HTMLInputElement>) => {props.chandgeTaskStatus(props.id, t.id, e.currentTarget.checked)}

					return (
						<li key={t.id} className={t.isDone ? "is-done" : ""}>
							<input type="checkbox" checked={t.isDone} onChange={onChandgeHengler}/>
							<span>{t.title}</span>
							<button onClick={onremoveHendler}>x</button>
						</li>
					)} 
				)}
			</ul>
			<div>
				<button className={props.filter === "all" ? "active-filter" : ""} onClick={onAllClickHendler}>all</button>
				<button className={props.filter === "complited" ? "active-filter" : ""} onClick={onComplitedClickHendler}>active</button>
				<button className={props.filter === "active" ? "active-filter" : ""} onClick={onActiveClickHendler}>complited</button>
			</div>
		</div>
	)
}

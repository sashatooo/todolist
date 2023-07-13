import { ChangeEvent } from "react"
import { AddItemForm } from "./AddItemForm"
import { FilterValuesType } from "./App"
import { EditableSpan } from "./EditableSpan"

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
	chandgeTodoListTitle: (title: string, todoListId: string) => void
	chandgeTaskTitle: (taskId: string, todoListId: string, title: string) => void
}

export function Todolist(props: PropsType) {


	





	const onAllClickHendler = () => {props.changeFilter(props.id, "all")}
	const onComplitedClickHendler = () => {props.changeFilter(props.id, "complited")}
	const onActiveClickHendler = () => {props.changeFilter(props.id, "active")}
	const onClickHendler = () => {props.removeTodoList(props.id)}
	const chandgeTodoListTitle = (title: string) => {props.chandgeTodoListTitle(title, props.id)}

	function addTask(title: string) {
		props.addTask(title, props.id)
	}




	return (
		<div>
			<h3>
				<EditableSpan title={props.title} chandgeTitle={chandgeTodoListTitle}/>
				<button onClick={onClickHendler}>X</button>
			</h3>
			<AddItemForm addItem={addTask} />
			<ul>
				{props.tasks.map(t => {
					const onremoveHendler = () => {props.removeTask(t.id, props.id)}
					const onChandgeHengler = (e: ChangeEvent<HTMLInputElement>) => {props.chandgeTaskStatus(props.id, t.id, e.currentTarget.checked)}
					const chandgeTaskTitleHendler = (title: string) => {
						props.chandgeTaskTitle(t.id, props.id, title)
					}

					return (
						<li key={t.id} className={t.isDone ? "is-done" : ""}>
							<input type="checkbox" checked={t.isDone} onChange={onChandgeHengler}/>
							<EditableSpan title={t.title} chandgeTitle={chandgeTaskTitleHendler}/>
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



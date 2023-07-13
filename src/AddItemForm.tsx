import { ChangeEvent, KeyboardEvent, useState } from "react"

type AddItemFormPropsType = {
	addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {

	let [newTaskTitle, setNewTaskTitle] = useState("")
	let [error, setError] = useState<string | null>(null)

	function onNewTitleChangeHendler(e: ChangeEvent<HTMLInputElement>) {
		setNewTaskTitle(e.currentTarget.value)
	}

	function onKeyPressHendler(e: KeyboardEvent<HTMLInputElement>) {
		setError(null)
		if (e.charCode === 13) {
			addTask()
		}
	}

	function addTask() {
		if (newTaskTitle.trim() !== "") {
			props.addItem(newTaskTitle.trim())
			setNewTaskTitle("")
		} else {
			setError("Field is required")
		}
	}

	return (
		<div>
			<input value={newTaskTitle}
				onChange={onNewTitleChangeHendler}
				onKeyPress={onKeyPressHendler}
				className={error ? "error" : ""} />
			<button onClick={addTask}>+</button>
			{error && <div className="error-message">{error}</div>}
		</div>
	);
}

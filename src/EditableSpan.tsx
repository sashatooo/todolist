import { ChangeEvent, useState } from "react";

type EditableSpanPropsType = {
	title: string;
	chandgeTitle: (title: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {

	let [editMode, setEditMode] = useState(false)
	let [title, setTitle] = useState("")

	const activateEditMode = () => {
		setEditMode(true)
		setTitle(props.title)
	}
	const activateViewMode = () => {
		setEditMode(false)
		props.chandgeTitle(title)
	}
	const onChandgeTitleHendler = (e: ChangeEvent<HTMLInputElement>) => {setTitle(e.currentTarget.value)}

	return (
		editMode 
			? <input value={title} onChange={onChandgeTitleHendler} onBlur={activateViewMode} autoFocus/> 
			: <span onDoubleClick={activateEditMode}>{props.title}</span> 
	)
}

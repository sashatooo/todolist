import { TaskStateType } from "../App"
import { removeTaskAC, addTaskAC, tasksReducer, changeTaskStatusAC, changeTaskTitleAC } from "./tasks-reducer"
import { addTodolistAC, removeTodolistAC } from "./todolists-reducer"


test("correct task should be deleted from correct array", () => {

    const startState: TaskStateType = {
		"todoListId1": [
			{id: "1", title:"HTML&CSS", isDone:true},
			{id: "2", title:"JS", isDone:true},
			{id: "3", title:"REACT", isDone:false}
		],
		"todoListId2": [
			{id: "1", title:"Milk", isDone:true},
			{id: "2", title:"Tomato", isDone:false},
			{id: "3", title:"Kivi", isDone:true}
		]
	}

    const action = removeTaskAC("todoListId2", "2")

    const endState = tasksReducer(startState, action)


    expect(endState["todoListId1"].length).toBe(3)
    expect(endState["todoListId2"].length).toBe(2)
    expect(endState["todoListId2"].every(t => t.id != '2')).toBeTruthy()

})

test("correct task should be added to correct array", () => {
    const startState: TaskStateType = {
		"todoListId1": [
			{id: "1", title:"HTML&CSS", isDone:true},
			{id: "2", title:"JS", isDone:true},
			{id: "3", title:"REACT", isDone:false}
		],
		"todoListId2": [
			{id: "1", title:"Milk", isDone:true},
			{id: "2", title:"Tomato", isDone:false},
			{id: "3", title:"Kivi", isDone:true}
		]
	}

    const action = addTaskAC("todoListId2", "oranje")
    const endState = tasksReducer(startState, action)

    expect(endState["todoListId1"].length).toBe(3)
    expect(endState["todoListId2"].length).toBe(4)
    expect(endState["todoListId2"][0].id).toBeDefined()
    expect(endState["todoListId2"][0].title).toBe("oranje")
    expect(endState["todoListId2"][0].isDone).toBe(false)
})

test("status of specified task should be changed", () => {
    const startState: TaskStateType = {
		"todoListId1": [
			{id: "1", title:"HTML&CSS", isDone:true},
			{id: "2", title:"JS", isDone:false},
			{id: "3", title:"REACT", isDone:false}
		],
		"todoListId2": [
			{id: "1", title:"Milk", isDone:true},
			{id: "2", title:"Tomato", isDone:false},
			{id: "3", title:"Kivi", isDone:true}
		]
	}

    const action = changeTaskStatusAC("todoListId2", "2", true)
    const endState = tasksReducer(startState, action)

    expect(endState["todoListId1"][1].isDone).toBe(false)
    expect(endState["todoListId2"][2].isDone).toBe(true)
})

test("title of specified task should be changed", () => {
    const startState: TaskStateType = {
		"todoListId1": [
			{id: "1", title:"HTML&CSS", isDone:true},
			{id: "2", title:"JS", isDone:false},
			{id: "3", title:"REACT", isDone:false}
		],
		"todoListId2": [
			{id: "1", title:"Milk", isDone:true},
			{id: "2", title:"Tomato", isDone:false},
			{id: "3", title:"Kivi", isDone:true}
		]
	}

    const action = changeTaskTitleAC("todoListId2", "2", "Coffe")
    const endState = tasksReducer(startState, action)

    expect(endState["todoListId1"][1].title).toBe("JS")
    expect(endState["todoListId2"][1].title).toBe("Coffe")
})

test("new prorerty with new array should be added when new todolist added", () => {
    const startState: TaskStateType = {
		"todoListId1": [
			{id: "1", title:"HTML&CSS", isDone:true},
			{id: "2", title:"JS", isDone:false},
			{id: "3", title:"REACT", isDone:false}
		],
		"todoListId2": [
			{id: "1", title:"Milk", isDone:true},
			{id: "2", title:"Tomato", isDone:false},
			{id: "3", title:"Kivi", isDone:true}
		]
	}

	const action = addTodolistAC("new Todolist")
	const endState = tasksReducer(startState, action)

	const keys = Object.keys(endState)
	const newKey = keys.find(k => k != "todoListId1" && k != "todoListId2")
	if(!newKey) {
		throw Error("new key should be added")
	}

	expect(keys.length).toBe(3)
	expect(endState[newKey]).toEqual([])
})

test("property with todolistId should be deleted", () => {
    const startState: TaskStateType = {
		"todoListId1": [
			{id: "1", title:"HTML&CSS", isDone:true},
			{id: "2", title:"JS", isDone:false},
			{id: "3", title:"REACT", isDone:false}
		],
		"todoListId2": [
			{id: "1", title:"Milk", isDone:true},
			{id: "2", title:"Tomato", isDone:false},
			{id: "3", title:"Kivi", isDone:true}
		]
	}

	const action = removeTodolistAC("todoListId2")
	const endState = tasksReducer(startState, action)

	const keys = Object.keys(endState)

	expect(keys.length).toBe(1)
	expect(endState["todoListId2"]).not.toBeDefined()
})
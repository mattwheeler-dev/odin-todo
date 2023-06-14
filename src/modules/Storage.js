import ToDoList from "./ToDoList";
import Project from "./Project";
import ToDo from "./ToDo";

export default class Storage {
	// SAVE LIST TO LOCAL
	static saveTodoList(data) {
		localStorage.setItem("todoList", JSON.stringify(data));
	}

	// RETURN LIST FROM LOCAL
	static getTodoList() {
		const todoList = Object.assign(
			new ToDoList(),
			JSON.parse(localStorage.getItem("todoList"))
		);

		todoList.setProjects(
			todoList
				.getProjects()
				.map((project) => Object.assign(new Project(), project))
		);

		todoList
			.getProjects()
			.forEach((project) =>
				project.setTodos(
					project.getTodos().map((todo) => Object.assign(new ToDo(), todo))
				)
			);
		return todoList;
	}

	// ADD / REMOVE PROJECTS
	static addProject(project) {
		const todoList = Storage.getTodoList();
		todoList.addProject(project);
		Storage.saveTodoList(todoList);
	}

	static deleteProject(projectName) {
		const todoList = Storage.getTodoList();
		todoList.deleteProject(projectName);
		Storage.saveTodoList(todoList);
	}

	// ADD / REMOVE / EDIT TODOS
	static addTodo(projectName, todo) {
		const todoList = Storage.getTodoList();
		todoList.getProject(projectName).addTodo(todo);
		Storage.saveTodoList(todoList);
	}

	static deleteTodo(projectName, todoName) {
		const todoList = Storage.getTodoList();
		todoList.getProject(projectName).deleteTodo(todoName);
		Storage.saveTodoList(todoList);
	}

	static renameTodo(projectName, todoName, newTodoName) {
		const todoList = Storage.getTodoList();
		todoList.getProject(projectName).getTodo(todoName).setName(newTodoName);
		Storage.saveTodoList(todoList);
	}
}

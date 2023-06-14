import Storage from "./Storage";
import Project from "./Project";
import ToDo from "./ToDo";

export default class UI {
	// LOAD CONTENT
	static loadHomepage() {
		UI.loadProjects();
		UI.initProjectBtns();
		UI.openProject(
			"Default Project",
			document.querySelector("#default-project")
		);
		document.addEventListener("keydown", UI.handleKeyboardInput);
	}

	// LOAD PROJECTS
	static loadProjects() {
		Storage.getTodoList()
			.getProjects()
			.forEach((project) => {
				UI.createProject(project.name);
			});
		UI.initAddProjectBtns();
	}

	// LOAD TODOS
	static loadTodos(projectName) {
		Storage.getTodoList()
			.getProject(projectName)
			.getTodos()
			.forEach((todo) => UI.createTodo(todo.name));
		UI.initAddTodoBtns();
	}

	// LOAD TODO LIST
	static loadTodoList(projectName) {
		const listDisplay = document.querySelector("#list-display");

		listDisplay.innerHTML = `
    <h2 id="project-title">${projectName}</h1>
    <div id="todo-list"></div>
    <button id="add-todo-btn">
    <i class="fas fa-plus"></i>
    Add Task</button>
    `;
	}
}

export default class Project {
	constructor(name) {
		this.name = name;
		this.todos = [];
	}

	// SETTER & GETTER FOR PROJECT NAME
	setName(name) {
		this.name = name;
	}

	getName() {
		return this.name;
	}

	// SETTER & GETTER FOR TODOS
	setTodos(todos) {
		this.todos = todos;
	}

	getTodos() {
		return this.todos;
	}

	// SINGULAR TODO METHODS
	getTodo(todoName) {
		return this.todos.find((todo) => todo.getName() === todoName);
	}

	contains(todoName) {
		return this.todos.some((todo) => todo.getName() === todoName);
	}

	addTodo(newTodo) {
		if (this.todos.find((todo) => todo.getName() === newTodo.name)) return;
		this.todos.push(newTodo);
	}

	deleteTodo(todoName) {
		this.todos = this.todos.filter((todo) => todo.name !== todoName);
	}
}

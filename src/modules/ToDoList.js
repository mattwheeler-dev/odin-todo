import Project from "./Project";

export default class ToDoList {
	constructor() {
		this.projects = [];
		this.projects.push(new Project("Default Project"));
	}

	// SETTER & GETTER FOR PROJECTS
	setProjects(projects) {
		this.projects = projects;
	}

	getProjects() {
		return this.projects;
	}

	// SINGULAR PROJECT METHODS
	getProject(projectName) {
		return this.projects.find((project) => project.getName() === projectName);
	}

	contains(projectName) {
		return this.projects.some((project) => project.getName() === projectName);
	}

	addProject(newProject) {
		this.projects.push(newProject);
	}

	deleteProject(projectName) {
		const targetProject = this.projects.find(
			(project) => project.getName() === projectName
		);
		this.projects.splice(this.projects.indexOf(targetProject), 1);
	}
}

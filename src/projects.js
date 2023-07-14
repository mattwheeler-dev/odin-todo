import dom from "./dom";

const projects = (() => {
	let projectsList = [];

	// GET DEFAULT PROJECTS AND TASKS FROM LOCAL STORAGE
	if (localStorage.getItem("projects") === null) {
		projectsList = [
			{
				title: "Craft New Project",
				tasks: [
					{
						title: "Enjoy my tea as much as my coding! ",
						description:
							"Longer description of my demo task, just to show you this surprisingly nice scrollbar and amazingly cute kitty ฅ(^◉ᴥ◉^)ฅ",
						date: "2023-06-29",
						priority: "low",
						projectIndex: 0,
						taskIndex: 0,
						completed: false,
					},
				],
			},
			{
				title: "Craft Another Project",
				tasks: [
					{
						title: "Create magic through my mind and my keyboard...",
						description:
							"Another longer description of my demo task, just to show you this surprisingly nice scrollbar and cute little birdie ϵ( ‘Θ’ )϶♪♫",
						date: "2023-06-30",
						priority: "high",
						projectIndex: 1,
						taskIndex: 0,
						completed: false,
					},
				],
			},
		];
	} else {
		const projectsFromStorage = JSON.parse(localStorage.getItem("projects"));
		projectsList = projectsFromStorage;
	}

	class Project {
		constructor(title) {
			this.title = title;
			this.tasks = [];
		}
	}

	function addProject(title) {
		const project = new Project(title);
		projectsList.push(project);
		dom.showProjects();
	}

	function editProject(title, index, link) {
		projectsList[index].title = title;
		dom.showProjects();
		dom.selectLink(link, index, "edit");
	}

	function deleteProject(index) {
		if (index >= 0) {
			projectsList.splice(index, 1);
		}
		dom.showProjects();
	}

	return {
		projectsList,
		addProject,
		editProject,
		deleteProject,
	};
})();

export default projects;

import { format, parseISO, differenceInDays } from "date-fns";
import projects from "./projects";
import tasks from "./tasks";

const dom = (() => {
	const sidebar = document.querySelector("#sidebar");
	const openBtn = document.querySelector(".nav-open");
	const modal = document.querySelector("#modal-container");
	const form = document.querySelector("form");
	const modalTitle = modal.querySelector("#modal-title");
	const modalTitleInput = modal.querySelector("#modal-title-input");
	const modalTitleError = modal.querySelector(".modal-title-error");
	const projectTitle = document.querySelector("#project-title");
	const projectsLinksDiv = document.querySelector("#projects-links");
	const tasksList = document.querySelector(".tasks-list");
	const taskDescription = modal.querySelector(".task-description");
	const taskDueDate = modal.querySelector("#dueDate");
	const taskPrioritySelection = modal.querySelector(".task-priority");

	// OPEN SIDEBAR
	function openMenu() {
		openBtn.classList.add("hide");
		sidebar.classList.add("active");
	}

	// CLOSE SIDEBAR
	function closeMenu() {
		openBtn.classList.remove("hide");
		sidebar.classList.remove("active");
	}

	// TODO LIST TITLE
	function showMainTitle(index) {
		const menuTexts = document.querySelectorAll(".menu-link-text");
		const menuTextsArray = Array.from(menuTexts);
		projectTitle.textContent = menuTextsArray[index].textContent;
	}

	function changeMainTitle(target, index) {
		// SHOW GROUP'S TASKS
		if (
			target.classList.contains("menu-link") ||
			target.classList.contains("menu-link-text")
		) {
			showMainTitle(index);
		}

		// SHOW PROJECT'S TASKS
		if (
			target.classList.contains("project-link") ||
			target.classList.contains("project-text")
		) {
			projectTitle.textContent = projects.projectsList[index].title;
		}
	}

	function watchTaskInfo(projectIndex, taskIndex) {
		const infoTaskTitle = document.querySelector(".info-task-title");
		const infoTaskDescription = document.querySelector(
			".info-task-description"
		);
		const infoTaskDueDate = document.querySelector(".info-task-due-date");
		const infoTaskPriority = document.querySelector(".info-task-priority");
		const infoTaskProject = document.querySelector(".info-task-project");

		// TASK TITLE
		infoTaskTitle.textContent =
			projects.projectsList[projectIndex].tasks[taskIndex].title;

		// TASK DESCRIPTION
		infoTaskDescription.textContent =
			projects.projectsList[projectIndex].tasks[taskIndex].description;

		// TASK DUE DATE
		infoTaskDueDate.textContent =
			projects.projectsList[projectIndex].tasks[taskIndex].date;

		// TASK PRIORITY
		if (
			projects.projectsList[projectIndex].tasks[taskIndex].priority === "low"
		) {
			infoTaskPriority.textContent = "Not important...";
		} else if (
			projects.projectsList[projectIndex].tasks[taskIndex].priority === "medium"
		) {
			infoTaskPriority.textContent = "Somewhat important";
		} else if (
			projects.projectsList[projectIndex].tasks[taskIndex].priority === "high"
		) {
			infoTaskPriority.textContent = "Extremely important!";
		} else {
			infoTaskPriority.textContent = "";
		}

		// TASK PROJECT
		infoTaskProject.textContent = projects.projectsList[projectIndex].title;
	}

	function manipulateModal(
		modalState,
		modalTask,
		modalAction,
		projectIndex,
		taskIndex
	) {
		const modalTaskBtn = modal.querySelector(".modal-task-button");
		const projectDeletionText = modal.querySelector(".project-deletion-text");
		const taskDeletionText = modal.querySelector(".task-deletion-text");
		const taskInfoDiv = modal.querySelector(".info-div");
		const confirmBtn = modal.querySelector(".confirm-modal");
		const cancelBtn = modal.querySelector(".cancel-modal");

		form.reset();
		form.classList.remove("hide");
		taskInfoDiv.classList.add("hide");
		modalTitleError.classList.add("hide");
		projectDeletionText.classList.add("hide");
		taskDeletionText.classList.add("hide");
		cancelBtn.classList.remove("cancel-deletion");
		confirmBtn.classList.remove("confirm-deletion", "hide");

		if (modalState === "show") {
			const modalTasksDiv = modal.querySelector(".modal-tasks-div");
			modal.classList.remove("hide");
			modalTitle.textContent = modalTask;
			modalTaskBtn.textContent = modalAction;
			modalTasksDiv.classList.add("hide");

			// IF MODAL IS FOR EDITING PROJECT
			if (modalTask === "Edit Project") {
				const allProjectIcons = modal.querySelectorAll(".icon");
				const projectIcon = projects.projectsList[projectIndex].icon;

				// SHOW EDITABLE PROJECT TITLE
				modalTitle.value = projects.projectsList[projectIndex].title;

				// SELECT EDITABLE PROJECT ICON
				for (let i = 0; i < allProjectIcons.length; i += 1) {
					if (allProjectIcons[i].value === projectIcon) {
						allProjectIcons[i].checked = true;
					}
				}

				// IF MODAL IS FOR ADDING / EDITING TASK
			} else if (modalTask === "Add Task" || modalTask === "Edit Task") {
				modalTasksDiv.classList.remove("hide");

				if (modalTask === "Edit Task") {
					modalTitleInput.value =
						projects.projectsList[projectIndex].tasks[taskIndex].title;
					taskDescription.value =
						projects.projectsList[projectIndex].tasks[taskIndex].description;
					taskDueDate.value =
						projects.projectsList[projectIndex].tasks[taskIndex].date;
					taskPrioritySelection.value =
						projects.projectsList[projectIndex].tasks[taskIndex].priority;
				}

				// IF MODAL IS FOR WATCHING TASK INFO
			} else if (modalTask === "Task Info") {
				form.classList.add("hide");
				confirmBtn.classList.add("hide");
				taskInfoDiv.classList.remove("hide");
				watchTaskInfo(projectIndex, taskIndex);
			}
		}

		// DELETION MODAL CONTENT
		if (modalAction === "Delete") {
			form.classList.add("hide");
			cancelBtn.classList.add("cancel-deletion");
			confirmBtn.classList.add("confirm-deletion");

			// PROJECT DELETION
			if (modalTask === "Delete Project") {
				const projectDeletionTitle = document.querySelector(
					".project-deletion-title"
				);

				projectDeletionText.classList.remove("hide");
				projectDeletionTitle.textContent =
					projects.projectsList[projectIndex].title;

				// TASK DELETION
			} else if (modalTask === "Delete Task") {
				const taskDeletionTitle = document.querySelector(
					".task-deletion-title"
				);

				taskDeletionText.classList.remove("hide");
				taskDeletionTitle.textContent =
					projects.projectsList[projectIndex].tasks[taskIndex].title;
			}
		}

		// TO CLOSE THE MODAL
		if (modalState === "close") {
			modal.classList.add("hide");
		}
	}

	function showTasks(menuTitle, projectIndexStart, projectIndexEnd) {
		const todayDate = format(new Date(), "yyyy-MM-dd");

		tasksList.textContent = "";

		// GENERATE TASKS LIST
		for (let i = projectIndexStart; i < projectIndexEnd; i += 1) {
			for (let j = 0; j < projects.projectsList[i].tasks.length; j += 1) {
				const task = document.createElement("div");
				const taskCheckAndText = document.createElement("div");
				const taskCheckIcon = document.createElement("i");
				const taskText = document.createElement("p");
				const taskIcons = document.createElement("div");
				const taskDate = document.createElement("p");
				const taskEditIcon = document.createElement("i");
				const taskTrashIcon = document.createElement("i");
				const taskInfoIcon = document.createElement("i");

				// CLICKED TODAY LINK
				if (menuTitle === "today") {
					if (projects.projectsList[i].tasks[j].date !== todayDate) {
						// SKIP IF NOT FOR TODAY
						continue;
					}

					// CLICKED WEEK LINK
				} else if (menuTitle === "week") {
					const dateOfToday = parseISO(todayDate);
					const dateOfTask = parseISO(projects.projectsList[i].tasks[j].date);

					if (
						!(
							differenceInDays(dateOfTask, dateOfToday) <= 7 &&
							differenceInDays(dateOfTask, dateOfToday) >= 0
						)
					) {
						// SKIP IF NOT FOR WEEK
						continue;
					}

					// CLICKED COMPLETED LINK
				} else if (
					menuTitle === "completed" &&
					projects.projectsList[i].tasks[j].completed !== true
				) {
					continue;
				}

				// TASK PRIORITY, TEXT & DIV
				task.classList.add("task");
				task.setAttribute("data-project-index", i);
				task.setAttribute("data-task-index", j);
				taskCheckAndText.classList.add("task-name");
				taskCheckIcon.setAttribute("data-project-index", i);
				taskCheckIcon.setAttribute("data-task-index", j);

				taskText.classList.add("task-text");
				taskText.textContent = projects.projectsList[i].tasks[j].title;
				taskText.setAttribute("data-project-index", i);
				taskText.setAttribute("data-task-index", j);

				// TASK ICONS
				taskIcons.classList.add("task-icons");
				// TASKS DUE DATE
				taskDate.classList.add("task-date");
				if (projects.projectsList[i].tasks[j].date !== undefined) {
					taskDate.textContent = projects.projectsList[i].tasks[j].date;
				} else {
					taskDate.textContent = "";
				}

				// TASK EDIT ICON
				taskEditIcon.classList.add(
					"fa-solid",
					"fa-pen-to-square",
					"edit-task",
					"task-icon"
				);
				taskEditIcon.setAttribute("data-project-index", i);
				taskEditIcon.setAttribute("data-task-index", j);

				// TASK DELETE ICON
				taskTrashIcon.classList.add(
					"fa-regular",
					"fa-trash-can",
					"delete-task",
					"task-icon"
				);
				taskTrashIcon.setAttribute("data-project-index", i);
				taskTrashIcon.setAttribute("data-task-index", j);

				// TASK INFO ICON
				taskInfoIcon.classList.add("fa-solid", "fa-circle-info", "task-icon");
				taskInfoIcon.setAttribute("data-project-index", i);
				taskInfoIcon.setAttribute("data-task-index", j);

				// APPENDS
				taskCheckAndText.appendChild(taskCheckIcon);
				taskCheckAndText.appendChild(taskText);
				taskIcons.appendChild(taskDate);
				taskIcons.appendChild(taskEditIcon);
				taskIcons.appendChild(taskTrashIcon);
				taskIcons.appendChild(taskInfoIcon);
				task.appendChild(taskCheckAndText);
				task.appendChild(taskIcons);
				tasksList.appendChild(task);

				// TASK COMPLETION
				if (projects.projectsList[i].tasks[j].completed === false) {
					taskText.classList.remove("complete");
					taskCheckIcon.classList.add("fa-regular", "fa-circle", "task-icon");
				} else {
					taskCheckIcon.classList.remove("fa-regular", "fa-circle");
					taskText.classList.add("complete");
					taskCheckIcon.classList.add("fa-solid", "fa-circle-check");
				}
			}
		}
		manipulateModal("close");
	}

	function getTasks(menuTitle, projectIndex) {
		let projectIndexStart;
		let projectIndexEnd;

		// SAVE PROJECTS WITH TASKS TO LOCAL STORAGE
		localStorage.setItem("projects", JSON.stringify(projects.projectsList));

		// IF CLICKED ON PROJECT LINK
		if (menuTitle === "project") {
			projectIndexStart = projectIndex;
			projectIndexEnd = projectIndex + 1;

			// IF CLICKED ON MENU LINK
		} else {
			projectIndexStart = 0;
			projectIndexEnd = projects.projectsList.length;
		}
		showTasks(menuTitle, projectIndexStart, projectIndexEnd);
	}

	function selectLink(target, index, action) {
		const allLinks = document.querySelectorAll("a");
		const allProjectLinks = document.querySelectorAll(".project-link");
		const allProjectLinksArray = Array.from(allProjectLinks);
		const menuTitle = target.getAttribute("data-title");

		allLinks.forEach((link) => {
			link.classList.remove("active-link");
		});

		// CLICKED ON LINK => SET LINK ACTIVE
		if (
			target.classList.contains("menu-link") ||
			target.classList.contains("project-link")
		) {
			target.classList.add("active-link");

			// CLICKED EDIT PROJECT => SET LINK ACTIVE
			if (action === "edit") {
				allProjectLinksArray[index].classList.add("active-link");
			}

			// CLICKED MENU / PROJECT LINK TEXT => SET LINK ACTIVE
		} else if (
			target.classList.contains("menu-link-text") ||
			target.classList.contains("project-text")
		) {
			target.parentElement.classList.add("active-link");
		}

		// CLICKED PROJECT LINK => SHOW TASKS
		if (target.classList.contains("project-link")) {
			getTasks("project", index);

			// CLICKED PROJECT ICONS / DIV => SET LINK ACTIVE
			if (target.classList.contains("project-icons-div")) {
				target.parentElement.classList.add("active-link");
			} else if (
				target.classList.contains("edit-project") ||
				target.classList.contains("delete-project")
			) {
				target.parentElement.parentElement.classList.add("active-link");
			}
		}

		//  CLICKED MENU LINK => SHOW TASKS
		if (
			target.classList.contains("menu-link") ||
			target.classList.contains("menu-link-text")
		) {
			getTasks(menuTitle);
		}
	}

	function validateModal(modalAction, projectIndex, taskIndex, clickedLink) {
		const modalTitleText = modalTitleInput.value;
		const menuLinkAll = document.querySelector(".menu-link");
		let taskPriority;

		// CHECK FOR MODAL TITLE ERROR IF MODAL FORM IS SHOWN
		if (!form.classList.contains("hide") && modalTitleText === "") {
			modalTitleError.classList.remove("hide");
			modalTitleError.classList.add("show");

			// ADD PROJECT TO ARRAY
		} else if (
			modalAction === "add" &&
			modalTitle.textContent === "Add Project"
		) {
			projects.addProject(modalTitleText);

			// SET NEW PROJECT ACTIVE
			const lastProject = projectsLinksDiv.lastChild;
			const lastProjectIndex =
				projectsLinksDiv.lastChild.getAttribute("data-link-index");

			selectLink(lastProject, lastProjectIndex);
			changeMainTitle(lastProject, lastProjectIndex);
		} // EDIT PROJECT IN ARRAY
		else if (
			modalAction === "edit" &&
			modalTitle.textContent === "Edit Project"
		) {
			const allProjectLinks = document.querySelectorAll(".project-link");
			const editedProject = allProjectLinks[projectIndex];

			projects.editProject(modalTitleText, projectIndex, clickedLink);
			changeMainTitle(editedProject, projectIndex);

			// DELETE PROJECT FROM ARRAY
		} else if (
			modalAction === "delete" &&
			modalTitle.textContent === "Delete Project"
		) {
			projects.deleteProject(projectIndex);
			menuLinkAll.classList.add("active-link");

			// ADD TASK TO ARRAY
		} else if (modalAction === "add" && modalTitle.textContent === "Add Task") {
			// CHECK TASK PRIORITY
			if (taskPrioritySelection.value === "low") {
				taskPriority = "low";
			} else if (taskPrioritySelection.value === "medium") {
				taskPriority = "medium";
			} else if (taskPrioritySelection.value === "high") {
				taskPriority = "high";
			} else {
				taskPriority = "";
			}

			tasks.addTask(
				modalTitleText,
				taskDescription.value,
				taskDueDate.value,
				taskPriority,
				projectIndex
			);

			// IF TASK IS TO BE EDITED / DELETED
		} else if (modalAction === "edit" || modalAction === "delete") {
			let menuTitle;

			// IF TASK IS TO BE EDITED / DELETED FROM GROUP LINK
			if (clickedLink.classList.contains("menu-link")) {
				menuTitle = clickedLink.getAttribute("data-title");

				// IF TASK IS TO BE EDITED / DELETED FROM PROJECT LINK
			} else if (clickedLink.classList.contains("project-link")) {
				menuTitle = "project";
			}

			// EDIT TASK
			if (modalAction === "edit") {
				const taskNewTitle = modalTitleInput.value;
				const taskNewDescription = taskDescription.value;
				const taskNewDate = taskDueDate.value;
				const taskNewPriority = taskPrioritySelection.value;

				tasks.editTask(
					taskNewTitle,
					taskNewDescription,
					taskNewDate,
					taskNewPriority,
					projectIndex,
					taskIndex
				);

				// DELETE TASK
			} else if (
				modalAction === "delete" &&
				modalTitle.textContent === "Delete Task"
			) {
				tasks.deleteTask(projectIndex, taskIndex);
			}
			getTasks(menuTitle, projectIndex);
		}
	}

	function showProjects() {
		// SAVE PROJECTS TO LOCAL STORAGE
		localStorage.setItem("projects", JSON.stringify(projects.projectsList));

		projectsLinksDiv.textContent = "";

		// BUILD PROJECTS LINKS LIST
		for (let i = 0; i < projects.projectsList.length; i += 1) {
			const projectLink = document.createElement("a");
			const projectText = document.createElement("span");
			const projectIcons = document.createElement("div");
			const projectEditIcon = document.createElement("i");
			const projectTrashIcon = document.createElement("i");

			// PROJECT LINK
			projectLink.classList.add("project-link");
			projectLink.setAttribute("href", "#");
			projectLink.setAttribute("data-link-index", i);

			// PROJECT TEXT
			projectText.classList.add("project-text");
			projectText.textContent = projects.projectsList[i].title;
			projectText.setAttribute("data-link-index", i);

			// PROJECT EDIT / DELETE ICONS
			projectEditIcon.classList.add(
				"fa-solid",
				"fa-pen-to-square",
				"edit-project"
			);
			projectEditIcon.setAttribute("data-link-index", i);

			projectTrashIcon.classList.add(
				"fa-regular",
				"fa-trash-can",
				"delete-project"
			);
			projectTrashIcon.setAttribute("data-link-index", i);

			// APPENDS
			projectsLinksDiv.appendChild(projectLink);
			projectLink.appendChild(projectText);
			projectLink.appendChild(projectIcons);
			projectIcons.appendChild(projectEditIcon);
			projectIcons.appendChild(projectTrashIcon);
		}
		manipulateModal("close");
	}

	return {
		openMenu,
		closeMenu,
		showMainTitle,
		changeMainTitle,
		manipulateModal,
		showTasks,
		getTasks,
		selectLink,
		validateModal,
		showProjects,
	};
})();

export default dom;

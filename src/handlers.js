import dom from "./dom";
import tasks from "./tasks";

const handlers = (() => {
	function listenClicks() {
		let projectIndex;
		let taskIndex;

		document.addEventListener("click", (event) => {
			const { target } = event;
			const modalTitle = document.querySelector("#modal-title");
			const activeLink = document.querySelector(".active-link");
			const linkIndex = target.getAttribute("data-link-index");

			// OPEN SIDEBAR
			if (
				target.classList.contains("nav-open") ||
				target.classList.contains("fa-bars-staggered")
			) {
				dom.openMenu();
			}

			// CLOSE SIDEBAR
			if (
				target.classList.contains("nav-close") ||
				target.classList.contains("fa-xmark")
			) {
				dom.closeMenu();
			}

			// STYLE ACTIVE LINK
			if (
				target.classList.contains("menu-link") ||
				target.classList.contains("menu-link-text") ||
				target.classList.contains("project-link") ||
				target.classList.contains("project-text")
			) {
				dom.selectLink(target, linkIndex);
				dom.changeMainTitle(target, linkIndex);
			}

			// ADD PROJECT MODAL
			if (target.classList.contains("add-project-btn")) {
				dom.manipulateModal("show", "Add Project", "Add");

				// EDIT / DELETE PROJECT MODAL
			} else if (
				target.classList.contains("edit-project") ||
				target.classList.contains("delete-project")
			) {
				projectIndex = target.getAttribute("data-link-index");

				// EDIT PROJECT
				if (target.classList.contains("edit-project")) {
					dom.manipulateModal("show", "Edit Project", "Edit", projectIndex);

					// DELETE PROJECT
				} else if (
					target.classList.contains("delete-project") &&
					target.parentElement.parentElement.classList.contains("active-link")
				) {
					dom.manipulateModal("show", "Delete Project", "Delete", projectIndex);
				}
			}

			// TASK EDIT / DELETE / WATCH INFO MODALS
			if (
				target.classList.contains("add-task-btn") ||
				target.parentElement.classList.contains("add-task-btn") ||
				target.classList.contains("task-icon")
			) {
				projectIndex = target.getAttribute("data-project-index");
				taskIndex = target.getAttribute("data-task-index");

				// MODAL FOR ADDING TASK
				if (
					target.classList.contains("add-task-btn") ||
					target.parentElement.classList.contains("add-task-btn")
				) {
					dom.manipulateModal("show", "Add Task", "Add");

					// MODAL FOR EDITING TASK
				} else if (target.classList.contains("edit-task")) {
					dom.manipulateModal(
						"show",
						"Edit Task",
						"Edit",
						projectIndex,
						taskIndex
					);

					// MODAL FOR DELETING TASK
				} else if (target.classList.contains("delete-task")) {
					dom.manipulateModal(
						"show",
						"Delete Task",
						"Delete",
						projectIndex,
						taskIndex
					);

					// MODAL FOR WATCHING TASK INFO
				} else if (target.classList.contains("fa-info-circle")) {
					dom.manipulateModal("show", "Task Info", "", projectIndex, taskIndex);
				}
			}

			// VALIDATE MODAL
			if (target.classList.contains("confirm-modal")) {
				// VALIDATE FOR ADDING
				if (target.textContent === "Add") {
					projectIndex = activeLink.getAttribute("data-link-index");
					dom.validateModal("add", projectIndex, "", activeLink);

					// VALIDATE FOR EDITING
				} else if (target.textContent === "Edit") {
					// EDIT PROJECT
					if (modalTitle.textContent === "Edit Project") {
						dom.validateModal("edit", projectIndex, "", activeLink);

						// EDIT TASK
					} else if (modalTitle.textContent === "Edit Task") {
						dom.validateModal("edit", projectIndex, taskIndex, activeLink);
					}

					// VALIDATE FOR DELETING
				} else if (target.textContent === "Delete") {
					const projectDeletionText = document.querySelector(
						".project-deletion-text"
					);

					// DELETE PROJECT
					if (!projectDeletionText.classList.contains("hide")) {
						projectIndex = activeLink.getAttribute("data-link-index");
						dom.validateModal("delete", projectIndex, "", activeLink);
						dom.changeMainTitle(target, 0);
						dom.showMainTitle(0);
						dom.getTasks("all");

						// DELETE TASK
					} else if (projectDeletionText.classList.contains("hide")) {
						dom.validateModal("delete", projectIndex, taskIndex, activeLink);
					}
				}
			}

			// CLOSE MODAL
			if (target.classList.contains("close")) {
				dom.manipulateModal("close");
			}

			// MARK TASK COMPLETED
			if (
				target.classList.contains("fa-circle") ||
				target.classList.contains("fa-circle-check") ||
				target.classList.contains("task-text")
			) {
				projectIndex = target.getAttribute("data-project-index");
				taskIndex = target.getAttribute("data-task-index");
				tasks.toggleTaskCompletion(projectIndex, taskIndex, activeLink);
			}
		});
	}

	return {
		listenClicks,
	};
})();

export default handlers;

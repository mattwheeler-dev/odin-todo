/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_UI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/UI */ \"./src/modules/UI.js\");\n\n\ndocument.addEventListener(\"DOMContentLoaded\", _modules_UI__WEBPACK_IMPORTED_MODULE_0__[\"default\"].loadHomepage);\n\n\n//# sourceURL=webpack://odin-todo/./src/index.js?");

/***/ }),

/***/ "./src/modules/Project.js":
/*!********************************!*\
  !*** ./src/modules/Project.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Project)\n/* harmony export */ });\n/* harmony import */ var _ToDo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ToDo */ \"./src/modules/ToDo.js\");\n\n\nclass Project {\n\tconstructor(name) {\n\t\tthis.name = name;\n\t\tthis.todos = [];\n\t}\n\n\t// SETTER & GETTER FOR PROJECT NAME\n\tsetName(name) {\n\t\tthis.name = name;\n\t}\n\n\tgetName() {\n\t\treturn this.name;\n\t}\n\n\t// SETTER & GETTER FOR TODOS\n\tsetTodos(todos) {\n\t\tthis.todos = todos;\n\t}\n\n\tgetTodos() {\n\t\treturn this.todos;\n\t}\n\n\t// SINGULAR TODO METHODS\n\tgetTodo(todoName) {\n\t\treturn this.todos.find((todo) => todo.getName() === todoName);\n\t}\n\n\tcontains(todoName) {\n\t\treturn this.todos.some((todo) => todo.getName() === todoName);\n\t}\n\n\taddTodo(newTodo) {\n\t\tthis.todos.push(newTodo);\n\t}\n\n\tdeleteTodo(todoName) {\n\t\tthis.todos = this.todos.filter((todo) => todo.name !== todoName);\n\t}\n\n\t// completeTodo(todoName) {\n\t// \tconst completedTodo = this.todos.find((todo) => todo.name === todoName);\n\t// }\n}\n\n\n//# sourceURL=webpack://odin-todo/./src/modules/Project.js?");

/***/ }),

/***/ "./src/modules/Storage.js":
/*!********************************!*\
  !*** ./src/modules/Storage.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Storage)\n/* harmony export */ });\n/* harmony import */ var _ToDoList__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ToDoList */ \"./src/modules/ToDoList.js\");\n/* harmony import */ var _Project__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Project */ \"./src/modules/Project.js\");\n/* harmony import */ var _ToDo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ToDo */ \"./src/modules/ToDo.js\");\n\n\n\n\nclass Storage {\n\t// SAVE LIST TO LOCAL\n\tstatic saveTodoList(data) {\n\t\tlocalStorage.setItem(\"todoList\", JSON.stringify(data));\n\t}\n\n\t// RETURN LIST FROM LOCAL\n\tstatic getTodoList() {\n\t\tconst todoList = Object.assign(\n\t\t\tnew _ToDoList__WEBPACK_IMPORTED_MODULE_0__[\"default\"](),\n\t\t\tJSON.parse(localStorage.getItem(\"todoList\"))\n\t\t);\n\n\t\ttodoList.setProjects(\n\t\t\ttodoList\n\t\t\t\t.getProjects()\n\t\t\t\t.map((project) => Object.assign(new _Project__WEBPACK_IMPORTED_MODULE_1__[\"default\"](), project))\n\t\t);\n\n\t\ttodoList\n\t\t\t.getProjects()\n\t\t\t.forEach((project) =>\n\t\t\t\tproject.setTodos(\n\t\t\t\t\tproject.getTodos().map((todo) => Object.assign(new _ToDo__WEBPACK_IMPORTED_MODULE_2__[\"default\"](), todo))\n\t\t\t\t)\n\t\t\t);\n\t\treturn todoList;\n\t}\n\n\t// ADD / REMOVE PROJECTS\n\tstatic addProject(project) {\n\t\tconst todoList = Storage.getTodoList();\n\t\ttodoList.addProject(project);\n\t\tStorage.saveTodoList(todoList);\n\t}\n\n\tstatic deleteProject(projectName) {\n\t\tconst todoList = Storage.getTodoList();\n\t\ttodoList.deleteProject(projectName);\n\t\tStorage.saveTodoList(todoList);\n\t}\n\n\t// ADD / REMOVE / COMPLETE TODOS\n\tstatic addTodo(projectName, todo) {\n\t\tconst todoList = Storage.getTodoList();\n\t\ttodoList.getProject(projectName).addTodo(todo);\n\t\tStorage.saveTodoList(todoList);\n\t}\n\n\tstatic deleteTodo(projectName, todoName) {\n\t\tconst todoList = Storage.getTodoList();\n\t\ttodoList.getProject(projectName).deleteTodo(todoName);\n\t\tStorage.saveTodoList(todoList);\n\t}\n\n\t// static completeTodo(projectName, todoName) {\n\t// \tconst todoList = Storage.getTodoList();\n\t// \ttodoList.getProject(projectName).completeTodo(todoName);\n\t// \tStorage.saveTodoList(todoList);\n\t// }\n}\n\n\n//# sourceURL=webpack://odin-todo/./src/modules/Storage.js?");

/***/ }),

/***/ "./src/modules/ToDo.js":
/*!*****************************!*\
  !*** ./src/modules/ToDo.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ ToDo)\n/* harmony export */ });\nclass ToDo {\n\tconstructor(name) {\n\t\tthis.name = name;\n\t}\n\n\t// SETTER & GETTER FOR TODO NAME\n\tsetName(name) {\n\t\tthis.name = name;\n\t}\n\n\tgetName() {\n\t\treturn this.name;\n\t}\n}\n\n\n//# sourceURL=webpack://odin-todo/./src/modules/ToDo.js?");

/***/ }),

/***/ "./src/modules/ToDoList.js":
/*!*********************************!*\
  !*** ./src/modules/ToDoList.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ ToDoList)\n/* harmony export */ });\n/* harmony import */ var _Project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Project */ \"./src/modules/Project.js\");\n\n\nclass ToDoList {\n\tconstructor() {\n\t\tthis.projects = [];\n\t\tthis.projects.push(new _Project__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\"Default Project\"));\n\t}\n\n\t// SETTER & GETTER FOR PROJECTS\n\tsetProjects(projects) {\n\t\tthis.projects = projects;\n\t}\n\n\tgetProjects() {\n\t\treturn this.projects;\n\t}\n\n\t// SINGULAR PROJECT METHODS\n\tgetProject(projectName) {\n\t\treturn this.projects.find((project) => project.getName() === projectName);\n\t}\n\n\tcontains(projectName) {\n\t\treturn this.projects.some((project) => project.getName() === projectName);\n\t}\n\n\taddProject(newProject) {\n\t\tthis.projects.push(newProject);\n\t}\n\n\tdeleteProject(projectName) {\n\t\tconst targetProject = this.projects.find(\n\t\t\t(project) => project.getName() === projectName\n\t\t);\n\t\tthis.projects.splice(this.projects.indexOf(targetProject), 1);\n\t}\n}\n\n\n//# sourceURL=webpack://odin-todo/./src/modules/ToDoList.js?");

/***/ }),

/***/ "./src/modules/UI.js":
/*!***************************!*\
  !*** ./src/modules/UI.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ UI)\n/* harmony export */ });\n/* harmony import */ var _Storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Storage */ \"./src/modules/Storage.js\");\n/* harmony import */ var _Project__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Project */ \"./src/modules/Project.js\");\n/* harmony import */ var _ToDo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ToDo */ \"./src/modules/ToDo.js\");\n\n\n\n\nclass UI {\n\t// LOAD CONTENT\n\tstatic loadHomepage() {\n\t\tUI.loadProjects();\n\t\tUI.initProjectBtns();\n\t\tUI.openProject(\n\t\t\t\"Default Project\",\n\t\t\tdocument.querySelector(\"#default-project\")\n\t\t);\n\t}\n\n\t// PROJECT METHODS\n\t// TOGGLE PROJECTS\n\tstatic toggleProjects() {\n\t\tconst projects = document.querySelector(\"#projects-container\");\n\t\tprojects.classList.toggle(\"active\");\n\t}\n\n\t// LOAD PROJECTS\n\tstatic loadProjects() {\n\t\t_Storage__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getTodoList()\n\t\t\t.getProjects()\n\t\t\t.forEach((project) => {\n\t\t\t\tUI.createProject(project.name);\n\t\t\t});\n\t\tUI.initAddProjectBtns();\n\t}\n\n\t// INIT PROJECT BTNS\n\tstatic initProjectBtns() {\n\t\tconst menuToggle = document.querySelector(\"#menu-toggle\");\n\t\tconst projectBtns = document.querySelectorAll(\"[data-project-btn]\");\n\n\t\tmenuToggle.addEventListener(\"click\", UI.toggleProjects);\n\t\tprojectBtns.forEach((btn) =>\n\t\t\tbtn.addEventListener(\"click\", UI.handleProjectBtn)\n\t\t);\n\t}\n\n\t// OPEN DEFAULT PROJECT\n\tstatic openDefaultProject() {\n\t\tUI.openProject(\"Default Project\", this);\n\t}\n\n\t// OPEN PROJECT\n\tstatic openProject(projectName, projectBtn) {\n\t\tconst defaultProject = document.querySelector(\"#default-project\");\n\t\tconst projectBtns = document.querySelectorAll(\".project-btn\");\n\t\tconst btns = [defaultProject, ...projectBtns];\n\n\t\tbtns.forEach((btn) => btn.classList.remove(\"active\"));\n\t\tprojectBtn.classList.add(\"active\");\n\t\tUI.closeAddProjectPopup();\n\t\tUI.loadTodoList(projectName);\n\t}\n\n\t// PROJECT BTNS & EVENT LISTENERS\n\tstatic initAddProjectBtns() {\n\t\tconst addProjectBtn = document.querySelector(\"#add-project-btn\");\n\t\tconst confirmAddProject = document.querySelector(\"#confirm-add-project\");\n\t\tconst cancelAddProject = document.querySelector(\"#cancel-add-project\");\n\t\tconst addProjectInput = document.querySelector(\"#new-project-name\");\n\n\t\taddProjectBtn.addEventListener(\"click\", UI.openAddProjectPopup);\n\t\tconfirmAddProject.addEventListener(\"click\", UI.addProject);\n\t\tcancelAddProject.addEventListener(\"click\", UI.closeAddProjectPopup);\n\t\taddProjectInput.addEventListener(\"keypress\", UI.handleAddProjectInput);\n\t}\n\n\t// PROJECT POPUP CONTROLS\n\tstatic openAddProjectPopup() {\n\t\tconst addProjectPopup = document.querySelector(\"#add-project-popup\");\n\t\tconst addProjectBtn = document.querySelector(\"#add-project-btn\");\n\n\t\tUI.closeAllPopups();\n\t\taddProjectPopup.classList.add(\"active\");\n\t\taddProjectBtn.classList.add(\"active\");\n\t}\n\n\tstatic closeAddProjectPopup() {\n\t\tconst addProjectPopup = document.querySelector(\"#add-project-popup\");\n\t\tconst addProjectBtn = document.querySelector(\"#add-project-btn\");\n\t\tconst addProjectInput = document.querySelector(\"#new-project-name\");\n\n\t\taddProjectPopup.classList.remove(\"active\");\n\t\taddProjectBtn.classList.remove(\"active\");\n\t\taddProjectInput.value = \"\";\n\t}\n\n\tstatic addProject() {\n\t\tconst addProjectInput = document.querySelector(\"#new-project-name\");\n\t\tconst projectName = addProjectInput.value;\n\n\t\tif (projectName === \"\") {\n\t\t\talert(\"You should name your project...\");\n\t\t\treturn;\n\t\t}\n\n\t\t_Storage__WEBPACK_IMPORTED_MODULE_0__[\"default\"].addProject(new _Project__WEBPACK_IMPORTED_MODULE_1__[\"default\"](projectName));\n\t\tUI.createProject(projectName);\n\t\tUI.closeAddProjectPopup();\n\t}\n\n\tstatic handleAddProjectInput(e) {\n\t\tif (e.key === \"Enter\") {\n\t\t\tUI.addProject();\n\t\t}\n\t}\n\n\t// HANDLE PROJECT (DELETE / OPEN)\n\tstatic handleProjectBtn(e) {\n\t\tconst projectName = this.children[0].textContent;\n\n\t\tif (e.target.classList.contains(\"fa-xmark\")) {\n\t\t\tUI.deleteProject(projectName, this);\n\t\t}\n\n\t\tUI.openProject(projectName, this);\n\t}\n\n\tstatic deleteProject(projectName, btn) {\n\t\tif (btn.classList.contains(\"active\")) {\n\t\t\tUI.clearListDisplay();\n\t\t}\n\t\t_Storage__WEBPACK_IMPORTED_MODULE_0__[\"default\"].deleteProject(projectName);\n\t\tUI.clearProjects();\n\t\tUI.loadProjects();\n\t}\n\n\t// CREATE PROJECT\n\tstatic createProject(name) {\n\t\tconst projectList = document.querySelector(\"#projects-list\");\n\t\tprojectList.innerHTML += `\n    <button class=\"project-btn\" data-project-btn>\n      <span>${name}</span>\n      <i class=\"fa-solid fa-xmark\"></i>\n    </button>\n    `;\n\n\t\tUI.initProjectBtns();\n\t}\n\n\t// TODO METHODS\n\t// LOAD TODOS\n\tstatic loadTodos(projectName) {\n\t\t_Storage__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getTodoList()\n\t\t\t.getProject(projectName)\n\t\t\t.getTodos()\n\t\t\t.forEach((todo) => UI.createTodo(todo.name));\n\t\tUI.initAddTodoBtns();\n\t}\n\n\t// LOAD TODO LIST\n\tstatic loadTodoList(projectName) {\n\t\tconst listDisplay = document.querySelector(\"#list-display\");\n\n\t\tlistDisplay.innerHTML = `\n    <h2 id=\"project-title\">${projectName}</h2>\n    <div id=\"todo-list\"></div>\n    <button id=\"add-todo-btn\">\n      <i class=\"fa-solid fa-plus\"></i>\n      Add ToDo\n    </button>\n    <div id=\"add-todo-popup\">\n      <input id=\"new-todo-name\" type=\"text\" />\n        <button id=\"confirm-add-todo\">\n          Confirm\n        </button>\n        <button id=\"cancel-add-todo\">\n          Cancel\n        </button> \n    </div>\n    `;\n\n\t\tUI.loadTodos(projectName);\n\t}\n\n\t// CREATE TODO\n\tstatic createTodo(name) {\n\t\tconst todoList = document.querySelector(\"#todo-list\");\n\t\tconst projectName = document.querySelector(\"#project-title\").textContent;\n\t\tif (\n\t\t\t_Storage__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getTodoList().getProject(projectName).getTodos(name).completed ==\n\t\t\ttrue\n\t\t) {\n\t\t\ttodoList.innerHTML += `\n      <button class=\"todo-btn complete\" data-todo-btn>\n        <i class=\"fa-regular fa-circle\"></i>\n        <span>${name}</span>\n        <i class=\"fa-solid fa-trash-can\"></i>\n      </button>\n        `;\n\t\t} else {\n\t\t\ttodoList.innerHTML += `\n    <button class=\"todo-btn\" data-todo-btn>\n      <i class=\"fa-regular fa-circle\"></i>\n      <span>${name}</span>\n      <i class=\"fa-solid fa-trash-can\"></i>\n    </button>\n      `;\n\t\t}\n\n\t\tUI.initTodoBtns();\n\t}\n\n\t// INIT TODO BTNS\n\tstatic initTodoBtns() {\n\t\tconst todoBtns = document.querySelectorAll(\"[data-todo-btn]\");\n\t\ttodoBtns.forEach((todoBtn) => {\n\t\t\ttodoBtn.addEventListener(\"click\", UI.handleTodoBtn);\n\t\t});\n\t}\n\n\t// TODO BTNS & EVENT LISTENERS\n\tstatic initAddTodoBtns() {\n\t\tconst addTodoBtn = document.querySelector(\"#add-todo-btn\");\n\t\tconst confirmAddTodo = document.querySelector(\"#confirm-add-todo\");\n\t\tconst cancelAddTodo = document.querySelector(\"#cancel-add-todo\");\n\n\t\taddTodoBtn.addEventListener(\"click\", UI.openAddTodoPopup);\n\t\tconfirmAddTodo.addEventListener(\"click\", UI.addTodo);\n\t\tcancelAddTodo.addEventListener(\"click\", UI.closeAddTodoPopup);\n\t}\n\n\t// ADD TODO POPUP CONTROLS\n\tstatic openAddTodoPopup() {\n\t\tconst addTodoPopup = document.querySelector(\"#add-todo-popup\");\n\t\tconst addTodoBtn = document.querySelector(\"#add-todo-btn\");\n\n\t\tUI.closeAllPopups();\n\t\taddTodoPopup.classList.add(\"active\");\n\t\taddTodoBtn.classList.add(\"active\");\n\t}\n\n\tstatic closeAddTodoPopup() {\n\t\tconst addTodoPopup = document.querySelector(\"#add-todo-popup\");\n\t\tconst addTodoBtn = document.querySelector(\"#add-todo-btn\");\n\t\tconst addTodoInput = document.querySelector(\"#new-todo-name\");\n\n\t\taddTodoPopup.classList.remove(\"active\");\n\t\taddTodoBtn.classList.remove(\"active\");\n\t\taddTodoInput.value = \"\";\n\t}\n\n\t// ADD TODO\n\tstatic addTodo() {\n\t\tconst projectName = document.querySelector(\"#project-title\").textContent;\n\t\tconst addTodoInput = document.querySelector(\"#new-todo-name\");\n\t\tconst todoName = addTodoInput.value;\n\n\t\tif (todoName === \"\") {\n\t\t\talert(\"You should enter a name for the ToDo\");\n\t\t\treturn;\n\t\t}\n\n\t\t_Storage__WEBPACK_IMPORTED_MODULE_0__[\"default\"].addTodo(projectName, new _ToDo__WEBPACK_IMPORTED_MODULE_2__[\"default\"](todoName));\n\t\tUI.createTodo(todoName);\n\t\tUI.closeAddTodoPopup();\n\t}\n\n\tstatic handleAddTodoInput(e) {\n\t\tif (e.key === \"Enter\") {\n\t\t\tUI.addTodo();\n\t\t}\n\t}\n\n\t// HANDLE TODO (COMPLETE / DELETE / EDIT)\n\tstatic handleTodoBtn(e) {\n\t\tif (e.target.classList.contains(\"fa-circle\")) {\n\t\t\tUI.setTodoCompleted(this);\n\t\t\treturn;\n\t\t}\n\t\tif (e.target.classList.contains(\"fa-trash-can\")) {\n\t\t\tUI.deleteTodo(this);\n\t\t\treturn;\n\t\t}\n\t}\n\n\t// MARK TODO COMPLETED\n\tstatic setTodoCompleted(todoBtn) {\n\t\tconst projectName = document.querySelector(\"#project-title\").textContent;\n\t\tconst todoName = todoBtn.children[1].textContent;\n\n\t\ttodoBtn.classList.toggle(\"complete\");\n\t\t// Storage.completeTodo(projectName, todoName);\n\t\tUI.clearTodos();\n\t\tUI.loadTodos(projectName);\n\t}\n\n\t// DELETE TODO\n\tstatic deleteTodo(todoBtn) {\n\t\tconst projectName = document.querySelector(\"#project-title\").textContent;\n\t\tconst todoName = todoBtn.children[1].textContent;\n\n\t\t_Storage__WEBPACK_IMPORTED_MODULE_0__[\"default\"].deleteTodo(projectName, todoName);\n\t\tUI.clearTodos();\n\t\tUI.loadTodos(projectName);\n\t}\n\n\t// SHARED METHODS\n\t// CLEAR CONTENT\n\tstatic clear() {\n\t\tUI.clearListDisplay();\n\t\tUI.clearProjects();\n\t\tUI.clearTodos();\n\t}\n\n\tstatic clearListDisplay() {\n\t\tconst listDisplay = document.querySelector(\"#list-display\");\n\t\tlistDisplay.textContent = \"\";\n\t}\n\n\tstatic clearProjects() {\n\t\tconst projectsList = document.querySelector(\"#projects-list\");\n\t\tprojectsList.textContent = \"\";\n\t}\n\n\tstatic clearTodos() {\n\t\tconst todoList = document.querySelector(\"#todo-list\");\n\t\ttodoList.textContent = \"\";\n\t}\n\n\t// CLOSE POPUPS & INPUTS\n\tstatic closeAllPopups() {\n\t\tUI.closeAddProjectPopup();\n\t\tif (document.querySelector(\"#add-todo-btn\")) {\n\t\t\tUI.closeAddTodoPopup();\n\t\t}\n\t}\n}\n\n\n//# sourceURL=webpack://odin-todo/./src/modules/UI.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;
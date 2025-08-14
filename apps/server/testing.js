import projectControllers from "./controller/project.controllers";
async function init() {
  const project = await projectControllers.createNewProject(
    "AravConray",
    "todo" + Date.now(),
    "a simple todo-application"
  );
  const response = await projectControllers.initializeProject(project.id);

  console.log(JSON.stringify(response, null, 2));
}
init();

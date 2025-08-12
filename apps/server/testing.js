import projectControllers from "./controller/project.controllers";
async function init(){
  const response = await projectControllers.initializeProject("688f3c4d3137e1267c5a812d");
}
init()
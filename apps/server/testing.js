// import projectController from "./controller/project.controllers.js";

// const createProject = async () => {
//   // const data = await projectController.createNewProject(
//   //   "AravConray",
//   //   "OCTODOCK_CLI_TESTING" + Date.now(),
//   //   "Todo Application"
//   // );
//   const data = await projectController.initializeProject(
//     "688f3c4d3137e1267c5a812d"
//   );
//   console.log(data);
// };
// createProject()
//   .then(() => {
//     console.log("Project created successfully");
//   })
//   .catch((error) => {
//     console.error("Error creating project:", error);
//   });

fetch("http://localhost:8000/graphql", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    query: `
      query getAllPromptPerProject($projectID: ID!) {
    getAllPromptPerProject(projectID: $projectID) {
      id
      userPrompt
      generatedPrompt
      reportedAnswer
      folderStructure
      successResponse
      projectId
      createdAt
      updatedAt
    }
  }
    `,
    variables: {
      projectID: "688e28b5dfb30b02222ddae2", // 👈 Replace with your actual project ID
    },
  }),
})
  .then((res) => res.json())
  .then((data) => console.log("✅ Response:", JSON.stringify(data, null, 2)))
  .catch((err) => console.error("❌ Error:", err));

// import promptControllers from "./controller/prompt.controllers";
// const createdPrompt = async () => {
//   // const data = await promptControllers.createPrompt(
//   //   "AravConray",
//   //   "688e28b5dfb30b02222ddae2",
//   //   "make me a newFile.js"
//   // );
//   const data = await promptControllers.getAllPromptPerProject(
//     "688e28b5dfb30b02222ddae2"
//   );
//   console.log(data);
// };

// createdPrompt();

import projectController from "./controller/project.controllers.js";

const createProject = async () => {
  const data = await projectController.createNewProject(
    "AravConray",
    "OCTODOCK_CLI_TESTING" + Date.now(),
    "Todo Application"
  );
  console.log(data);
};
createProject()
  .then(() => {
    console.log("Project created successfully");
  })
  .catch((error) => {
    console.error("Error creating project:", error);
  });

// fetch("http://localhost:8000/graphql", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({
//     query: `
//       query getProjectById($id: ID!) {
//     getProjectById(id: $id) {
//       id
//       name
//       description
//       generatedPrompt
//       githubUrl
//       folderStructure
//       status
//       createdBy
//       user {
//         name
//         username
//         email
//       }
//       prompts
//       createdAt
//       updatedAt
//     }
// }
//     `,
//     variables: {
//       id: "688e28b5dfb30b02222ddae2", // 👈 Replace with your actual project ID
//     },
//   }),
// })
//   .then((res) => res.json())
//   .then((data) => console.log("✅ Response:", data))
//   .catch((err) => console.error("❌ Error:", err));

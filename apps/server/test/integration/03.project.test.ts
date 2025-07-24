// import { describe, expect, it, beforeAll, afterAll } from "bun:test";
// import prisma from "../../utils/prisma";
// import projectController from "../../controller/project.controllers";
// import userController from "../../controller/user.controllers";

// const testUser = {
//   name: "Test User" + Date.now(),
//   username: "projecttestuser" + Date.now(),
//   githubUsername: "AravConray",
//   email: "aravconray@gmail.com",
//   githubToken: "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",
//   password: "securepassword123",
// };

// let userId: string;
// let projectId: string;

// describe("Project Controller Tests", () => {
//   beforeAll(async () => {
//     // Clean up and create user
//     await prisma.user.deleteMany({ where: { email: testUser.email } });

//     const user = await userController.registerUser(
//       testUser.name,
//       testUser.username,
//       testUser.githubUsername,
//       testUser.email,
//       testUser.password
//     );

//     userId = user.id;
//   });

//   it("should create a new project", async () => {
//     console.log(userId);
//     const project = await projectController.createNewProject(
//       userId,
//       "Test Project" + Date.now(),
//       "This is a test project" + Date.now()
//     );

//     expect(project).toBeDefined();
//     expect(project.name).toBe("Test Project");
//     expect(project.description).toBe("This is a test project");

//     projectId = project.id;
//   });

//   it("should update the project", async () => {
//     const updated = await projectController.updateProject(
//       projectId,
//       userId,
//       "Updated Project Name",
//       "Updated description"
//     );

//     expect(updated).toBeDefined();
//     expect(updated.name).toBe("Updated Project Name");
//     expect(updated.description).toBe("Updated description");
//   });

//   it("should fetch the project by ID", async () => {
//     const project = await projectController.getProjectById(projectId);

//     expect(project).toBeDefined();
//     expect(project.data.id).toBe(projectId);
//     expect(project.data.name).toBe("Updated Project Name");
//   });

//   it("should fetch all projects for the user", async () => {
//     const projects = await projectController.getAllUserProject(userId);

//     expect(projects).toBeDefined();
//     expect(Array.isArray(projects)).toBe(true);
//     expect(projects.data.length).toBeGreaterThan(0);
//   });

//   it("should delete the project", async () => {
//     const deleted = await projectController.deleteProject(projectId, userId);

//     expect(deleted).toBeDefined();
//     expect(deleted.name).toBe("Updated Project Name");

//     // confirm deletion
//     const shouldBeNull = await prisma.project.findUnique({
//       where: { id: projectId },
//     });

//     expect(shouldBeNull).toBeNull();
//   });

//   afterAll(async () => {
//     // Clean up the user after tests
//     await prisma.user.deleteMany({ where: { email: testUser.email } });
//   });
// });

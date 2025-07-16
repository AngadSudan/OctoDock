import prisma from "../utils/prisma";
class codeOperationController {
  async createProjectFileStructure(projectId : string ) {
    try {
      // Your logic here
      const dbProject = await prisma.project.findUnique({
        where:{
          id: projectId
        }
      }

      // const folderStructure = dbProject;
    
      )
    } catch (error: any) {
      console.log(error);
      // Removed return statement
    }
  }

  async writeCodeFiles() {
    try {
      // Your logic here
    } catch (error: any) {
      console.log(error);
      // Removed return statement
    }
  }

  async writeCodeFile() {
    try {
      // Your logic here
    } catch (error: any) {
      console.log(error);
      // Removed return statement
    }
  }

  async updateCodeInFile() {
    try {
      // Your logic here
    } catch (error: any) {
      console.log(error);
      // Removed return statement
    }
  }
}

export default new codeOperationController();

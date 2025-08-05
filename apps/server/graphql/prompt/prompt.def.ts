export const promptDef = `#graphql
    

    enum SUCCESS {
        SUCCESS
        NOT_SUCCESS
    }

    type Prompt {
        id: ID!
        userPrompt: String!
        generatedPrompt: String!
        reportedAnswer: String!
        folderStructure: String!
        successResponse: SUCCESS
        projectId: String!
        project: Project
        createdAt: Date
        updatedAt: Date
    }
`;

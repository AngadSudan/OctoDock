export const promptDef = `#graphql
    

    enum SUCCESS {
        SUCCESS
        NOT_SUCCESS
    }

    type Prompt {
        id: ID!
        userPrompt: String!
        generatedPrompt: String!
        successResponse: SUCCESS
        projectId: ID
        createdAt: Date
        updatedAt: Date
    }
`;

export const projectDef = `#graphql
    
    enum STATUS {
        PUBLISHED
        NOT_PUBLISHED
    }

    type Project {
        id:ID!
        name:String!
        description:String!
        generatedPrompt:String!
        githubUrl:String!
        folderStructure:String
        status:STATUS
        user:User
        createdBy: ID
        prompts:[ID!]
        createdAt:Date
        isInitialized:Boolean
        updatedAt:Date
    }
`;

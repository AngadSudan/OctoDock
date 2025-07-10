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
        status:STATUS
        createdBy:User
        prompts:[ID!]
        createdAt:Date
        updatedAt:Date
    }
`;

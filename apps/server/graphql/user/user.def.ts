export const userDef = `#graphql
    enum VALIDATION {
        VALID
        INVALID
    }

    type User {
        id: ID!
        name: String!
        username: String!   
        email: String!
        password: String!
        generatedSalt: String!
        githubToken: String
        profileImage:String
        bannerImage:String
        isValid:VALIDATION
        project:[ID!]
        createdAt:Date
        updatedAt:Date
    }
`;

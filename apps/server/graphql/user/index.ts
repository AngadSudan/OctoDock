import { userDef } from "./user.def";
import { userMutations } from "./user.mutations";
import { userQueries } from "./user.queries";
import { userResolver } from "./user.resolvers";

const User = { userDef, userMutations, userQueries, userResolver };
export default User;

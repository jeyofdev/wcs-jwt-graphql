import bookResolver from './book/book.resolver';
import userResolver from './user/user.resolver';
import { mergeResolvers } from '@graphql-tools/merge';
export default mergeResolvers([bookResolver, userResolver]);

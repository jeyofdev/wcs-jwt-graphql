import { GraphQLObjectType } from 'graphql';
import { IAddBookInput } from './book.resolver.spec';

export default {
    Query: {
        listBooks: (_: GraphQLObjectType, __: object, { books }: any) => books,
    },
    Mutation: {
        addBook: (
            _: GraphQLObjectType,
            { addBookInput }: IAddBookInput,
            { books }: any
        ) => {
            let newBook = { ...addBookInput };
            books.push(newBook);
            return newBook;
        },
    },
};

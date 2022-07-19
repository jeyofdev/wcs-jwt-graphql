import { gql } from '@apollo/client';

export const LIST_BOOKS = gql`
    query ListBooks {
        listBooks {
            title
            author
        }
    }
`;

export const ADD_BOOKS = gql`
    mutation AddBook($addBookInput: AddBookInput) {
        addBook(addBookInput: $addBookInput) {
            title
            author
        }
    }
`;

import { gql } from "@apollo/client"

export const USE_ADD_USER = gql`
mutation Mutation($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      user {
        _id
        username
        email
        bookCount
        savedBooks {
          bookId
        }
      }
      token
    }
  }
`

export const USE_LOGIN = gql`
mutation Mutation($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      user {
        email
        savedBooks {
          bookId
        }
      }
      token
    }
  }
`

export const SAVE_BOOK = gql`
mutation SaveBook($authors: [String], $description: String, $title: String, $bookId: ID, $image: String) {
  saveBook(authors: $authors, description: $description, title: $title, bookId: $bookId, image: $image) {
    savedBooks {
      authors
      bookId
      description
      image
      title
    }
  }
}
`

export const DELETE_BOOK = gql`
mutation RemoveBook($bookId: ID!) {
  removeBook(bookId: $bookId) {
    _id
    bookCount
    email
    savedBooks {
      title
      bookId
      authors
      description
      image
    }
  }
}
`
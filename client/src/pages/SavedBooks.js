import React, { useState, useEffect } from 'react';
import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';

import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';
import { GET_ME } from '../lib/queries';
import { useMutation, useQuery } from '@apollo/client';
import { DELETE_BOOK } from '../lib/mutations';

const SavedBooks = () => {
  const [books, setBooks] = useState(null)

  const { data, loading } = useQuery(GET_ME)
  const [deleteBook] = useMutation(DELETE_BOOK)


  useEffect(() => {
    console.log(data)
    if (!loading) {
      setBooks(data.me.savedBooks)
    }
  }, [loading, data, deleteBook])

  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const {data, errors} = await deleteBook({variables: {bookId}})
      // upon success, remove book's id from localStorage
      if (errors) {
        throw new Error('could not delete book')
      }
      removeBookId(bookId);
      console.log(data.removeBook.savedBooks)
      setBooks(data.removeBook.savedBooks)
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (!books) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div className='text-light bg-dark p-5'>
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {books.length
            ? `Viewing ${books.length} saved ${books.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {books.map((book) => {
            return (
              <Col md="4" key={book.bookId}>
                <Card border='dark'>
                  {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className='small'>Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                      Delete this Book!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;

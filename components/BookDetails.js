import { Container, Row, Col, Button } from 'react-bootstrap';
import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import { useState, useEffect } from 'react';
import { addToFavourites, removeFromFavourites } from '@/lib/userData';

export default function BookDetails({ book, workId }) {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(false);

  useEffect(() => {
    setShowAdded(favouritesList?.includes(workId));
  }, [favouritesList, workId]);

  const favouritesClicked = async () => {
    if (showAdded) {
      setFavouritesList(await removeFromFavourites(workId));
    } else {
      setFavouritesList(await addToFavourites(workId));
    }
  };

  if (!book) return null;

  return (
      <Container className="my-4">
        <Row>
          <Col lg="4" className="text-center">
            <img
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                      'https://placehold.co/400x600?text=Cover+Not+Available';
                }}
                className="img-fluid w-100 rounded shadow-sm"
                src={`https://covers.openlibrary.org/b/id/${book?.covers?.[0]}-L.jpg`}
                alt="Cover Image"
            />
            <Button
                variant={showAdded ? 'danger' : 'primary'}
                className="mt-3"
                onClick={favouritesClicked}
            >
              {showAdded ? 'Remove from Favourites' : 'Add to Favourites'}
            </Button>
          </Col>

          <Col lg="8">
            <h3 className="mb-3">{book.title}</h3>

            {book.description && (
                <p>
                  {typeof book.description === 'string'
                      ? book.description
                      : book.description.value}
                </p>
            )}

            {book.subject_people?.length > 0 && (
                <>
                  <h5>Characters</h5>
                  <p>{book.subject_people.join(', ')}</p>
                </>
            )}

            {book.subject_places?.length > 0 && (
                <>
                  <h5>Settings</h5>
                  <p>{book.subject_places.join(', ')}</p>
                </>
            )}

            {book.links?.length > 0 && (
                <>
                  <h5>More Information</h5>
                  {book.links.map((l, i) => (
                      <div key={i}>
                        <a href={l.url} target="_blank" rel="noreferrer">
                          {l.title}
                        </a>
                      </div>
                  ))}
                </>
            )}
          </Col>
        </Row>
      </Container>
  );
}
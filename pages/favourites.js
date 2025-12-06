import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import PageHeader from '@/components/PageHeader';
import { Row, Col, Container } from 'react-bootstrap';
import BookCard from '@/components/BookCard';

export default function Favourites() {
    const [favouritesList] = useAtom(favouritesAtom);
    
    if (!favouritesList) return null;
    
    return (
        <>
            <PageHeader text="Favourites" subtext="Your saved books" />
            <Container className="mt-4">
                {favouritesList.length === 0 ? (
                    <p className="text-center text-muted">
                        You have no favourites yet. Add some from the book details page.
                    </p>
                ) : (
                    <Row className="g-4">
                        {favouritesList.map((workId, index) => (
                            <Col md={3} key={`${workId}-${index}`}>
                                <BookCard workId={workId} />
                            </Col>
                        ))}
                    </Row>
                )}
            </Container>
        </>
    );
}

import useSWR from 'swr';
import { Card, Button, Spinner } from 'react-bootstrap';
import Link from 'next/link';

export default function BookCard({ workId }) {
  const { data, error, isLoading } = useSWR(
    workId ? `https://openlibrary.org/works/${workId}.json` : null
  );

  if (isLoading)
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );

  if (error || !data)
    return (
      <p className="text-danger text-center">
       
      </p>
    );

  return (
    <Card className="h-100 shadow-sm border-0">
      <Card.Img
        variant="top"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = 'https://placehold.co/300x450?text=No+Cover';
        }}
        src={`https://covers.openlibrary.org/b/id/${data?.covers?.[0]}-M.jpg`}
        alt={data.title}
      />
      <Card.Body>
        <Card.Title>{data.title}</Card.Title>
        <Link href={`/works/${workId}`} passHref legacyBehavior>
          <Button variant="primary" className="w-100">
            View Details
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
}
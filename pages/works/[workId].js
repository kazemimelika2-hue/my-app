import { useRouter } from 'next/router';
import useSWR from 'swr';
import Error from 'next/error';
import BookDetails from '@/components/BookDetails';
import PageHeader from '@/components/PageHeader';
import { Spinner, Container } from 'react-bootstrap';

export default function Work() {
  const router = useRouter();
  const { workId } = router.query;

  const { data, error, isLoading } = useSWR(
    workId ? `https://openlibrary.org/works/${workId}.json` : null
  );

  if (isLoading)
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" variant="primary" />
      </Container>
    );

  if (error || !data) return <Error statusCode={404} />;

  return (
    <>
      <PageHeader text={data.title || 'Book Details'} />
      <BookDetails book={data} workId={workId} />
    </>
  );
}
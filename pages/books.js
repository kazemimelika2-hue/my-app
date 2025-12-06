/*********************************************************************************
*  WEB422 – Assignment 1
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*  Name: Melika Kazemi   Student ID: 166429233   Date: (YYYY-MM-DD)
********************************************************************************/

import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { Container, Table, Pagination, Spinner, Card } from 'react-bootstrap';
import PageHeader from '@/components/PageHeader';

export default function Books() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [pageData, setPageData] = useState(null);

  // build query string from search form + pagination
  const queryString = new URLSearchParams({
    ...router.query,
    page,
    limit: 10
  }).toString();

  const { data, error } = useSWR(
    router.isReady ? `https://openlibrary.org/search.json?${queryString}` : null
  );

  useEffect(() => {
    if (data) setPageData(data);
  }, [data]);

  // pagination handlers
  const previous = () => setPage((p) => (p > 1 ? p - 1 : 1));
  const next = () => setPage((p) => p + 1);

  // go to book details
  const handleRowClick = (book) => {
    const workId = book?.key?.split('/').pop();
    if (workId) router.push(`/works/${workId}`);
  };

  if (error)
    return (
      <p className="text-danger text-center my-5">
        Failed to load books. Please try again.
      </p>
    );

  if (!pageData)
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" variant="primary" />
      </Container>
    );

  const docs = Array.isArray(pageData.docs) ? pageData.docs : [];

  return (
    <>
      <PageHeader
        text="Search Results"
        subtext={
          Object.keys(router.query).length
            ? 'Filters → ' +
              Object.entries(router.query)
                .map(([k, v]) => `${k}="${v}"`)
                .join(' | ')
            : 'No filters provided.'
        }
      />

      <Container className="my-4">
        <Card className="p-3 shadow-sm">
          <Table striped bordered hover responsive className="align-middle">
            <thead className="table-dark">
              <tr>
                <th>Title</th>
                <th>First Published</th>
              </tr>
            </thead>
            <tbody>
              {docs.map((book) => (
                <tr
                  key={book.key}
                  onClick={() => handleRowClick(book)}
                  style={{ cursor: 'pointer' }}
                >
                  <td>{book.title || 'Untitled'}</td>
                  <td>{book.first_publish_year ?? 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>

        <div className="d-flex justify-content-center mt-4">
          <Pagination>
            <Pagination.Prev onClick={previous} />
            <Pagination.Item active>{page}</Pagination.Item>
            <Pagination.Next onClick={next} />
          </Pagination>
        </div>
      </Container>
    </>
  );
}
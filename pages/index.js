import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import PageHeader from '@/components/PageHeader';

export default function Home() {
  const router = useRouter();

 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      author: '',
      title: '',
      subject: '',
      language: '',
      first_publish_year: '',
    },
  });


  const onSubmit = (data) => {

    const query = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v !== '')
    );

    if (!query.author) return; // Author is required

    router.push({
      pathname: '/books',
      query,
    });
  };

  return (
    <>
      <PageHeader
        text="Book Search"
        subtext="Search for books by author, title, subject, or year"
      />

      <Container className="mt-4">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="author">
                <Form.Label>Author (required)</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter author name"
                  {...register('author', { required: true })}
                  isInvalid={errors.author}
                />
                {errors.author && (
                  <Form.Control.Feedback type="invalid">
                    Author is required.
                  </Form.Control.Feedback>
                )}
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter book title"
                  {...register('title')}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={4}>
              <Form.Group controlId="subject">
                <Form.Label>Subject</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g. Fantasy, Science..."
                  {...register('subject')}
                />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group controlId="language">
                <Form.Label>Language</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g. eng, fre, spa"
                  {...register('language')}
                />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group controlId="first_publish_year">
                <Form.Label>First Publish Year</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="e.g. 1997"
                  {...register('first_publish_year')}
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="text-center mt-4">
            <Button
              type="submit"
              variant="primary"
              disabled={Object.keys(errors).length > 0}
            >
              Search
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
}
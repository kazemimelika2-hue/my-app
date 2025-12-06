import BookDetails from '@/components/BookDetails';
import PageHeader from '@/components/PageHeader';

export async function getStaticProps() {
  const res = await fetch('https://openlibrary.org/works/OL453657W.json');
  const data = await res.json();
  return { props: { book: data } };
}

export default function About({ book }) {
  return (
    <>
      <PageHeader text="About the Developer - Melika Kazemi" />
      <p>Hi! I’m Melika, a Seneca College programming student. This app uses the Open Library API to explore books.</p>
      <p>Below is a featured book I selected from Open Library:</p>
      <BookDetails book={book} />
    </>
  );
}

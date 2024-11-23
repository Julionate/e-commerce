import Products from '../components/Products';

export default function Home({ submitInput }) {
  return (
    <div className="flex flex-grow flex-col items-center justify-center gap-6 md:flex-row">
      <Products submitInput={submitInput} />
    </div>
  );
}

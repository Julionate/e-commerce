import Products from '../components/Products';

export default function Home({ submitInput }) {
  return (
    <div className="flex flex-grow flex-col items-center justify-center p-2 md:flex-row">
      <Products submitInput={submitInput} />
    </div>
  );
}

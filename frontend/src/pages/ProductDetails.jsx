import { useParams } from 'react-router-dom';

export default function ProductDetail() {
  const { id } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Product Detail</h1>
      <p>Product ID: {id}</p>
      {/* You can fetch product data using the ID here */}
    </div>
  );
}

import { BsFillBagCheckFill } from "react-icons/bs";
import { Link } from "react-router-dom";
export default function Success() {
  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col items-center justify-center text-center gap-6 my-6 min-h-80">
        <span className="inline-flex p-4 items-center justify-center rounded-full bg-primary/20">
          <BsFillBagCheckFill size={50} className="text-primary" />
        </span>
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold mb-6 text-primary">Order placed successfully</h1>
          <p>Thank you! Your order has been received and is now being processed.</p>
        </div>
        <Link to="/" className="btn btn-primary">
          Go to home
        </Link>
      </div>
    </div>
  );
} 
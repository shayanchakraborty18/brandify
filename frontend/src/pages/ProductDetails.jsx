import { useParams } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import { ProductDetailsInfo } from "../components/product/ProductDetailsInfo";
import { AddToCart } from "../components/product/AddToCart";
import { ProductImage } from "../components/product/ProductImage";
import { useEffect, useState } from "react";
import { Loading } from "../components/common/Loading";
import { Breadcrumb } from "../components/common/Breadcrumb";
import {
  FaBox,
  FaShippingFast,
  FaLock,
  FaMoneyBillWave,
  FaClipboardCheck,
} from "react-icons/fa";
import { Relatedproducts } from "../components/product/Relatedproducts";
import Tabs from "../components/common/Tabs";

export default function ProductDetail() {
  const { getProductDetail } = useShop();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  // console.log(product)

  useEffect(() => {
    if (id) {
      setLoading(true);
      getProductDetail(id)
        .then((data) => {
          setProduct(data);
        })
        .catch((err) => {
          console.error("Failed to load product", err);
          setProduct(null);
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) return <Loading />;
  if (!product)
    return <div className="p-6 text-red-500">Product not found {id}</div>;

  // console.log(product);
  // console.log(product.category);

  return (
    <>
      <div className="product-page section-gap">
        <div className="productDetails bg-background">
          <Breadcrumb product={product} />
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 gap-8 my-6">
              <ProductImage product={product} />
              <div>
                <ProductDetailsInfo product={product} />
                <AddToCart product={product} />
                <div className="flex items-center justify-between gap-4 py-4 border-b border-neutral-300 my-4">
                  <div className="flex flex-col items-center">
                    <FaBox size={30} color="#999" />
                    <p className="text-center text-sm leading-tight mt-2">
                      Secure Packing
                    </p>
                  </div>
                  <div className="flex flex-col items-center">
                    <FaShippingFast size={32} color="#999" />
                    <p className="text-center text-sm leading-tight mt-2">
                      Free Delivery
                    </p>
                  </div>
                  <div className="flex flex-col items-center">
                    <FaLock size={30} color="#999" />
                    <p className="text-center text-sm leading-tight mt-2">
                      Secure Payment
                    </p>
                  </div>
                  <div className="flex flex-col items-center">
                    <FaMoneyBillWave size={32} color="#999" />
                    <p className="text-center text-sm leading-tight mt-2">
                      Cash on Delivery
                    </p>
                  </div>
                  <div className="flex flex-col items-center">
                    <FaClipboardCheck size={30} color="#999" />
                    <p className="text-center text-sm leading-tight mt-2">
                      Warranty Policy
                    </p>
                  </div>
                </div>
                <p className="text-lg font-medium">{product.shortDescription}</p>
              </div>
            </div>
          </div>
        </div>
        <Tabs product={product}/>
        <div className="container mx-auto px-4">
          <Relatedproducts currentProduct={product} />
        </div>
      </div>
    </>
  );
}

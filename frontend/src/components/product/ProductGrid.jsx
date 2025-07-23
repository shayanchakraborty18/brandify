
import { ProductCard } from './ProductCard'


export const ProductGrid = ({gridTitle, productlList}) => {

    

  return (
    <div className="section-gap">
      <div className="text-center">
        <h2 className="text-2xl font-semibold uppercase">{gridTitle}</h2>
        <div className="mt-2 w-20 h-1 bg-primary mx-auto rounded"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {productlList.map((product) => (
          <ProductCard
            key={product._id}
                product={product}
          />
        ))}
      </div>
    </div>
  )
}


import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ProductCard } from "./ProductCard";

export const ProductCarousel = ({ title, productlList, maxItem = 4 }) => {
  return (
    <div className="section-gap">
      {title && (
        <div className="text-center">
          <h2 className="text-2xl font-semibold uppercase">{title}</h2>
          <div className="mt-2 w-20 h-1 bg-primary mx-auto rounded"></div>
        </div>
      )}
      <div className="w-full relative">
        <Swiper
          modules={[Navigation]}
          navigation
          loop
          // slidesPerView={3}
          spaceBetween={20}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: maxItem },
          }}
        >
          {productlList.map((product) => (
            <SwiperSlide key={product._id}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {productlList.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div> */}
    </div>
  );
};

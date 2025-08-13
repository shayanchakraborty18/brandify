import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Link } from "react-router-dom";

export const CategoryCarousel = ({ title, categorylList, maxItem = 4 }) => {
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
          {categorylList.map((category) => (
            <SwiperSlide key={category._id}>
              <Link onClick={() => window.scrollTo(0, 0)} className="w-40 flex flex-col items-center" to={`/products/${category.categorySlug}`}>
                <div className="w-40 h-40 object-cover rounded-md mb-2">
                  <img
                    src={category.image.url}
                    alt={category.name}
                    className="w-40 h-40 object-cover rounded-md"
                  />
                </div>
                <h4 className="text-lg font-semibold text-center">{category.name}</h4>
                
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

    </div>
  );
};

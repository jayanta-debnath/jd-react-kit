import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Box } from "@mui/material";

export default function PromoCarousel(
  params: {
    contents: string[]
  }
) {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      autoplay={{
        delay: 3000,
      }}
      pagination={{ clickable: true }}
      loop={true}
    >
      {params.contents.map((image, index) => (
        <SwiperSlide key={index}>
          <Box
            component="img"
            src={image}
            sx={{
              width: "100%",
              height: 400,
              objectFit: "contain",
            }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

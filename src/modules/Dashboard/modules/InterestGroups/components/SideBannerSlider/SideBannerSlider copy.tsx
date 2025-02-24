import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import styles from './CommunityForum.module.css';

const SidebarBannerSlider = () => {
  const images = [
    '/assets/interestgroup_assets/Top 100 Designers.png',
    '/assets/interestgroup_assets/Top100Desigers2.png',
    '/assets/interestgroup_assets/Top100Desigers3.png',
  ];

  return (
    <div className={styles.sidebarBannerSlider}>
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop
      >
        {images.map((src, index) => (
          <SwiperSlide key={index} className={styles.swiperSlide}>
            <img src={src} alt={`Slide ${index + 1}`} className={styles.sliderImage} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SidebarBannerSlider;

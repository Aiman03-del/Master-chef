import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import { Swiper, SwiperSlide } from "swiper/react";
import Banner1 from "../../assets/Banner1.jpg";
import Banner2 from "../../assets/Banner2.jpg";
import Banner3 from "../../assets/Banner3.jpg";
import "./HomeStyles/Banner.css";

const bannerData = [
  {
    id: 1,
    image: Banner1,
    title: "Welcome to Master Chef",
    description: "Experience the best food from around the world in one place.",
    link: "/all-foods",
  },
  {
    id: 2,
    image: Banner2,
    title: "Delicious Cuisine",
    description: "Fresh ingredients, expert chefs, and unforgettable flavors.",
    link: "/special-offers",
  },
  {
    id: 3,
    image: Banner3,
    title: "Book Your Table Now",
    description:
      "Enjoy fine dining with your loved ones in a perfect ambiance.",
    link: "/reservation",
  },
];

const Banner = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const hAnimation = {
    initial: { y: 20, opacity: 0, scale: 1.5 },
    animate: { y: 0, opacity: 1, scale: 1 },
    quadInOut: { ease: "quadInOut" },
  };
  const pAnimation = {
    initial: { opacity: 0, x: 50, scale: 1.2 },
    animate: { opacity: 1, x: 0, scale: 1 },
  };

  return (
    <div className="py-10">
      <Swiper
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        loop={true}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        className="swiper-container"
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        {bannerData.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div
              className="banner min-h-[calc(100vh-8.95vh)] bg-cover bg-center flex items-center justify-center relative dark:bg-gray-950"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-60"></div>
              {activeIndex === index && (
                <motion.div
                  className="text-center text-white z-10 px-4 md:px-10 flex flex-col items-center"
                  whileInView={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 1 }}
                  viewport={{ once: false, amount: 0.5 }}
                >
                  <h1 className="text-2xl sm:text-4xl md:text-6xl font-permanentMarker mb-4 whitespace-nowrap">
                    {slide.title.split(" ").map((word, wordIndex) => (
                      <motion.span
                        key={wordIndex}
                        variants={hAnimation}
                        initial="initial"
                        animate="animate"
                        transition={{
                          duration: 0.5,
                          delay: wordIndex * 0.2,
                          ease: "easeInOut",
                        }}
                        className="inline-block"
                      >
                        {word.split("").map((char, charIndex) => (
                          <motion.span
                            key={charIndex}
                            variants={hAnimation}
                            initial="initial"
                            animate="animate"
                            transition={{
                              duration: 0.5,
                              delay: wordIndex * 0.2 + charIndex * 0.1,
                              ease: "backIn",
                            }}
                            className="inline-block"
                          >
                            {char}
                          </motion.span>
                        ))}
                        <span>&nbsp;</span>{" "}
                        {/* To maintain spacing between words */}
                      </motion.span>
                    ))}
                  </h1>

                  <p className="mb-6 text-sm sm:text-lg md:text-2xl font-permanentMarker">
                    {slide.description.split(" ").map((word, wordIndex) => (
                      <span key={wordIndex} className="inline-block mr-2">
                        {word.split("").map((char, charIndex) => (
                          <motion.span
                            key={charIndex}
                            variants={pAnimation}
                            initial="initial"
                            animate="animate"
                            transition={{
                              duration: 0.5,
                              delay: wordIndex * 0.3 + charIndex * 0.05,
                              ease: "backOut",
                            }}
                            className="inline-block"
                          >
                            {char}
                          </motion.span>
                        ))}
                      </span>
                    ))}
                  </p>
                  <div>
                    <Link to={slide.link}>
                      <motion.button className="explore">
                        Explore
                        <div className="hoverEffect">
                          <div />
                        </div>
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;

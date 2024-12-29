import { motion } from "framer-motion";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import image1 from "../../assets/images1.jpeg";
import image10 from "../../assets/images10.jpeg";
import image11 from "../../assets/images11.jpeg";
import image12 from "../../assets/images12.jpeg";
import image13 from "../../assets/images13.jpeg";
import image14 from "../../assets/images14.jpeg";
import image15 from "../../assets/images15.jpeg";
import image2 from "../../assets/images2.jpeg";
import image3 from "../../assets/images3.jpeg";
import image4 from "../../assets/images4.jpeg";
import image5 from "../../assets/images5.jpeg";
import image6 from "../../assets/images6.jpeg";
import image7 from "../../assets/images7.jpeg";
import image8 from "../../assets/images8.jpeg";
import image9 from "../../assets/images9.jpeg";
import GalleryCard from "./GalleryCard";

const Gallery = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const galleryImages = [
    {
      id: 1,
      image: image1,
      title: "Mughlai Cuisine",
      description:
        "Rich and aromatic dishes from the Mughal era, known for their royal flavors.",
    },
    {
      id: 2,
      image: image2,
      title: "Kacchi Biryani",
      description:
        "A traditional, flavorful, and spicy biryani made with marinated meat and aromatic rice.",
    },
    {
      id: 3,
      image: image3,
      title: "Tandoori Chicken",
      description:
        "Tender chicken marinated in yogurt and spices, cooked in a smoky tandoor oven.",
    },
    {
      id: 4,
      image: image4,
      title: "Burger Delight",
      description:
        "Juicy, grilled burger patties served in a soft bun with fresh toppings and condiments.",
    },
    {
      id: 5,
      image: image5,
      title: "Generous George",
      description:
        "A hearty sandwich or wrap packed with generous portions of meat and fresh ingredients.",
    },
    {
      id: 6,
      image: image6,
      title: "BBQ Chicken Wrap",
      description:
        "Grilled chicken with smoky BBQ sauce wrapped in a soft tortilla for a delicious meal.",
    },
    {
      id: 7,
      image: image7,
      title: "Chicken Caesar Wrap",
      description:
        "A tasty wrap filled with grilled chicken, crispy lettuce, and creamy Caesar dressing.",
    },
    {
      id: 8,
      image: image8,
      title: "Hyderabadi Biryani",
      description:
        "A flavorful and aromatic biryani made with basmati rice, meat, and a blend of spices.",
    },
    {
      id: 9,
      image: image9,
      title: "Singara",
      description:
        "Crispy, deep-fried pastry filled with spiced potatoes and vegetables, a popular snack.",
    },
    {
      id: 10,
      image: image10,
      title: "Samosa",
      description:
        "Golden, crispy pastry pockets filled with spiced potatoes, peas, and sometimes meat.",
    },
    {
      id: 11,
      image: image11,
      title: "Hyderabadi Cuisine",
      description:
        "A rich blend of Mughlai, Persian, and Turkish flavors known for its biryanis and kebabs.",
    },
    {
      id: 12,
      image: image12,
      title: "Mutton Samosa",
      description:
        "A savory pastry filled with spiced mutton, offering a delicious combination of flavors.",
    },
    {
      id: 13,
      image: image13,
      title: "Queen's Burger",
      description:
        "A luxurious burger with premium beef patty, gourmet toppings, and sauces.",
    },
    {
      id: 14,
      image: image14,
      title: "Macarons",
      description:
        "Delicate and colorful French pastries filled with smooth ganache or buttercream.",
    },
    {
      id: 15,
      image: image15,
      title: "Mutton Biryani",
      description:
        "A flavorful and aromatic biryani made with tender mutton, spices, and basmati rice.",
    },
  ];

  const handleImageClick = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="py-10 px-5 min-h-screen">
      <motion.h1
        className="text-4xl md:text-6xl font-extrabold text-center mb-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Gallery
      </motion.h1>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, staggerChildren: 0.2 }}
      >
        {galleryImages.map((img, index) => (
          <GalleryCard
            key={img.id}
            image={img.image}
            title={img.title}
            description={img.description}
            onImageClick={() => handleImageClick(index)}
          />
        ))}
      </motion.div>

      {lightboxOpen && (
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          slides={galleryImages.map((img) => ({ src: img.image }))}
          index={currentIndex}
          toolbar={false}
        />
      )}
    </div>
  );
};

export default Gallery;

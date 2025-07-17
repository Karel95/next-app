"use client";

import { Carousel } from "flowbite-react";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

const carouselImages = [
  {
    id: 1,
    src: "/images/carousel/01.jpeg",
    alt: "A bright and modern waiting room at Humus Medical Services clinic",
  },
  {
    id: 2,
    src: "/images/carousel/02.jpeg",
    alt: "A compassionate doctor consulting with a patient in an examination room",
  },
  {
    id: 3,
    src: "/images/carousel/03.jpeg",
    alt: "Describe image 3",
  },
  {
    id: 4,
    src: "/images/carousel/04.jpeg",
    alt: "Describe image 4",
  },
  {
    id: 5,
    src: "/images/carousel/05.jpeg",
    alt: "Describe image 5",
  },
  {
    id: 6,
    src: "/images/carousel/06.jpeg",
    alt: "Describe image 6",
  },
  {
    id: 7,
    src: "/images/carousel/07.jpeg",
    alt: "Describe image 7",
  },
  {
    id: 8,
    src: "/images/carousel/08.jpeg",
    alt: "Describe image 8",
  },
  {
    id: 9,
    src: "/images/carousel/09.jpeg",
    alt: "Describe image 9",
  },
];

export default function MainCarousel() {
  const t = useTranslations("MainCarousel");

  return (
    <section id="carousel" className="flex flex-col h-[calc(100dvh-var(--navbar-height,3.5rem))] bg-gray-50">
      <div className="relative h-2/3">
        <Carousel>
          {carouselImages.map((image, index) => (
            <div
              key={image.id} // Usa el ID único como 'key'
              className="relative h-full w-full"
            >
              <Image
                priority={index === 0}
                fill
                src={image.src}
                alt={image.alt}
                sizes="100vw"
                className="object-cover"
              />
            </div>
          ))}
        </Carousel>

        <div
          className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-gray-50 to-transparent pointer-events-none"
          aria-hidden="true"
        />
      </div>

      <div className="flex flex-col container h-1/3 mx-auto justify-center items-center text-center">
        <div className="flex flex-col justify-center items-center grow px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
            HUMUS MEDICAL SERVICES
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-4 max-w-2xl">
            {t('subTitle')}
          </p>
        </div>
        
        <a
          href="#hero"
          aria-label="Scroll down to learn more"
          className="primary-color text-white font-bold px-12 rounded-b-lg text-lg .primary-color:hover transition-transform duration-300 hover:-translate-y-1"
        >
          <ChevronDown size={40} />
        </a>
      </div>
    </section>
  );
}
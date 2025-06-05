"use client";

import type React from "react";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/fixtrack-logo.png";
import splash1 from "@/public/splash1.png";
import splash2 from "@/public/splash2.png";
import ellipseLeft from "@/public/ellipse-auth-left.png";
import ellipseMiddle from "@/public/ellipse-auth-middle.png";
import ellipseRight from "@/public/ellipse-auth-right.png";

export default function OnboardingScreen() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 3000);
  }, []);

  // Touch handling state
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const minSwipeDistance = 50;

  const slides = [
    {
      id: 1,
      showLogo: splash1,
      title: "Simplifying property maintenance",
      description:
        "Easily report issues, schedule repairs, and track progress in real time",
    },
    {
      id: 2,
      showLogo: splash2,
      title: "Smart Property MaintenanceApp",
      description:
        "Keep your property in top shape with seamless maintenance coordination",
    },
    {
      id: 3,
      showLogo: splash2,
      title: "Maintenance Made Simple Today",
      description:
        "Keep your property in top shape with seamless maintenance coordination",
    },
  ];

  const nextSlide = useCallback(() => {
    if (currentSlide < slides.length - 1 && !isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide((prev) => prev + 1);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  }, [currentSlide, slides.length, isTransitioning]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 0 && !isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide((prev) => prev - 1);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  }, [currentSlide, isTransitioning]);

  const goToSlide = (index: number) => {
    if (index !== currentSlide && !isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide(index);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }

    // Reset touch positions
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  // Mouse event handlers for desktop testing
  const handleMouseDown = (e: React.MouseEvent) => {
    touchStartX.current = e.clientX;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (touchStartX.current) {
      touchEndX.current = e.clientX;
    }
  };

  const handleMouseUp = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }

    // Reset positions
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  if (loader) {
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <div className="animate-pulse">
          <Image
            src={logo}
            alt="FIXTRACK Logo"
            className="object-contain w-full"
            priority
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="h-screen w-full flex flex-col justify-between bg-white select-none relative">
        <div
          className="h-full flex flex-col items-center mb-10 px-8 z-20 relative"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Pagination dots */}
          <div className="flex  items-end h-full justify-center space-x-2 mb-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  index === currentSlide ? "bg-blue-500" : "bg-gray-300"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          {/* Splash Screen Text  */}
          <div className="relative h-40  w-full overflow-hidden cursor-grab active:cursor-grabbing">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute top-0 left-0 w-full h-full transition-transform duration-500 ease-in-out ${
                  index === currentSlide
                    ? "translate-x-0"
                    : index < currentSlide
                    ? "-translate-x-full"
                    : "translate-x-full"
                }`}
              >
                <div className="flex flex-col items-center justify-center text-white md:text-black  px-8">
                  <div className="flex flex-col items-center text-center  text-white md:text-black mt-2">
                    <h2 className="text-lg font-semibold mb-2">
                      {slide.title}
                    </h2>
                    <p className="text-sm  text-white  md:text-gray-600 mb-4">
                      {slide.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Get Started button */}
          {/* <button
            onClick={nextSlide}
            className="w-full py-3 px-6 bg-gray-200 text-gray-700 rounded-full font-medium hover:bg-gray-300 transition-colors"
          >
            Get Started
          </button> */}
          <Link
            href="/register"
            className="w-full py-3 px-6 bg-[#1980E5] md:border-gray-700 md:border-2 md:text-gray-700 text-white rounded-full font-medium hover:bg-blue-500 md:hover:border-blue-500 md:hover:text-white md:bg-transparent transition-colors text-center"
          >
            Get Started
          </Link>
        </div>
        <div className="absolute top-0 h-full bottom-0 flex justify-between items-end w-full overflow-hidden ">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`md:hidden absolute top-0 left-0 w-full h-full transition-transform duration-500 ease-in-out ${
                index === currentSlide
                  ? "translate-x-0"
                  : index < currentSlide
                  ? "-translate-x-full"
                  : "translate-x-full"
              }`}
            >
              <Image
                src={slide.showLogo}
                alt="ellipse"
                className="w-full h-full "
              />
            </div>
          ))}
          <Image
            src={ellipseLeft}
            alt="ellipse"
            className="hidden w-44 md:w-80 md:block"
          />
          <div className="hidden absolute w-full md:block">
            <Image
              src={ellipseMiddle}
              alt="ellipse"
              className="w-52 sm:w-96 mx-auto"
            />
          </div>
          <Image
            src={ellipseRight}
            alt="ellipse"
            className="hidden w-44 md:w-80 md:block"
          />
        </div>
      </div>
    </>
  );
}

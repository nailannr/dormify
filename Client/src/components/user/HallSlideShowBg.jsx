import React, { useEffect, useState } from "react";

export default function HallSlideShowBg({ images }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div
      className="absolute inset-0 w-full h-full transition-all duration-1000"
      style={{
        backgroundImage: `url(${images[index]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        zIndex: 0,
        opacity: 0.3,
        transition: "background-image 4s ease-in-out"
      }}
    />
  );
}

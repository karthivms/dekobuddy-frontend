'use client'

import { useEffect, useState, ReactNode, useRef } from "react";

interface ScrollWrapperProps {
  children: ReactNode;
  offset?: number;
  direction?: number;
}

const ScrollWrapper = ({ children, offset = 0, direction }: ScrollWrapperProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef<HTMLDivElement | null>(null);
  
    useEffect(() => {
      const handleScroll = () => {
        if (elementRef.current) {
          const scrollPosition = window.scrollY + window.innerHeight;
          const elementPosition =
            elementRef.current.getBoundingClientRect().top + window.scrollY;
  
          if (scrollPosition > elementPosition + offset && !isVisible) {
            setIsVisible(true);
            window.removeEventListener("scroll", handleScroll); // Remove listener after animation
          }
        }
      };
  
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, [isVisible, offset]);

  const styles = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0px)" : `translateY(${direction}px)`,
    transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
  };

  return (
    <div ref={elementRef} style={styles}>
      {children}
    </div>
  );
};

export default ScrollWrapper;

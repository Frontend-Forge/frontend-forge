"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

export const ContainerScroll = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.7, 0.9] : [1.05, 1];
  };

  // Modified rotation transform to be straight (0 degrees) when in view
  const rotate = useTransform(scrollYProgress, [0, 0.1, 1], [20, 0, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);
  // Added opacity transform that increases as content comes into view
  const opacity = useTransform(scrollYProgress, [0, 0.05, 0.15], [0.2, 0.6, 1]);

  return (
    <div
      className="h-[650px] md:h-[80rem] flex items-center justify-center relative p-2 md:p-20"
      ref={containerRef}
      style={{ width: "95vw" }}
    >
      <div
        className="py-10 md:py-20 w-full relative"
        style={{
          perspective: "1000px",
        }}
      >
        <Card
          rotate={rotate}
          translate={translate}
          scale={scale}
          opacity={opacity}
        >
          {children}
        </Card>
      </div>
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Header = ({ translate, titleComponent }: any) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="div max-w-5xl mx-auto text-center"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  opacity,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  opacity: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
      }}
      className=" -mt-[240px] mx-auto h-[650px] w-full rounded-[30px] bg-transparent"
    >
      <motion.div style={{ opacity }} className="w-full h-full">
        {children}
      </motion.div>
    </motion.div>
  );
};

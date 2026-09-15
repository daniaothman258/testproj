import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";

import "./HeroDoctor.css";
import OsamaImage from "../assets/logo/osama.png";

const clamp = (value, min, max) =>
  Math.min(Math.max(value, min), max);

export default function HeroDoctor() {
  const prefersReducedMotion = useReducedMotion();

  const pointerStartX = useRef(0);
  const rotationAtStart = useRef(0);

  const [dragging, setDragging] = useState(false);

  const rawRotation = useMotionValue(0);

  const rotateY = useSpring(rawRotation, {
    stiffness: 190,
    damping: 25,
    mass: 0.65,
  });

  const rotateX = useTransform(
    rotateY,
    [-18, 18],
    [2.5, -2.5]
  );

  const imageX = useTransform(
    rotateY,
    [-18, 18],
    [-10, 10]
  );

  const shineX = useTransform(
    rotateY,
    [-18, 18],
    [18, -18]
  );

  const shadowX = useTransform(
    rotateY,
    [-18, 18],
    [14, -14]
  );

  const beginDrag = (event) => {
    if (prefersReducedMotion) return;

    event.currentTarget.setPointerCapture?.(
      event.pointerId
    );

    pointerStartX.current = event.clientX;

    rotationAtStart.current = rawRotation.get();

    setDragging(true);
  };

  const drag = (event) => {
    if (!dragging || prefersReducedMotion) return;

    const deltaX =
      event.clientX - pointerStartX.current;

    rawRotation.set(
      clamp(
        rotationAtStart.current +
          deltaX * 0.11,
        -18,
        18
      )
    );
  };

  const endDrag = (event) => {
    if (!dragging) return;

    try {
      event.currentTarget.releasePointerCapture?.(
        event.pointerId
      );
    } catch {
      // لا شيء
    }

    setDragging(false);
  };

  const resetView = () => {
    if (!prefersReducedMotion) {
      rawRotation.set(0);
    }
  };

  return (
    <motion.div
      className="burda-doctor-stage"
      initial={
        prefersReducedMotion
          ? false
          : {
              opacity: 0,
              scale: 0.965,
              y: 24,
            }
      }
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}
      transition={{
        duration: 0.8,
        ease: [0.2, 0.8, 0.2, 1],
        delay: 0.18,
      }}
    >
      <div
        className="burda-doctor-aura"
        aria-hidden="true"
      />

      <motion.div
        className={`burda-doctor-card${
          dragging ? " is-dragging" : ""
        }`}
        style={
          prefersReducedMotion
            ? undefined
            : {
                rotateY,
                rotateX,
              }
        }
        onPointerDown={beginDrag}
        onPointerMove={drag}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onDoubleClick={resetView}
      >
        <motion.img
  src={OsamaImage}
  alt="BURDA doctor"
  className="burda-doctor-image"
  draggable="false"
  loading="eager"
  decoding="async"
  fetchPriority="high"
  style={
    prefersReducedMotion
      ? undefined
      : {
          x: imageX,
        }
  }
/>

        <motion.div
          className="burda-doctor-shine"
          aria-hidden="true"
          style={
            prefersReducedMotion
              ? undefined
              : {
                  x: shineX,
                }
          }
        />

        <div
          className="burda-doctor-frame"
          aria-hidden="true"
        />
      </motion.div>

      <motion.div
        className="burda-doctor-shadow"
        aria-hidden="true"
        style={
          prefersReducedMotion
            ? undefined
            : {
                x: shadowX,
              }
        }
      />

      {!prefersReducedMotion && (
        <div
          className="burda-doctor-hint"
          aria-hidden="true"
        >
          <span>↔</span>
          <small>DRAG</small>
        </div>
      )}
    </motion.div>
  );
}
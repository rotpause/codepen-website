'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Work } from '@/lib/types';
import SkeletonLoader from './SkeletonLoader';
import './Carousel.css';

interface CarouselProps {
  items: Work[] | null;
  loading: boolean;
}

export default function Carousel({ items, loading }: CarouselProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [translateX, setTranslateX] = useState(0);
  const touchStartXRef = useRef<number>(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const scrollDeltaRef = useRef<number>(0);

  const itemCount = items?.length || 3;
  const itemWidthPercent = 100 / 3; // Show 3 items at once

  // Desktop: Smooth wheel scrolling
  useEffect(() => {
    if (!isHovering || !carouselRef.current) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      // Accumulate scroll delta
      scrollDeltaRef.current += e.deltaY;

      // Smooth translation: 1 pixel of wheel = 0.5 pixels of carousel movement
      const newTranslateX = translateX + e.deltaY * 0.5;

      // Clamp to carousel bounds
      const maxTranslate = itemWidthPercent * (itemCount - 3);
      const clampedX = Math.max(
        -itemWidthPercent,
        Math.min(maxTranslate + itemWidthPercent, newTranslateX)
      );

      setTranslateX(clampedX);
    };

    const carousel = carouselRef.current;
    carousel.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      carousel.removeEventListener('wheel', handleWheel);
    };
  }, [isHovering, itemCount, translateX, itemWidthPercent]);

  // Mobile: Touch scrolling
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touchCurrentX = e.touches[0].clientX;
    const diff = touchStartXRef.current - touchCurrentX;

    // Translate carousel based on touch movement
    const containerWidth = carouselRef.current?.offsetWidth || 0;
    const pixelsToPercent = (100 / containerWidth) * 3; // 3 items in view

    const newTranslateX = translateX + diff * pixelsToPercent * 0.05;

    // Clamp to bounds
    const maxTranslate = itemWidthPercent * (itemCount - 3);
    const clampedX = Math.max(
      -itemWidthPercent,
      Math.min(maxTranslate + itemWidthPercent, newTranslateX)
    );

    setTranslateX(clampedX);
    touchStartXRef.current = touchCurrentX;
  };

  const handleTouchEnd = () => {
    // Snap to nearest image on mobile
    const snapIndex = Math.round(translateX / itemWidthPercent);
    setTranslateX(snapIndex * itemWidthPercent);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setIsDragging(false);

    // Snap to nearest image on desktop drag
    const containerWidth = carouselRef.current?.offsetWidth || 0;
    const pixelsToPercent = (100 / containerWidth) * 3;
    const dragDiff = (startX - e.clientX) * pixelsToPercent * 0.05;

    const newTranslateX = translateX + dragDiff;
    const snapIndex = Math.round(newTranslateX / itemWidthPercent);
    const snappedX = Math.max(
      -itemWidthPercent,
      Math.min(itemWidthPercent * (itemCount - 3) + itemWidthPercent, snapIndex * itemWidthPercent)
    );

    setTranslateX(snappedX);
  };

  if (loading) {
    return (
      <div className="carousel-container">
        <SkeletonLoader variant="carousel" />
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="carousel-container">
        <p className="carousel-placeholder">No featured works available</p>
      </div>
    );
  }

  return (
    <div className="carousel-wrapper">
      <div
        className="carousel-container"
        ref={carouselRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => {
          setIsDragging(false);
          setIsHovering(false);
        }}
        onMouseEnter={() => setIsHovering(true)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="carousel-track"
          style={{
            transform: `translateX(${-translateX}%)`,
            transition: isDragging ? 'none' : 'transform 0.3s ease-out',
          }}
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="carousel-slide"
              style={{ width: `${itemWidthPercent}%` }}
            >
              <img
                src={item.images[0]}
                alt={item.title}
                className="carousel-image"
              />
              <div className="carousel-overlay">
                <h3 className="carousel-title">{item.title}</h3>
                <p className="carousel-description">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="carousel-progress">
        <div
          className="carousel-progress-bar"
          style={{
            width: `${Math.abs(translateX) / (itemWidthPercent * (itemCount - 3)) * 100}%`,
          }}
        />
      </div>
    </div>
  );
}

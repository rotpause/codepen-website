import React from 'react';
import './Skeleton.css';

interface SkeletonLoaderProps {
  variant?: 'card' | 'carousel' | 'article';
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ variant = 'card' }) => {
  if (variant === 'carousel') {
    return (
      <div className="skeleton-carousel">
        <div className="skeleton-carousel-img"></div>
        <div className="skeleton-carousel-overlay">
          <div className="skeleton-carousel-title"></div>
          <div className="skeleton-carousel-description"></div>
        </div>
      </div>
    );
  }

  if (variant === 'article') {
    return (
      <div className="skeleton-article">
        <div className="skeleton-article-img"></div>
        <div className="skeleton-article-title"></div>
        <div className="skeleton-article-lines">
          <div className="skeleton-line"></div>
          <div className="skeleton-line"></div>
          <div className="skeleton-line" style={{ width: '85%' }}></div>
        </div>
      </div>
    );
  }

  // Default card variant
  return (
    <div className="skeleton-card">
      <div className="skeleton-img"></div>
      <div className="skeleton-body">
        <div className="skeleton-title">
          <div className="skeleton-line" style={{ width: '80%' }}></div>
        </div>
        <div className="skeleton-text">
          <div className="skeleton-line"></div>
          <div className="skeleton-line" style={{ width: '90%' }}></div>
          <div className="skeleton-line" style={{ width: '85%' }}></div>
        </div>
        <div className="skeleton-button"></div>
      </div>
    </div>
  );
};

export default SkeletonLoader;

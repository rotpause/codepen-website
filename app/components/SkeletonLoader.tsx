import React from 'react';
import './Skeleton.css';

const SkeletonLoader = () => {
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

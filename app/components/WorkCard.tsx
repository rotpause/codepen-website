'use client';

import React from 'react';
import Link from 'next/link';
import { Work } from '@/lib/types';
import SkeletonLoader from './SkeletonLoader';
import './WorkCard.css';

interface WorkCardProps {
  work?: Work;
  loading?: boolean;
}

export default function WorkCard({ work, loading = false }: WorkCardProps) {
  if (loading || !work) {
    return <SkeletonLoader variant="card" />;
  }

  return (
    <Link href={`/works/${work.slug}`}>
      <div className="work-card">
        <div className="work-card-image">
          <img
            src={work.images[0]}
            alt={work.title}
            className="work-image"
          />
        </div>
        <div className="work-card-content">
          <h3 className="work-title">{work.title}</h3>
          <p className="work-description">{work.description}</p>
          <span className="work-link">View Article →</span>
        </div>
      </div>
    </Link>
  );
}

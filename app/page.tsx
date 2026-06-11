'use client';

import React from 'react';
import Carousel from './components/Carousel';
import WorkCard from './components/WorkCard';
import { useFeaturedWorks } from './hooks/useFeaturedWorks';
import './page.css';

export default function Home() {
  const { data: featuredWorks, loading: loading } = useFeaturedWorks();

  return (
    <main className="main-content">
      {/* Hero/Intro Section */}
      <section className="hero-section">
        <div className="hero-container">
          <h1 className="hero-title">Living Archive</h1>
          <p className="hero-subtitle">
            A dynamic exploration of contemporary practice, archival methodology, and collective knowledge
          </p>
        </div>
      </section>

      {/* Current Events Carousel */}
      <section className="carousel-section">
        <div className="section-container">
          <div className="section-header">
            <h2>Current Events</h2>
            <p className="section-description">Featured works and recent projects</p>
          </div>
          <Carousel items={featuredWorks} loading={loading} />
        </div>
      </section>

      {/* Featured Works Preview */}
      <section className="featured-works-section">
        <div className="section-container">
          <div className="section-header">
            <h2>Recent Works</h2>
            <p className="section-description">Explore the latest additions to the archive</p>
          </div>
          <div className="works-grid">
            {loading ? (
              <>
                <WorkCard loading={true} />
                <WorkCard loading={true} />
                <WorkCard loading={true} />
              </>
            ) : (
              featuredWorks?.map((work) => (
                <WorkCard key={work.id} work={work} loading={false} />
              ))
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
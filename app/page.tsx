'use client';

import React from "react";
import SkeletonLoader from "./components/SkeletonLoader";
import "./page.css";

export default function Home() {
  return (
    <main className="main-content">
      <section id="works" className="section-content">
        <div className="section-container">
          <div className="skeleton-container">
            <SkeletonLoader />
            <SkeletonLoader />
          </div>
          <div className="section-text">
            <h1>Works</h1>
            <p>Your projects and portfolio items go here</p>
          </div>
        </div>
      </section>

      <section id="about" className="section-content">
        <div className="section-container">
          <div className="skeleton-container">
            <SkeletonLoader />
            <SkeletonLoader />
          </div>
          <div className="section-text">
            <h1>About</h1>
            <p>Your about information goes here</p>
          </div>
        </div>
      </section>
    </main>
  );
}
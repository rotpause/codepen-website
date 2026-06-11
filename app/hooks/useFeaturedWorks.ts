'use client';

import { useState, useEffect } from 'react';
import { Work } from '@/lib/types';

/**
 * Mock data hook for featured works
 * Returns 3 sample featured works with placeholder images
 * Later (Phase 4), this will be replaced with real Supabase API calls
 */
export const useFeaturedWorks = () => {
  const [data, setData] = useState<Work[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API delay (1.5 seconds)
    const timer = setTimeout(() => {
      try {
        const mockWorks: Work[] = [
          {
            id: '1',
            slug: 'project-contemporary-sculpture',
            title: 'Contemporary Sculpture Series',
            description: 'Exploration of form and spatial relationships through sculptural practice',
            featured: true,
            images: [
              'https://images.unsplash.com/photo-1579783902614-e3fb5141b0cb?w=1200&h=800&fit=crop',
            ],
            createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          },
          {
            id: '2',
            slug: 'digital-archive-interface',
            title: 'Digital Archive Interface Design',
            description: 'Interactive web platform for cataloging and exploring multimedia collections',
            featured: true,
            images: [
              'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=800&fit=crop',
            ],
            createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
          },
          {
            id: '3',
            slug: 'living-archive-documentation',
            title: 'Living Archive: Process Documentation',
            description: 'Documentation and video essays on archival methodologies and practices',
            featured: true,
            images: [
              'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1200&h=800&fit=crop',
            ],
            createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          },
        ];
        setData(mockWorks);
      } catch (err) {
        setError('Failed to load featured works');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return { data, loading, error };
};

/**
 * Mock hook for all works
 * Later (Phase 2), this will fetch paginated works from Supabase
 */
export const useAllWorks = (page = 1, pageSize = 12) => {
  const [data, setData] = useState<Work[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const mockWorks: Work[] = [
          {
            id: '1',
            slug: 'project-contemporary-sculpture',
            title: 'Contemporary Sculpture Series',
            description: 'Exploration of form and spatial relationships through sculptural practice',
            featured: true,
            images: [
              'https://images.unsplash.com/photo-1579783902614-e3fb5141b0cb?w=1200&h=800&fit=crop',
            ],
            createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          },
          // More works would go here
        ];
        setData(mockWorks);
      } catch (err) {
        setError('Failed to load works');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [page, pageSize]);

  return { data, loading, error };
};

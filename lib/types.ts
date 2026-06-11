/**
 * TypeScript types for the Living Archive portfolio
 */

export interface MediaItem {
  id: string;
  url: string;
  type: 'image' | 'video';
  alt: string;
  order: number;
}

export interface Work {
  id: string;
  slug: string;
  title: string;
  description: string;
  featured: boolean;
  images: string[]; // Array of image URLs
  createdAt: string;
  updatedAt: string;
}

export interface ArchiveArticle extends Work {
  content: string; // Markdown content for full article
  crossReferences: string[]; // slugs of related works
}

export interface Comment {
  id: string;
  workId: string;
  author: string;
  institution?: string;
  email: string;
  message: string;
  approved: boolean;
  createdAt: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribedAt: string;
}

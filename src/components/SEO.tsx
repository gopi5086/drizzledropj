import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  name?: string;
  type?: string;
  url?: string;
  image?: string;
}

export default function SEO({ 
  title = "DrizzleDrop Inn | Luxury & Comfort Across IT Hubs & Hill Stations", 
  description = "Experience premium hospitality with DrizzleDrop Inn. Enjoy luxury rooms, 24/7 support, and tailored packages located strictly in prime destinations like Ooty and Chennai OMR.", 
  name = "DrizzleDrop Inn", 
  type = "website",
  url = "https://drizzledropinn.com/",
  image = "https://drizzledropinn.com/og-image.webp"
}: SEOProps) {
  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name='description' content={description} />
      
      {/* Open Graph metadata */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={name} />

      {/* Twitter Cards */}
      <meta name="twitter:creator" content={name} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      
      {/* Search Engine Optimization */}
      <link rel="canonical" href={url} />
      <meta name="robots" content="index, follow" />
    </Helmet>
  );
}

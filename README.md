

Movie Explorer: Professional Technical Assessment
A high-performance, responsive movie discovery platform built with Next.js 14 (App Router), TypeScript, and Tailwind CSS, integrated with the TMDB API.

Quick Start
Get the project running locally in under 60 seconds:

Bash
# 1. Clone the repository
git clone <my-repo-link> && cd frontend-assessment-david-bradford

# 2. Install dependencies
npm install

# 3. Setup Environment Variables
# Create a .env.local file and add:
# NEXT_PUBLIC_TMDB_BASE_URL=https://api.themoviedb.org/3
# TMDB_READ_ACCESS_TOKEN=your_api_bearer_token_here

# 4. Start the development server
npm run dev
Access the app at http://localhost:3000

Architecture Decisions
1. Unified Data Fetching (Server-Side)
I implemented a Unified Fetcher pattern in src/lib/tmdb.ts. Instead of scattered API calls, a single logic gate determines whether to hit /trending, /search, or /discover based on URL parameters. This ensures the Server Component remains the single source of truth.


2. Stateless UI (URL as State)
Pagination, Search, and Filtering are entirely driven by URL Query Parameters.

Benefit: Users can share links to specific search results or pages.

Benefit: Enables native "Back/Forward" browser navigation without extra state management (Redux/Zustand).

Performance Optimizations
Image Optimization (LCP): Used next/image with priority on the first HeroSlider item to achieve a high Largest Contentful Paint score.

Dynamic Streaming: Implemented loading.tsx with Shimmer Skeletons to allow the page shell to render instantly while data fetches in the background.

Request Memoization: Configured fetch with revalidate: 3600 for trending data to utilize Next.js Data Cache, reducing redundant API hits.

Cumulative Layout Shift (CLS) Prevention: All image containers have a defined aspect-ratio and background color to prevent "jumping" UI during image load.

Trade-offs & Known Limitations
Client vs. Server Filtering: I chose API-side filtering (via TMDB's /discover). While client-side filtering is faster after the first load, API-side filtering is significantly more scalable as the dataset grows into the thousands.

Trailer Integration: Due to time constraints, the "Watch Trailer" button is a UI placeholder.

Image DNS Resolution: During development in specific regions (Abuja), DNS resolution for TMDB images can occasionally lag. I implemented a robust onError fallback to a local placeholder to ensure the UI never breaks.

Bonus Tasks Attempted
1. Pagination 
Verification: Scroll to the bottom of the Home or Search results. Use the "Next/Previous" buttons. Observe the ?page=X update in the URL and the content refresh seamlessly.

2. Year Filtering 
Verification: Use the dropdown next to the search bar. Selecting a year (e.g., 2024) updates the grid. This works in combination with search queries.

3. High-Fidelity Hero Slider 
Verification: The homepage features an auto-sliding hero section using the top trending movies. It includes "Read More" links that lead directly to the detail pages.

4. Custom Metadata & SEO
Verification: Every movie detail page generates dynamic metadata. View the source code on a detail page to see unique <title> and OpenGraph tags based on the movie's specific data.

Developed by: David Uko Bradford

Tech Stack: Next.js 14, TypeScript, Tailwind CSS, TMDB API, Vercel.
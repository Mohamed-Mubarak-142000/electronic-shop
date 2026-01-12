# Next.js Performance Optimization Plan

## 1. Largest Contentful Paint (LCP) Optimization
- **Home Page Hero**: Replaced CSS `backgroundImage` with `<Image priority fill />` to ensure preloading and correct sizing.
- **Home Page Categories**: Replaced CSS `backgroundImage` with `<Image fill />` to utilize Next.js image optimization (WebP/AVIF, resizing).
- **Hero Carousel**: Updated `priority` prop to only target the first slide (`index === 0` logic) to avoid prioritizing invisible slides.

## 2. Image Delivery Optimization
- **Use `next/image`**: Verified usage across components. Replaced `<img>` with `<Image>` in `CheckoutDialog.tsx` with proper `sizes`.
- **Responsive Sizes**: Added `sizes` attribute to all full-width or grid-based images to ensure the browser downloads the correct size for the viewport.

## 3. Reduce Main Thread Work & Bundle Size
- **ChatPopup**: Implemented `dynamic` import for `ChatPopup` in the layout to remove it from the initial server-rendered HTML and chunk it separately.
- **MapSelector**: Verified `MapSelector` is dynamically imported in the Home page. This isolates the heavy `mapbox-gl` library from the main bundle.

## 4. Forced Reflows
- **Audit**: Checked for layout thrashing. Usage of library components (Swiper, Mapbox) is the main source of geometric calculations.
- **Mitigation**: ensured custom code does not perform read-write loops on DOM elements.

## 5. Critical Request Chain
- **Preloading**: By using `next/image` with `priority` for the Hero, Next.js automatically adds `<link rel="preload">` to the head, reducing the critical chain depth.

## 6. Unused Code
- Identified `ShowroomMap.tsx` as potentially unused (or replaced by `MapSelector`), but kept it to avoid breaking uncommitted work.
- Recommended removing unused imports during development.

## 7. Next Steps
- **Production Build**: Run `npm run build` and `npm start` to verify optimizations in a production environment.
- **Lighthouse**: Run a Lighthouse audit on the production build to confirm score improvements.

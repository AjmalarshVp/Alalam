# Al Maha Swimming Pools (Premium Saudi Pool Services)

A premium, fully responsive, and highly animated multi-page React website for **Al Maha Swimming Pools** (Premium Saudi Pool Services). This project showcases luxury pool installations, maintenance, cleaning, chemistry balancing, and restoration services across the Kingdom of Saudi Arabia (Riyadh, Jeddah, Dammam, and Al Khobar).

---

## 📱 Responsiveness Across Devices

The website is engineered from the ground up using **Tailwind CSS v4**'s responsive utility classes, ensuring a flawless and premium visual experience across all form factors:

### 1. Mobile (Web/iOS/Android)
- **Fluid Stacked Layouts**: Complex grid systems dynamically stack into a single-column layout for easy scrolling.
- **Mobile Navigation Drawer**: A stateful header drawer that slides out when clicking the hamburger menu, keeping links clean and accessible.
- **Touch-Friendly Controls**: The Before/After comparison slider and Lightbox modal are equipped with touch listeners for smooth swipe/drag gestures.
- **Typography & Paddings**: Custom-coded variables (`--spacing-margin-mobile: 16px`, `--spacing-stack-sm: 8px`) optimize spacing for tight screens.

### 2. Tablet (iPad/Android Tablets)
- **Auto-Adapting Bento Grid**: The Bento grid sections ("The Elite Standard" and "Services") automatically switch from single-column to 2-column grid tracks.
- **Optimized Columns**: Cards and masonry items dynamically adapt to fit medium-width screens without text wrapping or clipping issues.

### 3. Desktop & Large Screens
- **Pixel-Perfect Alignment**: Grid containers expand up to a predefined maximum container size (`--spacing-container-max: 1200px`) with desktop gutters (`--spacing-gutter: 24px`).
- **Interactive Micro-Animations**: Rich animations such as hovering zoom overlays on portfolio items, sliding details indicators, and scaling buttons.
- **Glassmorphism Navbars & Cards**: Uses `backdrop-blur-xl` combined with transparent borders for an ultra-premium feel.

---

## 🛠️ Features
- **Dual-Language Toggle**: Fluid translation between English and Arabic at the click of a button. Automatically sets the document direction attribute (`dir="rtl"`) and switches layout alignment seamlessly.
- **Interactive Before/After Slider**: Custom-built draggable slider widget demonstrating pool renovation transformations.
- **Category Filterable Masonry Portfolio**: Sort through villa installations, commercial Olympic projects, and maintenance hubs.
- **Portfolio Lightbox**: Fullscreen slide viewer with keyboard escape close controls and arrow key pagination support.
- **Stateful Quote Request Modal & Forms**: Interactive consultation forms with submission states (idle, sending, success banners).

---

## 🚀 Running Instructions

Follow these simple steps to install dependencies and run the project locally on your machine:

### 1. Install Dependencies
Open your terminal in the project root directory (`saudi-pool-services`) and run:
```bash
npm install
```
*Note: This will read the lockfile and download the correct version of React, Vite, and tailwind utilities.*

### 2. Run the Development Server
Start the local Vite development server with Hot Module Replacement (HMR) active:
```bash
npm run dev
```
Once started, open the local URL in your browser (usually `http://localhost:5173`).

### 3. Compile for Production
To bundle and optimize the project assets for deployment, run:
```bash
npm run build
```
This generates a production-ready `dist` folder.

### 4. Preview the Production Build
To test the compiled bundle locally before deploying, run:
```bash
npm run preview
```

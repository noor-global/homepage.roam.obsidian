# Minimal Browser Homepage

A functional and aesthetically pleasing minimalist browser homepage designed specifically for use as a start page or New Tab override, particularly fitting alongside markdown knowledge bases or minimalist workspaces. 

## ✨ Features

- **Multi-Engine Search Bar:** Supports querying across an array of top search providers (Google, DuckDuckGo, Bing, Yahoo!, Yandex, YouTube, Wikipedia, Reddit, and GitHub).
- **Sticky Engine Selection:** Uses local storage to seamlessly remember your preferred search provider on the next launch.
- **Floating Icon Selector:** An integrated and beautiful custom-built search engine floating bar leveraging original SVG graphics designed for direct integration.
- **Advanced Search Panel:** Integrated graphical user interface for constructing deep complex queries natively without memorizing platform-specific advanced query syntax (supporting exact phrases, exclusions, file types, site-specific operators, numeric ranges, and more).
- **Responsive Layout:** fully responsive flex and grid layouts.
- **Light & Dark Themes:** Elegant theme toggle leveraging a `prefers-color-scheme` initial check and manual overrides stored in `localStorage`. 
- **Stoic Quotes Engine:** A dynamic randomization engine feeding a minimalist text quote loader on each session start out of a curated dictionary.
- **Tailwind CSS styling:** Emphasizing highly custom frosted glass aesthetics (`backdrop-blur`) and precise styling overlays.

## 🚀 Setup & Installation

This homepage operates as a standalone static HTML application, meaning it does **not** require any build steps or local development server environments.

1. **Clone or Download the Repository**
2. **Setup your Browser**
    - Set `index.html` as your default homepage url.
    - If you want this specifically as your New Tab page, you can use browser extensions like "Custom New Tab URL" (Chrome) to point your New Tab action directly at your local `index.html` file path (e.g., `file:///C:/path/to/folder/index.html`).
3. **Open and Enjoy.**

## 🛠 Technology Stack

This application is built with vanilla web technologies and pulls assets from CDNs.

- **HTML5** & **Vanilla Javascript** (ES6) 
- **Tailwind CSS (via CDN)** for comprehensive fast styling capabilities.
- **Lucide Icons** for structural UI iconography.
- **Google Fonts (Poppins)** for primary typography.

## 📁 Project Structure

```
├── index.html        # Main DOM Document
├── script.js         # Interactive application logic (Search, Themes, Selection)
├── styles.css        # Additional custom animations & UI refinements 
└── assets/
    └── icons/        # Stored offline search engine SVGs 
```

## 🎨 Configuration

### Editing Quotes
To modify the list of stoic quotes, open `script.js` and locate the `quotes` array at the top of the file. You can freely add, alter, or strip quote strings from the list.

### Default Search Engine Fallback
By default, the script falls back to "google" if entirely cleared. You can change this behavior in `script.js` where the `localStorage` payload initializes:
```javascript
const savedEngine = localStorage.getItem("preferredEngine") || "duckduckgo"; // Change "google" to something else
```

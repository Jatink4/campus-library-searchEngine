# Inverto Frontend - Book Search Engine

A beautiful, dark-themed React frontend for the Inverto book search engine with debounced autocomplete and detailed book information display.

## Features

✨ **Dark Theme UI**
- Modern dark theme with greyish-black background
- Glassmorphism effects with backdrop filters
- Smooth animations and transitions

🔍 **Smart Search**
- Debounced search input (300ms)
- Real-time autocomplete suggestions
- Floating autocomplete results
- Scrollable result list

📖 **Book Details**
- Beautiful book cover visualization
- Comprehensive book information display
- Scrollable details panel
- Responsive layout

🎨 **Design Elements**
- Floating navbar with gradient branding
- Smooth page load animations
- Shadow effects and depth
- Hover effects on interactive elements
- Proper spacing and typography

## Tech Stack

- **React 18.2** - UI library
- **Vite 5.0** - Build tool
- **CSS3** - Styling with custom properties
- **Vanilla JavaScript** - No additional libraries

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

The app will open at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

Output will be in the `dist/` directory.

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx           # Floating navbar with branding
│   ├── Navbar.css
│   ├── SearchBar.jsx        # Main search input with debouncing
│   ├── SearchBar.css
│   ├── AutocompleteResults.jsx  # Floating autocomplete list
│   ├── AutocompleteResults.css
│   ├── BookDetails.jsx      # Book details display
│   └── BookDetails.css
├── App.jsx                   # Main app component
├── App.css
├── main.jsx                  # Entry point
└── styles.css               # Global styles
```

## API Integration

The frontend connects to the backend API at `http://localhost:8000/api/`:

- `POST /search/auto-complete` - Get autocomplete suggestions
- `GET /books/{book_id}` - Get detailed book information

## Features in Detail

### Search Bar
- Debounced input with 300ms delay
- Clear button to reset search
- Icon animations
- Responsive design

### Autocomplete Results
- Floating dropdown with smooth animations
- Book icon, title, author, publisher, edition, year
- Hover effects with visual feedback
- Loading spinner
- Scrollable list with custom scrollbar

### Book Details
- Large, bold title
- Book cover visualization
- Grid layout for information
- Scrollable content panel
- Tags and categories with hover effects
- Responsive grid for mobile

## Styling

- Custom CSS variables for theming
- Mobile-first responsive design
- Smooth animations and transitions
- Accessibility considerations

## Performance

- Debounced search to reduce API calls
- Optimized rendering
- Smooth scrolling
- Efficient CSS animations

## Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

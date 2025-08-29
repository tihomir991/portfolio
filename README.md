# Frontend Developer Portfolio

A modern, responsive portfolio website built with React 19, TypeScript, and Vite. Features a clean architecture with Context API for state management and comprehensive TypeScript interfaces.

## ✨ Features

- **Modern Tech Stack**: React 19, TypeScript, Vite
- **Responsive Design**: Mobile-first approach with CSS Grid and Flexbox
- **Context-Based Architecture**: React Context for data management (no prop drilling)
- **Professional Sections**:
  - Hero section with call-to-action
  - About section with skills showcase
  - Featured projects with live demos
  - Work experience timeline
  - Contact form with validation
- **Clean Code**: Separate CSS files, TypeScript interfaces, custom hooks
- **Performance Optimized**: Lazy loading, memoized context values
- **Accessibility**: WCAG compliant with proper ARIA labels

## 🚀 Tech Stack

- **Frontend**: React 19, TypeScript 5.8
- **Build Tool**: Vite 7
- **Styling**: CSS3 with custom properties
- **State Management**: React Context API
- **Linting**: ESLint 9 with React hooks plugin

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # Navigation header
│   ├── Hero.tsx        # Landing section
│   ├── About.tsx       # About section
│   ├── Projects.tsx    # Featured projects
│   ├── Experience.tsx  # Work experience
│   ├── Contact.tsx     # Contact form
│   ├── Footer.tsx      # Site footer
│   └── *.css          # Component-specific styles
├── data/               # Static data
│   └── portfolioData.ts # Portfolio content
├── types/              # TypeScript definitions
│   └── index.ts        # Type interfaces
├── styles/             # Global styles (if needed)
├── App.tsx            # Main app component
├── App.css            # Global app styles
├── index.css          # Base styles and CSS variables
└── main.tsx           # Application entry point
```

## 🛠️ Installation & Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Build for production**

   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## ⚙️ Configuration

### Personalizing the Portfolio

1. **Update Personal Information**

   - Edit `src/data/portfolioData.ts` to replace sample data with your information
   - Add your projects, experience, and contact details

2. **Replace Placeholder Images**

   - Add your photos to the `public/` directory
   - Update image paths in the data file
   - Recommended sizes:
     - Hero avatar: 300x300px
     - About photo: 400x400px
     - Project images: 600x400px

3. **Customize Styling**

   - Modify CSS variables in `src/index.css` for colors, fonts, and spacing
   - Update component-specific styles in individual CSS files

4. **Add Your Resume**
   - Place your resume PDF in the `public/` directory as `resume.pdf`
   - Or update the download link in `src/components/About.tsx`

### Environment Variables

Create a `.env` file in the root directory for any configuration:

```env
VITE_CONTACT_EMAIL=your.email@example.com
VITE_GITHUB_USERNAME=yourusername
VITE_LINKEDIN_URL=https://linkedin.com/in/yourprofile
```

## 🎨 Customization

### Color Scheme

The portfolio uses CSS custom properties for easy theming. Update these variables in `src/index.css`:

```css
:root {
  --primary-color: #3498db;
  --primary-dark: #2980b9;
  --secondary-color: #2c3e50;
  --accent-color: #ffd700;
  /* ... more variables */
}
```

### Typography

The portfolio uses Inter font by default. To change fonts, update the Google Fonts import in `src/index.css` and the font-family variables.

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints:

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🚀 Deployment

### Netlify

1. Build the project: `npm run build`
2. Drag and drop the `dist` folder to Netlify
3. Or connect your Git repository for automatic deployments

### Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel --prod`
3. Follow the prompts

### GitHub Pages

1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json scripts: `"deploy": "gh-pages -d dist"`
3. Run: `npm run build && npm run deploy`

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio. If you make improvements that could benefit others, pull requests are welcome!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [Vite](https://vitejs.dev/)
- Styled with CSS3 and [Inter font](https://fonts.google.com/specimen/Inter)
- Inspired by modern portfolio design trends

---

**Note**: This is a template portfolio. Remember to replace all placeholder content with your actual information, projects, and images before deploying to production.

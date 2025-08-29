<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Portfolio Development Project

This is a React TypeScript portfolio project for a front-end developer, built with Vite and featuring:

- Modern, responsive design with separate CSS files
- Professional portfolio sections (Hero, About, Skills, Projects, Experience, Contact)
- Clean architecture with TypeScript interfaces
- Optimized performance and accessibility

## Development Status: ✅ COMPLETE

- ✅ Project scaffolded with Vite React TypeScript template
- ✅ All portfolio components created with separate CSS files
- ✅ TypeScript interfaces and data structures implemented
- ✅ Project builds successfully without errors
- ✅ Development server running at http://localhost:5173/
- ✅ Comprehensive documentation provided

## Coding Rules & Standards

### React Development Rules

1. **Data Sharing**: Use React Context instead of props for passing data to children components

   - Create context providers for shared state (e.g., `PortfolioContext`, `ThemeContext`)
   - Avoid prop drilling - if data needs to go more than 2 levels deep, use Context
   - Use custom hooks to consume context (e.g., `usePortfolio()`, `useTheme()`)

2. **Component Structure**:

   - Each component must have its own separate CSS file
   - No inline styling allowed - all styles in dedicated CSS files
   - Use CSS custom properties (CSS variables) for theming
   - Follow BEM methodology for CSS class naming

3. **TypeScript Standards**:

   - Use `type` imports for all interface/type imports (`import type { ... }`)
   - Define strict interfaces for all props and data structures
   - Use generics where appropriate for reusable components
   - Prefer `interface` over `type` for object shapes

4. **File Organization**:

   - Components in `src/components/` with `.tsx` and `.css` files
   - Types and interfaces in `src/types/`
   - Context providers in `src/context/`
   - Custom hooks in `src/hooks/`
   - Utilities in `src/utils/`

5. **State Management**:

   - Use Context + useReducer for complex state
   - Prefer useState for simple local component state
   - Use custom hooks to encapsulate stateful logic

6. **Performance Rules**:

   - Wrap context providers with `useMemo` for value objects
   - Use `React.memo` for components that receive frequent re-renders
   - Lazy load components when appropriate
   - Optimize images and assets

7. **Accessibility**:

   - Include proper ARIA labels and roles
   - Ensure keyboard navigation support
   - Use semantic HTML elements
   - Test with screen readers

8. **Code Quality**:

   - Use ESLint and Prettier configurations
   - Write JSDoc comments for complex functions
   - Follow consistent naming conventions (camelCase for variables, PascalCase for components)
   - Keep components under 200 lines when possible
   - Prefer functional components over class components
   - Use explicit return types for functions when helpful for clarity

9. **Import/Export Standards**:

   - Use named exports for utilities and hooks
   - Use default exports for React components
   - Group imports: React/external libraries first, then internal modules
   - Use type-only imports for TypeScript types (`import type { ... }`)

10. **Error Handling**:
    - Use error boundaries for component error handling
    - Provide meaningful error messages in context hooks
    - Handle async operations with proper try/catch blocks
    - Show loading states for async operations

## Current Architecture

### Context-Based Data Flow

The portfolio now uses React Context for data management instead of prop drilling:

- **PortfolioContext**: Central context providing all portfolio data
- **PortfolioProvider**: Wraps the entire app in App.tsx
- **usePortfolio hook**: Custom hook to consume portfolio data
- **Components**: All data-consuming components use the hook instead of direct imports

**Files Structure**:

```
src/
├── context/
│   ├── PortfolioContext.tsx      # Provider component
│   └── PortfolioContextTypes.ts  # Context type definitions
├── hooks/
│   └── usePortfolio.ts           # Custom hook for consuming context
└── components/                   # All components use usePortfolio hook
```

This architecture ensures:

- No prop drilling
- Centralized data management
- Easy testing and mocking
- Better performance with memoized values

### CSS Guidelines

1. **Structure**:

   - Use CSS custom properties for colors, spacing, and typography
   - Follow mobile-first responsive design
   - Use flexbox and grid for layouts
   - Avoid !important declarations

2. **Naming**:

   - Use BEM methodology: `.block__element--modifier`
   - Component class names should match component names
   - Use semantic class names that describe function, not appearance

3. **Organization**:
   - Group related properties together
   - Use consistent spacing and indentation
   - Comment complex calculations or hacks

## Customization Instructions

To personalize this portfolio:

1. Edit `src/data/portfolioData.ts` with your information
2. Replace placeholder images in the `public/` directory
3. Update colors and styling in CSS files
4. Add your resume as `public/resume.pdf`

The portfolio is ready for deployment and can be easily customized for any front-end developer.

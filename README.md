# Recipe Finder Application

The **Recipe Finder Application** is a modern web application built with Next.js and TypeScript, leveraging the Spoonacular API to enable users to search, browse, and view detailed recipe information. Designed with a responsive UI and optimized performance, this project demonstrates best practices in server-side rendering, type safety, and code quality.

## Features

The application provides the following functionality:
- **Recipe Search**: Query recipes by ingredients, cuisine (e.g., Italian, Mexican), or maximum preparation time.
- **Recipe Browsing**: Display recipe cards with titles and images in a responsive grid layout.
- **Detailed Recipe Views**: Access comprehensive recipe details, including ingredients, servings, and preparation time.
- **Server-Side Rendering (SSR)**: Ensures fast page loads and SEO optimization for recipe lists and details.
- **Lazy Loading**: Utilizes React `Suspense` for efficient loading of `RecipeCard` and `RecipeDetailsContent` components.
- **Responsive Design**: Styled with Tailwind CSS for a consistent, mobile-friendly user experience.
- **Type Safety**: Implemented with TypeScript to enhance code reliability and maintainability.
- **Code Quality**: Enforced through ESLint (Next.js, TypeScript, and Prettier rules) and Prettier for consistent formatting.

## Getting Started

Follow these steps to set up, run, and build the application locally or for production.

### Prerequisites
- **Node.js**: Version 16 or later (18 recommended).
- **Spoonacular API Key**: Obtain a free key from [spoonacular.com](https://spoonacular.com/).
- **Code Editor**: Visual Studio Code or similar.
- **Terminal**: Command Prompt, PowerShell, or a Unix-compatible terminal (e.g., Git Bash).

### Installation
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/eom2204/recipe-finder-app.git
   cd find-your-recipe
   ```

   ** Instruction**:
   ```
   Terminal (Command Prompt):
   > git clone https://github.com/eom2204/recipe-finder-app.git
   > cd find-your-recipe
   ```

2. **Configure the API Key**:
   Create a `.env.local` file in the project root and add your Spoonacular API key:
   ```
   API_KEY=your_api_key_here
   ```

   **Instruction**:
   ```
   File Explorer:
   - find-your-recipe/
     - .env.local (new)
     - package.json
     - pages/
     - components/
   ```

### Running the Application
Start the development server:
```bash
npm run dev
```

Access the application at [http://localhost:3000](http://localhost:3000).

** Instruction**:
```
Terminal:
> npm run dev
Next.js development server started at http://localhost:3000
Browser:
Recipe Finder
- Search for recipes: [Input field]
- Cuisine: [Dropdown]
- Max preparation time: [Input field]
- [Next button]
Application loaded successfully.
```

### Building the Application
To create a production build:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

Access the production build at [http://localhost:3000](http://localhost:3000).

** Instruction**:
```
Terminal:
> npm run build
Building production assets...
Build completed. Output: .next/
> npm start
Production server running at http://localhost:3000
Browser:
Recipe Finder
Production application loaded.
```

## Code Quality

The project enforces consistent code quality using ESLint and Prettier:

- **Format Code**:
  ```bash
  npm run format
  ```
  Applies Prettier formatting.

- **Check Formatting**:
  ```bash
  npm run format:check
  ```
  Verifies Prettier compliance.

- **Lint Code**:
  ```bash
  npm run lint
  ```
  Runs ESLint with Next.js, TypeScript, and Prettier rules.

- **Fix Linting Issues**:
  ```bash
  npm run lint:fix
  ```
  Automatically resolves linting and formatting issues.

** Instruction**:
```
Terminal:
> npm run lint:fix
Processing files...
src/pages/index.tsx: Fixed 2 issues
src/components/RecipeCard.tsx: Fixed 1 issue
Linting complete. No remaining issues.
```
## Architecture

The application is built with a modern web development stack:

- **Next.js (Pages Router)**: Leverages the `pages/` directory for routing (`index.tsx`, `recipes/index.tsx`, `recipes/[id].tsx`). Uses `getServerSideProps` for server-side rendering of recipe data, optimizing performance and SEO.
- **TypeScript**: Ensures type safety with interfaces (e.g., `Recipe` and `RecipeDetails`) for robust data handling.
- **Tailwind CSS**: Provides utility-first styling for a responsive, maintainable UI.
- **React Suspense**: Enables lazy loading of `RecipeCard` and `RecipeDetailsContent` components to improve performance.
- **Spoonacular API**: Facilitates recipe search and detailed data retrieval via HTTP requests.
- **ESLint & Prettier**: Maintains code quality with customized rules in `.eslintrc.js` (e.g., disabled `react/react-in-jsx-scope`) and `.eslintignore` for excluding non-lintable files.
- **In-Memory Caching**: Implements a simple cache in `recipes/index.tsx` to reduce API calls for 60 seconds.

**Project Structure**:
```
find-your-recipe/
├── components/          # React components (RecipeCard, RecipeDetailsContent)
├── pages/               # Next.js routes (index, recipes, [id])
├── styles/              # Global styles (globals.css with Tailwind)
├── .env.local           # Environment variables (API key)
├── .eslintrc.js         # ESLint configuration
├── .eslintignore        # Linting exclusions
├── package.json         # Dependencies and scripts
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---
Developed by Olena Kryval
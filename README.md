<<<<<<< HEAD
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
=======
# lab-prog-app-web
# lab-prog-app-web
>>>>>>> b8499fa6509c0ecfa8e96fd45e35b2ba8016e2d7


🧩 (React Router)
📁 Projekty
/projekty – lista projektów

/projekty/:projektId – szczegóły projektu

/projekty/:projektId/edytuj – edycja projektu

/projekty/nowy – tworzenie nowego projektu

📘 Historie
/projekty/:projektId/historie – lista historii w projekcie

/projekty/:projektId/historie/nowa – dodaj historię do projektu

/projekty/:projektId/historie/:historiaId – szczegóły historii

/projekty/:projektId/historie/:historiaId/edytuj – edycja historii

✅ Zadania
/projekty/:projektId/historie/:historiaId/zadania – lista zadań

/projekty/:projektId/historie/:historiaId/zadania/nowe – nowe zadanie

/projekty/:projektId/historie/:historiaId/zadania/:zadanieId – szczegóły zadania

/projekty/:projektId/historie/:historiaId/zadania/:zadanieId/edytuj – edycja zadania

![alt text](./public/image.png)
# Public Promote

Are you facing challenges creating advertisements or finding participants for your questionnaire? This application prototype simplifies the process, allowing anyone to post their advertisements for free without creating accounts. To remove an advertisement, users simply delete it using the unique hash key provided upon posting.

This prototype is developed using React.ts, Next.UI, and Firebase.

## Demo
You can access the live prototype at ...

## Preview
Insert Advertisement <br/>
<img src="https://github.com/ricotandrio/public-promote/assets/119276763/8004d66a-a154-4194-9a05-02f22adb1b36" width="300" /> <br/>
Hash Code for Deleting Advertisement <br/> 
<img src="https://github.com/ricotandrio/public-promote/assets/119276763/a380cfe3-b13e-40ea-8257-c6914af94cf7" width="300" /> <br/>
Delete Advertisement <br/>
<img src="https://github.com/ricotandrio/public-promote/assets/119276763/000a30ef-62ef-4140-a11c-e8b0d102ce1b" width="300" /> <br/>

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
"# publicpromote" 

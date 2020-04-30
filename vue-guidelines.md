# Introduction
This project is bootstraped using vue-cli --typescript flag

# Folder structure

## root (/)
- All the config files including eslint, prettier, tsconfig babelConfig etc.
- ignore files like gitignore and lock files
- .env (dev, testing and prod)
- package.json

## .vscode
contains editor level settings for workspace
- settings.json
- vue.code-snippets

## public
This folder will contain index.html and favicon

## src
This is the folder which will hold all the code for the project

```
├── App.vue
├── assets
├── components
│   ├── ErrorBoundaryModal.vue
│   ├── ErrorBoundary.vue
│   └── TodoComponent.vue
├── main.ts
├── mixins
│   ├── mixinHelper.ts
│   └── todoMixin.ts
├── router
│   ├── config.ts
│   ├── constants.ts
│   ├── index.ts
│   ├── utils.spec.ts
│   └── utils.ts
├── services
│   └── api.ts
├── settings.ts
├── shared
│   ├── constants.ts
│   ├── enum.ts
│   └── interfaces.ts
├── shims-tsx.d.ts
├── shims-vue.d.ts
├── store
│   ├── constants.ts
│   ├── index.ts
│   ├── modules
│   │   ├── root
│   │   │   ├── index.ts
│   │   │   ├── rootActions.ts
│   │   │   └── rootGetters.ts
│   │   └── todo
│   │       ├── index.ts
│   │       ├── todoActions.ts
│   │       ├── todoGetters.ts
│   │       └── todoMutations.ts
│   ├── plugins
│   │   └── storeHelper.ts
│   ├── types
│   │   ├── storeHelper.d.ts
│   │   ├── storeHelperExtend.d.ts
│   │   └── storeHelperTypes.d.ts
│   └── utils.ts
└── views
    └── Home
        └── Home.vue
```

- main.ts is the entry point for the app
- App.vue is the root component of the app
- All the child components will be rendered from App.vue.
- settings.ts will hold the environment based app settings.
- 
- ## components
    - This folder will hold all the reusable components which are project specific. Please don't put global common components in this directory (ex. button, dropdown etc.)
    - Name convention for All the component files will be `PascalCase.vue`. 
    - Each vue component must have `two words` atleast. If its a single word name then add `Component` as suffix to make it `two word`.
    - These component will be used in views (which are actual routes)
    - These components will be registered and used in templates as `kebab-case`.
    - These components will be sfc(single file component) with a scoped style tag.

- ## assets
This directory will contain common styles and other static assets.These assets will be later served from `/static`.

- ## mixins
This directory contains mixin.ts files for various components. If needed create a sub directory to group further. The mixinHelper.ts should be at route level and component should extend from mixinHelper incase of mixin based components.

- ## router
This directory contains route related files. Try to lazy load as much possible.It will also have router specific util functions and tests.Use as much contants as possible.
`AVOID STRING LITERALS`

- ## services
This directory will have rest api related files.Here we can set Headers and baseUrl at global level for all request.

- ## shared
This directory will hold all the shared interfaces, enums, constants etc. which are used all over the application

- ## store
    - modules directory will have module level actions, getters, mutations and will export it to root module.
    - types contains files to help support suggestion in vue component.
    - plugins will use the type files
    - store can have contain constants, utils, interface, enums etc.
    ```https://medium.com/@cheungken/autocomplete-for-vuex-store-by-typescript-941724faddd0```

- ## views
    - This will contain folders for route level pages.
    - This can have mobile and desktop level vue components.
    - Each View (ex. Home) can be a folder with multiple `.vue` files. and mobile folder inside it to hold mobile views.
    - These components/views should be lazy loaded in most cases except the landing page.
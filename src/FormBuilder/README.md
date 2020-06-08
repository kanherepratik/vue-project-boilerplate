# Vue Form Builder Docs

## Features

```
 1. JSON to component converter
 2. Validations
 3. Ability to map props and events
 4. Ability to handle custom events and hooks
 5. [TBD Later] Ability to modify schema through UI

```

## Structure

```
├── componentMap.ts
├── form-components
│   ├── FormContainer.vue
│   ├── SubContainer.vue
│   └── WrapperComponent.vue
├── FormIndex.vue
├── interfaces
│   └── common.ts
├── README.md
├── signals.ts
└── utils.ts
```

## FormIndex

> This is the root of form-builder. It will hold the root level API's for interacting with form-builder. The parent component will render formIndex and pass the props for data and schema, listen to events.

### Props

| Props      | Type          | default |
| ---------- | ------------- | ------- |
| schema     | IFormSchema[] | []      |
| data       | object        | {}      |
| isLoading? | boolean       | false   |

## FormContainer

> This will contain multiple form fields or subContainer. Its the outermost unit of form-builder. It will also act as a step.

### Props

| Props      | Type               | default |
| ---------- | ------------------ | ------- |
| schema     | IContainerSchema[] | []      |
| data       | object             | {}      |
| isLoading? | boolean            | false   |

## SubContainer

> This is similar to formContainer with a difference being a formContainer can have multiple subContainers. These can be used to group some form fields.

### Props

| Props      | Type                  | default |
| ---------- | --------------------- | ------- |
| schema     | ISubContainerSchema[] | []      |
| data       | object                | {}      |
| isLoading? | boolean               | false   |

## WrapperComponent

> This will contain dynamically rendered components based for schema and data. This will act as an interface where we can write common logic and actions. This will leverage componentMap file to attach events and model data dynamically to the component.

### Events

| Event       | Description                          | params                 |
| ----------- | ------------------------------------ | ---------------------- |
| handleEvent | callback event for any type of event | event type/name, value |

### Props

| Props      | Type          | default |
| ---------- | ------------- | ------- |
| schema     | IFormSchema[] | []      |
| data       | object        | {}      |
| isLoading? | boolean       | false   |

## Roadmap

- [ ] Work on schema and contract of framework
- [ ] Decide schema of form builder
- [ ] Decide on events and hooks and implementation
- [ ] Decide on utils
- [ ] Build parse map to map backend json to components
- [ ] Build parser to parse backend json
- [ ] Implementation of above

## Todo Later

- [ ] Make subContainer more robust by adding functionality to control wrapperComponent inside it.
- [ ] Add functionality to show/hide/disable any field from outside based on ref (WIP).
- [ ] Autogenerate UI for customising form

## Things to remember

    1.	All functions to be pure functions
    2.	Less magic more obviousness

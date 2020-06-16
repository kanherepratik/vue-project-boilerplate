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
├── FormIndex.vue
├── README.md
├── config
│   └── componentMap.ts
├── dummyData.ts
├── form-components
│   ├── FormContainer.vue
│   ├── FormStepCounter.vue
│   ├── FormTabbedContainer.vue
│   ├── SubContainer.vue
│   └── WrapperComponent.vue
└── shared
    ├── interfaces.ts
    ├── signals.ts
    └── utils.ts
```

## FormIndex

> This is the root of form-builder. It will hold the root level API's for interacting with form-builder. The parent component will render formIndex and pass the props for data and schema, listen to events. It will render either of `formContainer` or `formTabbedContainer`

### Props

| Props      | Type          | default |
| ---------- | ------------- | ------- |
| schema     | IFormSchema[] | []      |
| data       | object        | {}      |
| isLoading? | boolean       | false   |

## Container

> Container can be of two types

- FormContainer
- FormTabbedContainer

### FormContainer

> This will contain multiple form fields or subContainer. Its the outermost unit of form-builder. It will also act as a step. A container will have form Buttons as well.

#### Props

| Props  | Type               | default |
| ------ | ------------------ | ------- |
| schema | IContainerSchema[] | []      |
| data   | object             | {}      |

### Util Methods

| Method      | description                                               | return value |
| ----------- | --------------------------------------------------------- | ------------ |
| getFieldRef | This will return the ref of subContainer/wrapperComponent | any          |
| isValid     | This will check validity                                  | boolean      |

### FormTabbedContainer

> This will contain multiple subContainers in tabbed manner. Its the outermost unit of form-builder.

#### Props

| Props  | Type               | default |
| ------ | ------------------ | ------- |
| schema | IContainerSchema[] | []      |
| data   | object             | {}      |
| value  | string             | ''      |

### Util Methods

| Method      | description                                               | return value |
| ----------- | --------------------------------------------------------- | ------------ |
| getFieldRef | This will return the ref of subContainer/wrapperComponent | any          |
| isValid     | This will check validity of subContainer                  | boolean      |

## SubContainer

> This is similar to formContainer with a difference being a formContainer can have multiple subContainers. These can be used to group some form fields.

### Props

| Props  | Type                  | default |
| ------ | --------------------- | ------- |
| schema | ISubContainerSchema[] | []      |
| data   | object                | {}      |

### Util Methods

| Method              | description                                                      | return value |
| ------------------- | ---------------------------------------------------------------- | ------------ |
| showSubContainer    | This will unhide the subContainer if already hidden              | void         |
| hideSubContainer    | This will hide the subContainer                                  | void         |
| disableSubContainer | This will disable the subContainer                               | void         |
| getFieldRef         | This will return the ref of wrapperComponent inside subContainer | any          |
| isValid             | This will check validity of wrapperComponent inside subContainer | boolean      |

## WrapperComponent

> This will contain dynamically rendered components based for schema and data. This will act as an interface where we can write common logic and actions. This will leverage componentMap file to attach events and model data dynamically to the component.

### Events

| Event       | Description                          | params                 |
| ----------- | ------------------------------------ | ---------------------- |
| handleEvent | callback event for any type of event | event type/name, value |

### Props

| Props  | Type          | default |
| ------ | ------------- | ------- |
| schema | IFormSchema[] | []      |
| data   | object        | {}      |

### Util Methods

| Method       | description                                  | return value |
| ------------ | -------------------------------------------- | ------------ |
| showField    | This will unhide the field if already hidden | void         |
| hideField    | This will hide the field                     | void         |
| disableField | This will disable the field                  | void         |
| getValue     | This will return the value of field          | any          |
| getFieldRef  | This will return the ref of component        | any          |
| isValid      | This will check validity                     | boolean      |

## Roadmap

- [ ] Work on schema and contract of framework
- [ ] Decide schema of form builder
- [ ] Decide on events and hooks and implementation
- [ ] Decide on utils
- [ ] Build parse map to map backend json to components
- [ ] Build parser to parse backend json
- [ ] Implementation of above

## Stepper Form

> To show the form in steppered manner, this component takes steps as props.

```
ISteps:
name: string;
  component: formContainer;
  icon?: string;
  title?: string;
  subtitle?: string;
  completed?: boolean;
```

## Todo Later

- [ ] Make subContainer more robust by adding functionality to control wrapperComponent inside it.
- [ ] Add functionality to show/hide/disable any field from outside based on ref (WIP).
- [ ] Autogenerate UI for customising form

## Things to remember

    1.	All functions to be pure functions
    2.	Less magic more obviousness

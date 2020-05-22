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
	- App (Custom Implementation)
		- Form
			- Form Step Counter
				- Form Container
					- Component Wrapper
						- Component
			
		
```
 

## Signature
### Form
```
	schema: Object[]
	data: Object
	events: Object[]
	validations: Object[]
	activeStep: boolean | string
	@onSubmit: () => void
	@onStepChange: () => void
	@onValueChange: () => void
	@isValid: () => void
	
```
### Form Step Counter
```
	steps: IStep[] => {
		id: string | number
		label: string
		index: number
	}
	activeStep: IStep.id
	@onStepChange: (IStep) => void
```
### Form Container
```
	children: IWrapperComponent[]
	validations: Object[]
	@onSubmit: () => void
	@onBack: () => void
	@isValid: () => void
```
### Component Wrapper

### Component



## Roadmap

 - [ ] Work on schema and contract of framework
 - [ ] Decide schema of form builder
 - [ ] Decide on events and hooks and implementation
 - [ ] Decide on utils 
 - [ ] Build parse map to map backend json to components
 - [ ] Build parser to parse backend json
 - [ ] Implementation of above

## Todo Later

 - [ ] Autogenerate UI for customising form 

## Things to remember
	1.	All functions to be pure functions
	2.	Less magic more obviousness
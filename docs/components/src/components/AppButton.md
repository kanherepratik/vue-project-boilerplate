# AppButton

## Props

| Prop name        | Description                            | Type    | Values                     | Default                 |
| ---------------- | -------------------------------------- | ------- | -------------------------- | ----------------------- |
| disabled         | The state of the button                | boolean | `true`, `false`            | false                   |
| size             | The size of the button                 | string  | `small`, `large`, `normal` | 'normal'                |
| customCssClasses | An array of classes to apply on button | array   | -                          | (): Array<string> => [] |

## Methods

### emitClick

> Gets called when the user clicks on the button

#### Return

| Type | Description |
| ---- | ----------- |
| void |             |

## Events

| Event name | Type | Description  |
| ---------- | ---- | ------------ |
| click      |      | click event. |

## Slots

| Name    | Description                   | Bindings |
| ------- | ----------------------------- | -------- |
| default | Use this slot for button name |          |

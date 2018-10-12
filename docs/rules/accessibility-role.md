# Enforce valid accessibilityRole prop

The [Accessibility Role](https://facebook.github.io/react-native/docs/accessibility#accessibilityrole-ios-android) tells a person using either VoiceOver on iOS or TalkBack on Android the type of element that is focused on.
This is an important accessibility feature and is necessary for communicating to the screen reader that, for instance, a button is in fact a button.

By default, this rule enforces that all Touchable components have a valid accessibilityRole role.
Through the options you can configure which components to check and whether to enforce the existence of `accessibilityRole` on these components.

## Rule Details

The following patterns are considered warnings:

```js
<TouchableOpacity />;
```

```js
<TouchableOpacity accessibilityRole="invalid role" />;
```


The following patterns are not considered warnings:

```js
<TouchableOpacity accessibilityRole="button" />;
```

```js
  <View />;
```

## Rule Options

```js
"react-native/accessibility-role": [<enabled>, { "enforceExistence": <boolean>, "components": <[string]> }]
```

### `enforceExistence`

Whether to enforce the existence of the `accessibilityRole` prop on the components. Default `true`.


The following patterns are considered warnings:

```jsx
// [1, { "enforceExistence": true }]
<TouchableOpacity />;
```

The following patterns are **not** considered warnings:

```jsx
// [1, { "enforceExistence": false }]
<TouchableOpacity />;
```

### `components`
The names of components to check for valid `accessibilityRole`. Defaults to `['TouchableHighlight', 'TouchableNativeFeedback', 'TouchableOpacity', 'TouchableWithoutFeedback']`.

The following patterns are considered warnings:

```jsx
// [1, { "components": ['View'] }]
<View />;
```

The following patterns are **not** considered warnings:

```jsx
// [1, { "components": ['View'] }]
<TouchableOpacity />;
```

```jsx
// [1, { "components": ['View'] }]
<View accessibilityRole="invalid role" />;
```

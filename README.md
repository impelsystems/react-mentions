# Forked from react-mentions package.

React mentions input, fork from react-mentions with some additional customisation functionality for custom add mention calls, and suggestion keyboard override.

The idea of these changes are to permit customised suggestions menus, drill-in multiple level mentions and ultimately add mentions for items that are not in the 
flat data structure supported as standard. A PR is intended once the additions are mature.

The `MentionsInput` supports the following additional props:

| Prop name                   | Type                                                    | Default value  | Description                                                                                  |
| --------------------------- | ------------------------------------------------------- | -------------- | ---------------------------------------------------------------------------------------------|
| onKeyDownOverride           | function (event, { mutateState, state, ... })           | undefined      | Override onKeyDown events within the suggestions menu                                        |
| keyDownOverrideTriggerCodes | object                                                  | undefined      | Object containing name/keyCode's to trigger onKeyDownOverride when pressed within suggestions|
| onClearSuggestions          | function ({ mutateState, state })                       | undefined      | Called when the suggestions menu is closed without any selection from the user               |

# [React Mentions](https://www.npmjs.com/package/react-mentions)

Source package here https://www.npmjs.com/package/react-mentions, all credit and thanks to the authors.
# Forked from react-mentions package.

React mentions input, fork from react-mentions with some additional customisation functionality for custom add mention calls, and suggestion keyboard override.

The idea of these changes are to permit customised suggestions menus, drill-in multiple level mentions and ultimately add mentions for items that are not in the 
flat data structure supported as standard. A PR is intended once the additions are mature.

The `MentionsInput` supports the following additional props:

| Prop name                   | Type                                                      | Default value  | Description                                                                                                   |
| --------------------------- | --------------------------------------------------------- | -------------- | --------------------------------------------------------------------------------------------------------------|
| onKeyDownOverride           | function (event, { mutateState, state, addMention, ...* })| undefined      | Override onKeyDown events within the suggestions menu, passes functions for mutating state and adding mentions|
| keyDownOverrideTriggerCodes | object                                                    | undefined      | Object containing name/keyCode's to trigger onKeyDownOverride when pressed within suggestions                 |
| onClearSuggestions          | function ()                                               | undefined      | Called when the suggestions menu is closed without any selection from the user                                |

`onKeyDownOverride` is passed the following additional functions provided by react-mentions for custom key handling to provide standard support.

* `clearSuggestions()` closes the suggestions list without any selection
* `shiftFocus(delta)` where delta increments/decrements the currently focused root suggestion item e.g. `shiftFocus(-1)`
* `selectFocused()` selects the currently focused root suggestion 

For any custom operation or sub-menu suggestions you should manually handle using the following.

* `mutateState((updater, callback) => ...)` effectively a pass through to the MentionInput setState function
* `state` is the current MentionInput state object
* `addMention({ id, display }, queryInfo)` pass through of MentionInput addMention function

# [React Mentions](https://www.npmjs.com/package/react-mentions)

Source package here https://www.npmjs.com/package/react-mentions, all credit and thanks to the authors.
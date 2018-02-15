# react-inline-predict

A simple and customizable React component to show inline predictive text based on user input and a dictionary.

![Example](https://i.imgur.com/2vfoumW.gif)

- Start writing to see suggestions
- Use ```Tab``` to autocomplete
- Use ```Up``` and ```Down``` arrows to navigate suggestions

## Installation

To install, you can use [npm](https://npmjs.org/):

    $ npm install --save react-inline-predict

## Usage

The component is inserted in place of your normal [Input] field, passing all the props that you would normally pass.

- type
- name
- placeholder
- onChange
- onKeyPress
- ...

Example:

```jsx
<InputPredict
  type="text"
  name="name"
  placeholder="colorname"
  onChange={this.handleNameInputChange} />
```

To Enable the prediction, you'll have to pass one of two additional props; ```dictionary``` or ```suggestion```.

### Using an Array

If you pass an array to the component through the prop ```dictionary```, the component will search through the array to find the best matches starting with the user's input.

```jsx
<InputPredict
  type="text"
  name="name"
  placeholder="colorname"
  onChange={this.handleNameInputChange}
  dictionary={["kiwi", "oranges", "watermelon", "pineapple"]} />
```

### Manually

If you want to handle the prediction in any other way, via an API, or in a particular way, you can process the user's input using the ```onChange``` hook, and then pass the prediction through the prop ```suggestion```

```jsx
handleNameInputChange(e) {
  const prediction = getPredicitionByAnyMeansNecessary(e.target.value);
  this.setState({prediction: prediction});
}
```

```
...
```

```jsx
<InputPredict
  type="text"
  name="name"
  placeholder="colorname"
  onChange={this.handleNameInputChange}
  suggestion={this.state.prediction} />
```

## Styles

Styles can be passed inline through the two props ```inputStyle``` and ```suggestionStyle```.

```jsx
<InputPredict
  type="text"
  name="name"
  placeholder="colorname"
  onChange={this.handleNameInputChange}
  suggestion={this.state.prediction}
  inputStyle={{ color: "darkgrey" }}			// Style for the text input field
  suggestionStyle={{ color: "lightgrey" }} />	// Style for the suggestion text field
```

Alternatively, you can add css properties to the classes used internally by the component;

```css
.input-predict-container {
  font-family: "Raleway";
}

.input-predict-input {
  color: black;
}

.input-predict-suggestion {
  color: lightgrey;
}
```

Keep in mind that there are default styles that are important for the functionality of the component, and passing the styles inline via props overrides that.

```jsx
// Default Styles
inputStyle = {
  background: "transparent",
  zIndex: "0"
},
suggestionStyle = {
  position: "absolute",
  top: "0",
  background: "transparent",
  zIndex: "-1"
}
```

## Notes

This component is completely isomorphic; it's perfectly safe to use with server-side rendering.
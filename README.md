# @mizchi/wc-helpers

My experimental helpers

```
yarn add @mizchi/wc-helpers
```

## Example

```tsx
import {
  vueElementFactory,
  reactElementFactory,
  encodeProps
} from "@mizchi/wc-helpers";

// Plain React Component
import React from "react";
class MyReactApp extends React.PureComponent<{ a: string }> {
  render() {
    return React.createElement("p", null, `react: ${this.props.a}`);
  }
}

// Plain Vue Component
import Vue from "vue";
import Component from "vue-class-component";
@Component({
  props: ["a"]
})
class MyVueApp extends Vue {
  render(h) {
    return h("p", `vue: ${this.$props.a}`);
  }
}

// register
customElements.define("my-react-component", reactElementFactory(MyReactApp));
customElements.define("my-vue-component", vueElementFactory(MyVueApp));

// run
const state = { a: 0 };
const encoded = encodeProps(state);
document.body.innerHTML = `
  <my-react-component data-props="${encoded}"></my-react-component>
  <my-vue-component data-props="${encoded}"></my-vue-component>
`;
```

## Nested demo

![](https://gyazo.com/0adabb600dd507db2ac02919ea23a02f.gif)

## How to dev

- `yarn build`: Generate `index.js`

## LICENSE

MIT

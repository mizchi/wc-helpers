# @mizchi/wc-helpers

My experimental helpers

```
yarn add @mizchi/wc-helpers
```

## Examples

```tsx
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
import {
  vueElementFactory,
  reactElementFactory,
  encodeProps
} from "<this code>";
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

## How to dev

- `yarn dev`: Start application server on `http://localhost:1234`
- `yarn build`: Generate `dist`
- `yarn test`: Run jest
- `yarn deploy`: Deploy to netlify (need netlify account)

## LICENSE

MIT

import Vue from "vue";
import Component from "vue-class-component";
import React from "react";
import { vueElementFactory, reactElementFactory, encodeProps } from "..";

// Vue
@Component({
  props: ["depth"]
})
class MyVueApp extends Vue {
  now: number = Date.now();
  render(h: any) {
    const depth = parseInt(this.$props.depth, 10);
    if (depth > 0) {
      return h(
        "div",
        {
          style: {
            paddingLeft: "10px",
            backgroundColor: "rgba(0, 255, 0, 0.3)"
          }
        },
        [
          h("p", {}, `vue: ${depth} createdAt:${this.now}`),
          h("my-react-component", {
            attrs: {
              "data-props": encodeProps({ depth: depth - 1 })
            }
          })
        ]
      );
    } else {
      return h(
        "p",
        {
          style: {
            paddingLeft: "10px",
            backgroundColor: "rgba(0, 255, 0, 0.3)"
          }
        },
        `vue: 0 - createtAt:${this.now}`
      );
    }
  }
}
customElements.define("my-vue-component", vueElementFactory(MyVueApp));

// React
class MyReactApp extends React.PureComponent<{ depth: string }> {
  now: number = Date.now();
  render() {
    const h = React.createElement;
    const depth = parseInt(this.props.depth, 10);
    if (depth > 0) {
      return h(
        "div",
        {
          style: {
            paddingLeft: "10px",
            backgroundColor: "rgba(255, 0, 0, 0.3)"
          }
        },
        h("p", {}, `react: ${depth} createdAt: ${this.now}`),
        h("my-vue-component", {
          "data-props": encodeProps({ depth: depth - 1 })
        })
      );
    } else {
      return h(
        "p",
        {
          style: {
            paddingLeft: "10px",
            backgroundColor: "rgba(255, 0, 0, 0.3)"
          }
        },
        "react 0: createdAt " + this.now
      );
    }
  }
}
customElements.define("my-react-component", reactElementFactory(MyReactApp));

// run
// const root = document.querySelector(".root");

let state = { depth: 4 };
const entry = document.createElement("my-react-component");
entry.setAttribute("data-props", state.depth.toString());
document.body.appendChild(entry);

setInterval(() => {
  state = { depth: state.depth + 1 };
  entry.setAttribute(
    "data-props",
    encodeProps({ depth: (state.depth % 6) + 3 })
  );
}, 1000);

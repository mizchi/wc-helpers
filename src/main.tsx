import Vue from "vue";
import Component from "vue-class-component";
import isEqual from "lodash.isequal";

function encodeProps(obj: any) {
  return encodeURIComponent(JSON.stringify(obj));
}

function decodeProps(str: string): Object {
  return JSON.parse(unescape(str));
}

const vueElementFactory = (VueComponent: any) =>
  class VueElement extends HTMLElement {
    _props: any = null;
    _vue: any;
    _el: any;
    static get observedAttributes() {
      return ["props"];
    }

    constructor() {
      super();
      const str = (this.dataset as any).props;
      this._props = decodeProps(str);
      this._el = document.createElement("div");
      this.appendChild(this._el);
      this.render();
    }

    attributeChangedCallback() {
      const str = (this.dataset as any).props;
      const newProps = decodeProps(str);
      if (this._props != null && !isEqual(this._props, newProps)) {
        this._props = newProps;
        this.render();
      }
    }

    render() {
      const props = this._props;
      this._vue = new Vue({
        el: this._el,
        render(h) {
          return h(VueComponent, { props });
        }
      });
    }
  };

@Component({
  props: ["a"]
})
class MyApp extends Vue {
  render(h: any) {
    return <p>foo: {this.$props.a}</p>;
  }
}

// use
customElements.define("x-vue-app", vueElementFactory(MyApp));

// run
const root = document.querySelector(".root");
if (root) {
  const state = { a: 1 };
  const e = encodeProps(state);
  console.log("decoded", decodeProps(e));
  root.innerHTML = `<x-vue-app class="app" data-props="${e}" />`;

  setInterval(() => {
    const el: any = document.querySelector(".app");

    state.a += 1;
    // debugger;
    if (el) {
      // el.dataset.props = encodeProps(state);
      el.setAttribute("props", encodeProps(state));
      console.log("state", state);
    }
  }, 1000);
}

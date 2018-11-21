import Vue from "vue";
import * as React from "react";
import * as ReactDOM from "react-dom";
import isEqual from "lodash.isequal";

type Option = {
  decoder?: (str: string) => any;
  comparator?: (a: any, b: any) => boolean;
};

export const reactElementFactory = (
  ReactComponent: any,
  { decoder = decodeProps, comparator = isEqual }: Option = {}
) => {
  return class ReactElement extends HTMLElement {
    _current: any = null;
    _el: any;

    static get observedAttributes() {
      return ["data-props"];
    }

    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }

    readProps() {
      const str = (this.dataset as any).props;
      return decoder(str);
    }

    render() {
      ReactDOM.render(
        React.createElement(ReactComponent, this._current) as any,
        this.shadowRoot as any
      );
    }

    connectedCallback() {
      this._current = this.readProps();
      this.render();
    }

    attributeChangedCallback() {
      const newProps = this.readProps();
      if (!comparator(this._current, newProps)) {
        this._current = newProps;
        this.render();
      }
    }
  };
};

export const vueElementFactory = (
  VueComponent: any,
  { decoder = decodeProps, comparator = isEqual }: Option = {}
) => {
  return class VueElement extends HTMLElement {
    _current: any = null;
    _vm: any;
    _el: any;

    static get observedAttributes() {
      return ["data-props"];
    }

    constructor() {
      super();
      const shadowRoot = this.attachShadow({ mode: "open" });
      this._el = document.createElement("div"); // to replace
      shadowRoot.appendChild(this._el);
    }

    readProps() {
      const str = (this.dataset as any).props;
      return decoder(str);
    }

    connectedCallback() {
      this._current = this.readProps();
      this.render();
    }

    render() {
      if (this._vm == null) {
        this._vm = new Vue({
          el: this._el,
          data: {
            inner: this._current
          },
          render(h) {
            return h(VueComponent, { props: this.inner });
          }
        });
      } else {
        this._vm.inner = this._current;
      }
    }

    attributeChangedCallback() {
      const newProps = this.readProps();
      if (!comparator(this._current, newProps)) {
        this._current = newProps;
        this.render();
      }
    }
  };
};

export function encodeProps(obj: any) {
  return encodeURIComponent(JSON.stringify(obj).replace(/</g, "\\u003c"));
}

export function decodeProps(str: string): Object {
  return JSON.parse(unescape(str));
}

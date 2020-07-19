import { ComponentChild as Child, Props } from "./typings/index";

function createElement(tag: string, props?: Props, ...children: Child[]) {
  return {
    tag,
    props: {
      ...props,
      children: children.map((child) =>
        typeof child === "object" ? child : createTextElement(child)
      ),
    },
  };
}

function createTextElement(text: string | number | boolean) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

export { createElement };

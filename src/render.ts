import { ClassComponent, FunctionComponent, PufferNode } from "./typings/index";

export function render(element: PufferNode, container) {
  if (typeof element.type === "function") {
    if (element.type.prototype?.constructor) {
      const c = new (element.type.constructor as ClassComponent)(element.props);
      const vn = c.render();
      return render(vn, container);
    } else {
      return render(
        (element.type as FunctionComponent)(element.props),
        container
      );
    }
  }
  const dom =
    element.type == "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(element.type);

  // Assign element props to the DOM
  const isProperty = (key) => key !== "children";
  Object.keys(element.props)
    .filter(isProperty)
    .forEach((name) => {
      if (name == "style" && typeof element.props[name] === "object") {
        // Object.assign(dom.style, element.props.style)
        Object.keys(element.props[name]).forEach((styleName) => {
          if ("style" in dom)
            dom.style[styleName] = element.props.style[styleName];
        });
      } else {
        dom[name] = element.props[name];
      }
    });

  element.props.children.forEach((child) => render(child, dom));

  container.appendChild(dom);
}

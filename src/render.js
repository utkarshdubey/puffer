export function render(element, container) {
    if (typeof element.type === "function"){
      if(element.prototype && element.prototype.render){
        const c = new element.type(element.props);
        const vn = c.render;
        return render(vn, container);
      } else{
        return render(element.type(element.props), container);
      }
    }
    const dom =
      element.type == "TEXT_ELEMENT"
        ? document.createTextNode("")
        : document.createElement(element.type);
 
    // Assign element props to the DOm 
    const isProperty = (key) => key !== "children";
    Object.keys(element.props)
      .filter(isProperty)
      .forEach((name) => {
        if(name == "style" && typeof element.props[name] === "object"){
          // Object.assign(dom.style, element.props.style)
          Object.keys(element.props[name])
          .forEach(styleName => {
            dom.style[styleName] = element.props.style[styleName];
          })
        } else{
          dom[name] = element.props[name];
        }
        
      });
  
    element.props.children.forEach((child) => render(child, dom));
  
    container.appendChild(dom);
  }

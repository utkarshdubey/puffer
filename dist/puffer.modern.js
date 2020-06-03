function e(e, p, ...t) {
  return {
    type: e,
    props: {
      ...p,
      children: t.map((e) =>
        "object" == typeof e
          ? e
          : { type: "TEXT_ELEMENT", props: { nodeValue: e, children: [] } }
      ),
    },
  };
}
function p(e, t) {
  const o =
    "TEXT_ELEMENT" == e.type
      ? document.createTextNode("")
      : document.createElement(e.type);
  Object.keys(e.props)
    .filter((e) => "children" !== e)
    .forEach((p) => {
      o[p] = e.props[p];
    }),
    e.props.children.forEach((e) => p(e, o)),
    t.appendChild(o);
}
export { e as createElement, p as render };
//# sourceMappingURL=puffer.modern.js.map

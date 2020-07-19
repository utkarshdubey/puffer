import { JSXInternal } from "./jsx";
import { Component } from "../component";

export type RenderedDom = UIElement;
export type EventListenerDict = JSXInternal.DOMEvents<EventTarget>;

export interface PufferNode<R = any> {
  type?: string;
  // json injection prevention
  constructor: undefined;
  props: Props;
  key: any;
  // ref
  ref: ((val: R) => void) | { current: R };
  // dom rendered can be `Element` or `Text`
  _dom: RenderedDom;
  // normalized props.children
  _children: (PufferNode | null)[];
  // instance of the component that rendered this vnode
  _component: Component;
  // if our class/function/fragment returns multiple dom, collect them here
  // _domChildren:
  // // document fragment for when our component returns an array of children
  // _docFrag: DocumentFragment;
  // these are returned by function/class components
  _renders: PufferNode<any>;
  // which class component return this vnode
  _renderedBy: PufferNode<any>;

  // passes the depth arg to the component
  _depth: number;
  // parentDom node -> to call append child on if we can not reorder
  _parentDom: HTMLElement;
}

export type TagName = string; // ComponentConstructor | FunctionComponent;

export interface ComponentConstructor {
  new (props: Props): Component;
  prototype: Component;

  getDerivedStateFromProps?(
    props: Readonly<object>,
    state: Readonly<object>
  ): object | null;
}
export interface FunctionComponent {
  (props: Props): PufferNode<any> | null;
}

export type setStateArgType<P, S, K extends keyof S> =
  | ((
      prevState: Readonly<S>,
      props: Readonly<P>
    ) => Pick<S, K> | Partial<S> | null)
  | (Pick<S, K> | Partial<S> | null);

export type Props = Readonly<
  { children?: ComponentChild[] } & JSXInternal.DOMEvents<EventTarget> &
    JSXInternal.HTMLAttributes &
    Record<string, any>
>;

export type ComponentChild =
  | PufferNode<any>
  | object
  | string
  | number
  | boolean
  | null
  | undefined;

export interface UIElement extends HTMLElement {
  _events?: Partial<
    Record<keyof JSXInternal.DOMEvents<any>, JSXInternal.EventHandler<any>>
  >;
  _VNode?: PufferNode;
  data?: string | number;
}

export interface VNodeHost extends HTMLElement {
  _hosts?: PufferNode;
}

export type DiffMeta = {
  depth: number;
  batch: DOMOps[];
  isSvg: boolean;
  next?: UIElement;
};

export type HookInternal = { currentComponent: Component };

export interface DOMOps {
  node: UIElement;
  action:
    | 1 // BATCH_MODE_SET_ATTRIBUTE | BATCH_MODE_REMOVE_ATTRIBUTE
    | 2 // BATCH_MODE_REMOVE_ELEMENT
    | 3 // BATCH_MODE_SET_STYLE
    | 4 // BATCH_MODE_PLACE_NODE
    | 5 //  BATCH_MODE_SET_SVG_ATTRIBUTE
    | 6 // BATCH_MODE_REMOVE_ATTRIBUTE_NS
    | 7; // BATCH_MODE_REMOVE_POINTERS
  refDom?: HTMLElement;
  VNode?: PufferNode;
  attr?: string;
  value?: any;
}

type ReadonlyVNodeProps =
  | "constructor"
  | "type"
  | "props"
  | "key"
  | "ref"
  | "_children"
  | "_depth";

export type WritableProps = Exclude<keyof PufferNode, ReadonlyVNodeProps>;

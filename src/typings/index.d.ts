import type { JSXInternal } from "./jsx";
import type Component from "../component";

export type RenderedDom = UIElement;
export type EventListenerDict = JSXInternal.DOMEvents<EventTarget>;

export interface PufferNode {
  type: ClassComponent | FunctionComponent | string;
  props: Props;
  dom?: RenderedDom;
  children?: PufferNode[];
  sibling?: PufferNode;
  parent?: HTMLElement;
}

export type Props = Readonly<
  { children?: ComponentChild[] } & JSXInternal.DOMEvents<EventTarget> &
    JSXInternal.HTMLAttributes &
    Record<string, any>
>;

export type ComponentChild =
  | PufferNode
  | object
  | string
  | number
  | boolean
  | null
  | undefined;

export interface ClassComponent<P = {}> {
  new (props: P): Component;
  prototype: Component;

  render(): PufferNode;

  getDerivedStateFromProps?(
    props: Readonly<object>,
    state: Readonly<object>
  ): object | null;
}

export interface FunctionComponent {
  (props: Props): PufferNode;
}

//#region deprecated/unused
/**
 * @deprecated
 * Upate the types before you use this inteface
 * This interface will be deleted if not used in near future
 */
export type setStateArgType<P, S, K extends keyof S> =
  | ((
      prevState: Readonly<S>,
      props: Readonly<P>
    ) => Pick<S, K> | Partial<S> | null)
  | (Pick<S, K> | Partial<S> | null);

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

export type HookInternal = { currentComponent: Component };

export type DiffMeta = {
  depth: number;
  batch: DOMOps[];
  isSvg: boolean;
  next?: UIElement;
};

type ReadonlyVNodeProps =
  | "constructor"
  | "type"
  | "props"
  | "key"
  | "ref"
  | "_children"
  | "_depth";

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

export type WritableProps = Exclude<keyof PufferNode, ReadonlyVNodeProps>;
//#endregion deprecated/unused

import { DOMAttributes, JSXInternal } from "./jsx";

export interface VNode<P = {}, R = any> {
    type?: string | ComponentType<P>;
    // json injection prevention
    constructor: undefined;
    props: Props<P>;
    key: any;
    // ref
    ref: ((val: R) => void) | { current: R };
    // dom rendered can be `Element` or `Text`
    _dom: RenderedDom;
    // normalized props.children
    _children: (VNode | null)[];
    // instance of the component that rendered this vnode
    _component: Component<P>;
    // if our class/function/fragment returns multiple dom, collect them here
    // _domChildren:
    // // document fragment for when our component returns an array of children
    // _docFrag: DocumentFragment;
    // these are returned by function/class components
    _renders: VNode<any>;
    // which class component return this vnode
    _renderedBy: VNode<any>;
  
    // passes the depth arg to the component
    _depth: number;
    // parentDom node -> to call append child on if we can not reorder
    _parentDom: HTMLElement;
}
  
export type State = {

}

export type ComponentChild =
    | VNode<any>
    | object
    | string
    | number
    | boolean
    | null
    | undefined;

export type Props<P> = Readonly<{
    children?: ComponentChild[],
    [key:string]: any;
}>;

    
export type IProps<P> = Readonly<
	  { children?: ComponentChild[] } & JSXInternal.EventHandler<EventTarget> &
	    DOMAttributes<T> &
	    Record<string, any> &
	    P
>;
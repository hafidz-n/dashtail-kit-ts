// Global type declarations for dashtail-kit

declare module "cleave.js/react" {
  import { Component } from "react";
  export default class Cleave extends Component<any, any> {}
}

declare module "react-flatpickr" {
  import { Component } from "react";
  export default class Flatpickr extends Component<any, any> {}
}

declare module "react-quilljs" {
  export function useQuill(options?: any): any;
}

declare module "simplebar-react" {
  import { Component } from "react";
  export default class SimpleBar extends Component<any, any> {}
}

declare module "rc-tree" {
  import { Component } from "react";
  export default class Tree extends Component<any, any> {}
}

declare module "google-map-react" {
  import { Component } from "react";
  export default class GoogleMapReact extends Component<any, any> {}
}

declare module "react-shepherd" {
  export function useShepherd(): any;
  export const ShepherdTour: any;
  export const ShepherdTourContext: any;
}

declare module "@south-paw/react-vector-maps" {
  export const WorldLow: any;
  export function VectorMap(props: any): JSX.Element;
}

declare module "dagre" {
  const dagre: any;
  export default dagre;
}

declare module "@emoji-mart/react" {
  export default function Picker(props: any): JSX.Element;
}

declare module "@emoji-mart/data" {
  const data: any;
  export default data;
}

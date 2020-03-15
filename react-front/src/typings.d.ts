declare module '*/vendors.js';

declare module "*.png" {
  const value: any;
  export = value;
}

declare module 'remark-math';

declare module 'react-katex' {
  const InlineMath: any;
  const BlockMath: any;
  export { InlineMath, BlockMath };
}

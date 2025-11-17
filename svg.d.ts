declare module '*.svg' {
  const src: string;
  export default src;
}

declare module '*.svg?react' {
  import type { ReactElement, SVGProps } from 'react';
  const SvgComponent: (props: SVGProps<SVGSVGElement>) => ReactElement;
  export default SvgComponent;
}
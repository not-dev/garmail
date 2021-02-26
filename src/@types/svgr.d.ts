declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent: React.FunctionComponent<React.SVGProps<
    SVGSVGElement
  > & { title?: string }>;

  const src: React.FC<React.SVGProps<SVGSVGElement>>;
  export default src;
}

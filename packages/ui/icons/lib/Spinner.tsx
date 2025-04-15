import type { SVGProps } from 'react';
import * as React from 'react';

function Spinner(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns={ 'http://www.w3.org/2000/svg' } width={ 24 } height={ 24 } viewBox={ '0 0 24 24' } { ...props }>
      <path fill={ 'none' } d={ 'M0 0h24v24H0z' } />
      <path fill={ 'currentColor' } d={ 'M10.14 1.16a11 11 0 0 0-9 8.92A1.59 1.59 0 0 0 2.46 12a1.52 1.52 0 0 0 1.65-1.3 8 8 0 0 1 6.66-6.61A1.42 1.42 0 0 0 12 2.69a1.57 1.57 0 0 0-1.86-1.53' }><animateTransform attributeName={ 'transform' } dur={ '0.75s' } repeatCount={ 'indefinite' } type={ 'rotate' } values={ '0 12 12;360 12 12' } /></path>
    </svg>
  );
}
export default Spinner;

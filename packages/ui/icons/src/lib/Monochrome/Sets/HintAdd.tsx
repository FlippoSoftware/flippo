import type { SVGProps } from 'react';
import * as React from 'react';

function HintAdd(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns={ 'http://www.w3.org/2000/svg' } width={ 24 } height={ 24 } fill={ 'none' } viewBox={ '0 0 24 24' } { ...props }>
      <g fill={ 'currentColor' }>
        <path d={ 'M10 18q-.825 0-1.412-.587A1.93 1.93 0 0 1 8 16v-1.25a6.7 6.7 0 0 1-2.212-2.5A7 7 0 0 1 5 9q0-2.925 2.038-4.962T12 2q2.925 0 4.963 2.038Q19.003 6.078 19 9a6.9 6.9 0 0 1-.788 3.238A6.96 6.96 0 0 1 16 14.75V16q0 .825-.587 1.413A1.92 1.92 0 0 1 14 18zm0-2h4v-1.775q0-.25.113-.475a.86.86 0 0 1 .312-.35l.425-.3a4.8 4.8 0 0 0 1.588-1.787A4.95 4.95 0 0 0 17 9q0-2.075-1.463-3.537Q14.075 4.001 12 4 9.925 4 8.463 5.463 7 6.927 7 9q0 1.226.563 2.313A4.8 4.8 0 0 0 9.15 13.1l.425.3q.2.125.313.35t.112.475zm0 6a.97.97 0 0 1-.712-.288A.97.97 0 0 1 9 21q0-.424.288-.712A.97.97 0 0 1 10 20h4q.425 0 .713.288T15 21t-.288.713A.96.96 0 0 1 14 22z' } />
        <path d={ 'M11 11v-1h-1a.96.96 0 0 1-.712-.287A.97.97 0 0 1 9 9q0-.424.288-.712A.97.97 0 0 1 10 8h1V7a.97.97 0 0 1 .288-.712A.96.96 0 0 1 12 6q.424 0 .712.288A.97.97 0 0 1 13 7v1h1q.424 0 .712.288.287.288.288.712 0 .424-.287.712A.97.97 0 0 1 14 10h-1v1a.96.96 0 0 1-.287.712A.98.98 0 0 1 12 12a.96.96 0 0 1-.712-.287A.97.97 0 0 1 11 11' } />
      </g>
    </svg>
  );
}
export default HintAdd;

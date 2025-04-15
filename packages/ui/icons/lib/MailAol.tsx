import type { SVGProps } from 'react';
import * as React from 'react';

function MailAol(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns={ 'http://www.w3.org/2000/svg' } width={ 24 } height={ 24 } fill={ 'none' } viewBox={ '0 0 24 24' } { ...props }>
      <path fill={ '#009ADA' } d={ 'M13.5 9c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4m1 4c0 .551-.449 1-1 1s-1-.449-1-1 .449-1 1-1 1 .449 1 1M21 7h-3v10h3zm2 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2M3.89 7 0 17h3.084l.535-1.5h3.224l.535 1.5h3.084L6.572 7zm1.881 5.5h-1.08l.54-1.513z' } />
      <path fill={ 'url(#a)' } d={ 'M13.5 9c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4m0 5c-.551 0-1-.449-1-1s.449-1 1-1 1 .449 1 1-.449 1-1 1m4.5 3h3V7h-3zm5-2c-.551 0-1 .449-1 1s.449 1 1 1 1-.449 1-1-.449-1-1-1M3.89 7 0 17h3.084l.535-1.5h3.224l.535 1.5h3.084L6.572 7zm.8 5.5.541-1.513.54 1.513z' } />
      <defs>
        <linearGradient id={ 'a' } x1={ 3.155 } x2={ 23.206 } y1={ 8.575 } y2={ 17.925 } gradientUnits={ 'userSpaceOnUse' }>
          <stop stopColor={ '#fff' } stopOpacity={ 0.2 } />
          <stop offset={ 1 } stopColor={ '#fff' } stopOpacity={ 0 } />
        </linearGradient>
      </defs>
    </svg>
  );
}
export default MailAol;

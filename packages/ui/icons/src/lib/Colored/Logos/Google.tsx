import type { SVGProps } from 'react';
import * as React from 'react';

function Google(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns={ 'http://www.w3.org/2000/svg' } width={ 24 } height={ 24 } fill={ 'none' } viewBox={ '0 0 24 24' } { ...props }>
      <path fill={ '#FFC107' } d={ 'M21.806 10.042H21V10h-9v4h5.651A5.998 5.998 0 0 1 6 12a6 6 0 0 1 6-6c1.53 0 2.921.577 3.98 1.52l2.83-2.83A9.95 9.95 0 0 0 12 2C6.478 2 2 6.478 2 12s4.478 10 10 10 10-4.477 10-10c0-.67-.069-1.325-.195-1.959' } />
      <path fill={ '#FF3D00' } d={ 'M3.153 7.346 6.44 9.755A6 6 0 0 1 12 6c1.53 0 2.921.577 3.98 1.52l2.83-2.829A9.95 9.95 0 0 0 12 2a9.99 9.99 0 0 0-8.847 5.346' } />
      <path fill={ '#4CAF50' } d={ 'M12 22c2.583 0 4.93-.988 6.704-2.596l-3.095-2.619A5.95 5.95 0 0 1 12 18a6 6 0 0 1-5.64-3.973L3.096 16.54C4.752 19.778 8.113 22 12 22' } />
      <path fill={ '#1976D2' } d={ 'M21.806 10.042H21V10h-9v4h5.651a6 6 0 0 1-2.043 2.785h.002l3.095 2.619C18.485 19.602 22 17 22 12c0-.67-.069-1.325-.195-1.959' } />
    </svg>
  );
}
export default Google;

import type { SVGProps } from 'react';
import * as React from 'react';

const Clock60 = (props: SVGProps<SVGSVGElement>) => <svg xmlns={ 'http://www.w3.org/2000/svg' } width={ 24 } height={ 24 } fill={ 'none' } viewBox={ '0 0 24 24' } { ...props }><path fill={ 'currentColor' } d={ 'M12 22a9.7 9.7 0 0 1-3.9-.788 10.1 10.1 0 0 1-3.175-2.137q-1.35-1.35-2.137-3.175A9.8 9.8 0 0 1 2 12q0-2.075.788-3.9a10.1 10.1 0 0 1 2.137-3.175Q6.273 3.575 8.1 2.788A9.7 9.7 0 0 1 12 2q2.073 0 3.9.788a10.1 10.1 0 0 1 3.175 2.137q1.348 1.35 2.138 3.175A9.7 9.7 0 0 1 22 12a9.8 9.8 0 0 1-.788 3.9 10 10 0 0 1-2.137 3.175 10.2 10.2 0 0 1-3.175 2.138A9.7 9.7 0 0 1 12 22m-5.675-4.325L12 12V4Q8.65 4 6.325 6.325T4 12q0 1.6.6 3.075t1.725 2.6' } /></svg>;
export default Clock60;

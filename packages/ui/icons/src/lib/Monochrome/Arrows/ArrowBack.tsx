import type { SVGProps } from 'react';
import * as React from 'react';

const ArrowBack = (props: SVGProps<SVGSVGElement>) => <svg xmlns={ 'http://www.w3.org/2000/svg' } width={ 24 } height={ 24 } fill={ 'none' } viewBox={ '0 0 24 24' } { ...props }><path fill={ 'currentColor' } d={ 'm7.825 13 4.9 4.9q.3.3.288.7t-.313.7q-.3.275-.7.288a.91.91 0 0 1-.7-.288l-6.6-6.6a.9.9 0 0 1-.213-.325 1.17 1.17 0 0 1 .002-.75.86.86 0 0 1 .212-.325l6.6-6.6a.93.93 0 0 1 .688-.275q.413 0 .712.275.3.3.3.713a.97.97 0 0 1-.3.712L7.825 11H19q.425 0 .713.288T20 12q0 .424-.288.713A.96.96 0 0 1 19 13z' } /></svg>;
export default ArrowBack;

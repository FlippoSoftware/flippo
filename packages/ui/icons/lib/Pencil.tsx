import type { SVGProps } from 'react';
import * as React from 'react';

const Pencil = (props: SVGProps<SVGSVGElement>) => <svg xmlns={ 'http://www.w3.org/2000/svg' } width={ 24 } height={ 24 } fill={ 'none' } viewBox={ '0 0 24 24' } { ...props }><path fill={ 'currentColor' } d={ 'M5 19h1.425L16.2 9.225 14.775 7.8 5 17.575zm-1 2a.97.97 0 0 1-.712-.288A.97.97 0 0 1 3 20v-2.425a1.98 1.98 0 0 1 .575-1.4L16.2 3.575q.3-.275.663-.425t.762-.15.775.15.65.45L20.425 5q.3.275.437.65T21 6.4q0 .4-.138.763a1.9 1.9 0 0 1-.437.662l-12.6 12.6a1.98 1.98 0 0 1-1.4.575zM15.475 8.525l-.7-.725L16.2 9.225z' } /></svg>;
export default Pencil;

import type { SVGProps } from 'react';
import * as React from 'react';

const Clipboard = (props: SVGProps<SVGSVGElement>) => <svg xmlns={ 'http://www.w3.org/2000/svg' } width={ 24 } height={ 24 } fill={ 'none' } viewBox={ '0 0 24 24' } { ...props }><path fill={ 'currentColor' } d={ 'M5 21q-.824 0-1.412-.587A1.93 1.93 0 0 1 3 19V5q0-.824.588-1.412A1.93 1.93 0 0 1 5 3h4.175q.275-.875 1.075-1.437A3 3 0 0 1 12 1a3 3 0 0 1 1.788.563q.788.562 1.062 1.437H19q.825 0 1.413.588T21 5v14q0 .825-.587 1.413A1.92 1.92 0 0 1 19 21zm0-2h14V5h-2v2a.97.97 0 0 1-.288.713A.96.96 0 0 1 16 8H8a.97.97 0 0 1-.712-.288A.97.97 0 0 1 7 7V5H5zm7-14a.97.97 0 0 0 .713-.288A.96.96 0 0 0 13 4a.97.97 0 0 0-.288-.712A.97.97 0 0 0 12 3a.97.97 0 0 0-.712.288A.97.97 0 0 0 11 4q0 .424.288.713A.96.96 0 0 0 12 5' } /></svg>;
export default Clipboard;

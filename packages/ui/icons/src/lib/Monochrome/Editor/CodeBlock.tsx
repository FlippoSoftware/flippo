import type { SVGProps } from 'react';
import * as React from 'react';

const CodeBlock = (props: SVGProps<SVGSVGElement>) => <svg xmlns={ 'http://www.w3.org/2000/svg' } width={ 24 } height={ 24 } fill={ 'none' } viewBox={ '0 0 24 24' } { ...props }><path fill={ 'currentColor' } d={ 'm8.825 12 1.475-1.475q.3-.3.3-.7t-.3-.7-.712-.3-.713.3L6.7 11.3q-.15.15-.213.325a1.15 1.15 0 0 0 0 .75.85.85 0 0 0 .213.325l2.175 2.175q.3.3.713.3a.97.97 0 0 0 .712-.3.965.965 0 0 0 0-1.4zm6.35 0L13.7 13.475q-.3.3-.3.7t.3.7.713.3a.97.97 0 0 0 .712-.3L17.3 12.7q.15-.15.213-.325t.062-.375a1.2 1.2 0 0 0-.062-.375.85.85 0 0 0-.213-.325l-2.175-2.175a1 1 0 0 0-1.425 0q-.3.3-.3.7t.3.7zM5 21q-.824 0-1.412-.587A1.93 1.93 0 0 1 3 19V5q0-.824.588-1.412A1.93 1.93 0 0 1 5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413A1.92 1.92 0 0 1 19 21zm0-2h14V5H5z' } /></svg>;
export default CodeBlock;

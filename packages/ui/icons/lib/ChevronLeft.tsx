import type { SVGProps } from 'react';
import * as React from 'react';

const ChevronLeft = (props: SVGProps<SVGSVGElement>) => <svg xmlns={ 'http://www.w3.org/2000/svg' } width={ 24 } height={ 24 } fill={ 'none' } viewBox={ '0 0 24 24' } { ...props }><path fill={ 'currentColor' } d={ 'm10.8 12 3.9 3.9a.95.95 0 0 1 .275.7.95.95 0 0 1-.275.7.95.95 0 0 1-.7.275.95.95 0 0 1-.7-.275l-4.6-4.6a.9.9 0 0 1-.212-.325 1.13 1.13 0 0 1 0-.75.9.9 0 0 1 .212-.325l4.6-4.6a.95.95 0 0 1 .7-.275q.425 0 .7.275a.95.95 0 0 1 .275.7.95.95 0 0 1-.275.7z' } /></svg>;
export default ChevronLeft;

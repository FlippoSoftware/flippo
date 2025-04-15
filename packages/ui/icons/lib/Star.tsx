import type { SVGProps } from 'react';
import * as React from 'react';

const Star = (props: SVGProps<SVGSVGElement>) => <svg xmlns={ 'http://www.w3.org/2000/svg' } width={ 24 } height={ 24 } fill={ 'none' } viewBox={ '0 0 24 24' } { ...props }><path fill={ 'currentColor' } d={ 'm7.625 6.4 2.8-3.625q.3-.4.713-.587a2.08 2.08 0 0 1 1.725 0q.414.19.712.587l2.8 3.625 4.25 1.425q.65.2 1.025.738t.375 1.187q0 .3-.088.6t-.287.575l-2.75 3.9.1 4.1q.025.875-.575 1.475t-1.4.6q-.05 0-.55-.075L12 19.675l-4.475 1.25a1 1 0 0 1-.275.063 3 3 0 0 1-.275.012q-.8 0-1.4-.6T5 18.925l.1-4.125-2.725-3.875a1.9 1.9 0 0 1-.288-.575q-.089-.3-.087-.6 0-.625.363-1.162.364-.537 1.012-.763zM8.85 8.125 4 9.725 7.1 14.2 7 18.975l5-1.375 5 1.4-.1-4.8L20 9.775l-4.85-1.65L12 4z' } /></svg>;
export default Star;

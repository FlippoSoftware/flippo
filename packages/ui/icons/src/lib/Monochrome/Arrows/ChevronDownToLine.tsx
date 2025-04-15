import type { SVGProps } from 'react';
import * as React from 'react';

const ChevronDownToLine = (props: SVGProps<SVGSVGElement>) => <svg xmlns={ 'http://www.w3.org/2000/svg' } width={ 24 } height={ 24 } fill={ 'none' } viewBox={ '0 0 24 24' } { ...props }><path fill={ 'currentColor' } d={ 'm12.013 10.188 3.9-3.9a.95.95 0 0 1 .7-.276q.424 0 .7.275a.95.95 0 0 1 .274.7.95.95 0 0 1-.274.7l-4.6 4.6q-.15.15-.325.213a1.15 1.15 0 0 1-.75 0 .85.85 0 0 1-.325-.213l-4.6-4.6a.95.95 0 0 1-.276-.7q0-.424.275-.7a.95.95 0 0 1 .7-.275q.426 0 .7.275zm6 6.8a.97.97 0 0 1-.289.713.96.96 0 0 1-.712.287h-10A.97.97 0 0 1 6.3 17.7a.96.96 0 0 1-.287-.712q.002-.424.288-.712a.97.97 0 0 1 .712-.288h10q.426 0 .712.288.288.288.288.712' } /></svg>;
export default ChevronDownToLine;

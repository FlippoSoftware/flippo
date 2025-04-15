import type { SVGProps } from 'react';
import * as React from 'react';

const ChevronDown = (props: SVGProps<SVGSVGElement>) => <svg xmlns={ 'http://www.w3.org/2000/svg' } width={ 24 } height={ 24 } fill={ 'none' } viewBox={ '0 0 24 24' } { ...props }><path fill={ 'currentColor' } d={ 'M12 14.975q-.2 0-.375-.062a.9.9 0 0 1-.325-.213l-4.6-4.6a.95.95 0 0 1-.275-.7q0-.425.275-.7a.95.95 0 0 1 .7-.275q.425 0 .7.275l3.9 3.9 3.9-3.9a.95.95 0 0 1 .7-.275q.425 0 .7.275a.95.95 0 0 1 .275.7.95.95 0 0 1-.275.7l-4.6 4.6q-.15.15-.325.213a1.1 1.1 0 0 1-.375.062' } /></svg>;
export default ChevronDown;

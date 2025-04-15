import type { SVGProps } from 'react';
import * as React from 'react';

const File = (props: SVGProps<SVGSVGElement>) => <svg xmlns={ 'http://www.w3.org/2000/svg' } width={ 24 } height={ 24 } fill={ 'none' } viewBox={ '0 0 24 24' } { ...props }><path fill={ 'currentColor' } d={ 'M6 22q-.824 0-1.412-.587A1.93 1.93 0 0 1 4 20V4q0-.824.588-1.412A1.93 1.93 0 0 1 6 2h7.175a1.98 1.98 0 0 1 1.4.575l4.85 4.85q.275.275.425.638t.15.762V20q0 .825-.587 1.413A1.92 1.92 0 0 1 18 22zm7-14V4H6v16h12V9h-4a.97.97 0 0 1-.712-.288A.97.97 0 0 1 13 8' } /></svg>;
export default File;

import type { SVGProps } from 'react';
import * as React from 'react';

const ChevronsCollapseUpRight = (props: SVGProps<SVGSVGElement>) => <svg xmlns={ 'http://www.w3.org/2000/svg' } width={ 24 } height={ 24 } fill={ 'none' } viewBox={ '0 0 24 24' } { ...props }><path fill={ 'currentColor' } d={ 'M9 15H6a.97.97 0 0 1-.712-.288A.97.97 0 0 1 5 14q0-.424.288-.712A.97.97 0 0 1 6 13h4q.425 0 .713.288T11 14v4a.97.97 0 0 1-.288.713A.96.96 0 0 1 10 19a.97.97 0 0 1-.712-.288A.97.97 0 0 1 9 18zm6-6h3q.425 0 .713.288T19 10q0 .424-.288.713A.96.96 0 0 1 18 11h-4a.97.97 0 0 1-.712-.288A.97.97 0 0 1 13 10V6q0-.424.288-.712A.97.97 0 0 1 14 5q.424 0 .713.288A.96.96 0 0 1 15 6z' } /></svg>;
export default ChevronsCollapseUpRight;

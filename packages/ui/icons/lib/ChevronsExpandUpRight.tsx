import type { SVGProps } from 'react';
import * as React from 'react';

const ChevronsExpandUpRight = (props: SVGProps<SVGSVGElement>) => <svg xmlns={ 'http://www.w3.org/2000/svg' } width={ 24 } height={ 24 } fill={ 'none' } viewBox={ '0 0 24 24' } { ...props }><path fill={ 'currentColor' } d={ 'M7 17h3q.425 0 .713.288T11 18t-.288.713A.96.96 0 0 1 10 19H6a.97.97 0 0 1-.712-.288A.97.97 0 0 1 5 18v-4q0-.424.288-.712A.97.97 0 0 1 6 13q.424 0 .713.288A.96.96 0 0 1 7 14zM17 7h-3a.97.97 0 0 1-.712-.288A.97.97 0 0 1 13 6q0-.424.288-.712A.97.97 0 0 1 14 5h4q.425 0 .713.288.288.289.287.712v4a.97.97 0 0 1-.288.713A.96.96 0 0 1 18 11a.97.97 0 0 1-.712-.288A.97.97 0 0 1 17 10z' } /></svg>;
export default ChevronsExpandUpRight;

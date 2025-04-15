import type { SVGProps } from 'react';
import * as React from 'react';

const FormatItalic = (props: SVGProps<SVGSVGElement>) => <svg xmlns={ 'http://www.w3.org/2000/svg' } width={ 24 } height={ 24 } fill={ 'none' } viewBox={ '0 0 24 24' } { ...props }><path fill={ 'currentColor' } d={ 'M6.25 19q-.525 0-.888-.363A1.2 1.2 0 0 1 5 17.75q0-.524.363-.888.362-.364.887-.362H9l3-9H9.25q-.525 0-.888-.363A1.2 1.2 0 0 1 8 6.25q0-.524.363-.888.362-.364.887-.362h7.5q.525 0 .888.363T18 6.25q0 .524-.363.888a1.2 1.2 0 0 1-.887.362H14.5l-3 9h2.25q.525 0 .888.363t.362.887-.363.888a1.2 1.2 0 0 1-.887.362z' } /></svg>;
export default FormatItalic;

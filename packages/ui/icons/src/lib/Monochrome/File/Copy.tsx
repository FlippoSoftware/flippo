import type { SVGProps } from 'react';
import * as React from 'react';

const Copy = (props: SVGProps<SVGSVGElement>) => <svg xmlns={ 'http://www.w3.org/2000/svg' } width={ 24 } height={ 24 } fill={ 'none' } viewBox={ '0 0 24 24' } { ...props }><path fill={ 'currentColor' } d={ 'M9 18q-.825 0-1.412-.587A1.93 1.93 0 0 1 7 16V4q0-.824.588-1.412A1.93 1.93 0 0 1 9 2h9q.825 0 1.413.588T20 4v12q0 .825-.587 1.413A1.92 1.92 0 0 1 18 18zm0-2h9V4H9zm-4 6q-.824 0-1.412-.587A1.93 1.93 0 0 1 3 20V7q0-.424.288-.712A.97.97 0 0 1 4 6q.424 0 .713.288A.96.96 0 0 1 5 7v13h10q.425 0 .713.288T16 21t-.288.713A.96.96 0 0 1 15 22z' } /></svg>;
export default Copy;

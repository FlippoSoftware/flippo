import type { SVGProps } from 'react';
import * as React from 'react';

const LinkSlash = (props: SVGProps<SVGSVGElement>) => <svg xmlns={ 'http://www.w3.org/2000/svg' } width={ 24 } height={ 24 } fill={ 'none' } viewBox={ '0 0 24 24' } { ...props }><path fill={ 'currentColor' } d={ 'M15.625 12.775 13.85 11H15q.425 0 .713.288T16 12a1 1 0 0 1-.1.45.9.9 0 0 1-.275.325M20.5 21.9a.95.95 0 0 1-.7.275.95.95 0 0 1-.7-.275l-17-17a.95.95 0 0 1-.275-.7q0-.425.275-.7a.95.95 0 0 1 .7-.275q.425 0 .7.275l17 17a.95.95 0 0 1 .275.7.95.95 0 0 1-.275.7M7 17q-2.074 0-3.537-1.463Q2.001 14.075 2 12q0-1.725 1.05-3.075t2.7-1.775L7.6 9H7q-1.25 0-2.125.875A2.9 2.9 0 0 0 4 12q0 1.25.875 2.125A2.9 2.9 0 0 0 7 15h3q.425 0 .713.288T11 16t-.288.713A.96.96 0 0 1 10 17zm2-4a.97.97 0 0 1-.712-.288A.97.97 0 0 1 8 12q0-.424.288-.712A.97.97 0 0 1 9 11h.625l1.975 2zm9.5 2.8a1.05 1.05 0 0 1-.162-.75.88.88 0 0 1 .412-.625q.575-.424.913-1.05.338-.625.337-1.375 0-1.25-.875-2.125A2.9 2.9 0 0 0 17 9h-3a.97.97 0 0 1-.712-.288A.97.97 0 0 1 13 8q0-.424.288-.712A.97.97 0 0 1 14 7h3q2.075 0 3.538 1.463T22 12q0 1.226-.562 2.288a4.94 4.94 0 0 1-1.563 1.762q-.35.225-.75.163a.87.87 0 0 1-.625-.413' } /></svg>;
export default LinkSlash;

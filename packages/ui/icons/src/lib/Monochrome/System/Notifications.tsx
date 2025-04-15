import type { SVGProps } from 'react';
import * as React from 'react';

const Notifications = (props: SVGProps<SVGSVGElement>) => <svg xmlns={ 'http://www.w3.org/2000/svg' } width={ 24 } height={ 24 } fill={ 'none' } viewBox={ '0 0 24 24' } { ...props }><path fill={ 'currentColor' } d={ 'M5 19a.97.97 0 0 1-.712-.288A.97.97 0 0 1 4 18q0-.424.288-.712A.97.97 0 0 1 5 17h1v-7q0-2.074 1.25-3.687T10.5 4.2v-.7q0-.625.438-1.062A1.45 1.45 0 0 1 12 2q.624 0 1.063.438.439.44.437 1.062v.7q2 .5 3.25 2.113T18 10v7h1q.425 0 .713.288T20 18q0 .424-.288.713A.96.96 0 0 1 19 19zm7 3q-.825 0-1.412-.587A1.93 1.93 0 0 1 10 20h4q0 .825-.587 1.413A1.92 1.92 0 0 1 12 22m-4-5h8v-7q0-1.65-1.175-2.825T12 6 9.175 7.175 8 10z' } /></svg>;
export default Notifications;

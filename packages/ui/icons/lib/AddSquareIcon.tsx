import type { SVGProps } from 'react';
import * as React from 'react';

const AddSquare = (props: SVGProps<SVGSVGElement>) => <svg xmlns={'http://www.w3.org/2000/svg'} fill={'none'} viewBox={'0 0 24 24'} {...props}><path fill={'currentColor'} d={'M11 13v3q0 .425.288.713T12 17q.424 0 .713-.288A.96.96 0 0 0 13 16v-3h3a.97.97 0 0 0 .713-.288A.96.96 0 0 0 17 12a.97.97 0 0 0-.288-.712A.97.97 0 0 0 16 11h-3V8a.97.97 0 0 0-.288-.712A.97.97 0 0 0 12 7a.96.96 0 0 0-.712.288A.97.97 0 0 0 11 8v3H8a.97.97 0 0 0-.712.288A.97.97 0 0 0 7 12q0 .424.288.713A.96.96 0 0 0 8 13zm-6 8q-.824 0-1.412-.587A1.93 1.93 0 0 1 3 19V5q0-.824.588-1.412A1.93 1.93 0 0 1 5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413A1.92 1.92 0 0 1 19 21zm0-2h14V5H5z'} /></svg>;
export default AddSquare;

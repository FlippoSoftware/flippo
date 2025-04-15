import type { SVGProps } from 'react';
import * as React from 'react';

const FolderAdd = (props: SVGProps<SVGSVGElement>) => <svg xmlns={ 'http://www.w3.org/2000/svg' } width={ 24 } height={ 24 } fill={ 'none' } viewBox={ '0 0 24 24' } { ...props }><path fill={ 'currentColor' } d={ 'M4 20q-.824 0-1.412-.587A1.93 1.93 0 0 1 2 18V6q0-.824.588-1.412A1.93 1.93 0 0 1 4 4h5.175a1.98 1.98 0 0 1 1.4.575L12 6h8q.825 0 1.413.588T22 8v10q0 .825-.587 1.413A1.92 1.92 0 0 1 20 20zm0-2h16V8h-8.825l-2-2H4zm10-4v1q0 .425.288.713T15 16t.713-.288A.96.96 0 0 0 16 15v-1h1a.97.97 0 0 0 .713-.288A.96.96 0 0 0 18 13a.97.97 0 0 0-.288-.712A.97.97 0 0 0 17 12h-1v-1a.97.97 0 0 0-.288-.712A.97.97 0 0 0 15 10a.96.96 0 0 0-.712.288A.97.97 0 0 0 14 11v1h-1a.97.97 0 0 0-.712.288A.97.97 0 0 0 12 13q0 .424.288.713A.96.96 0 0 0 13 14z' } /></svg>;
export default FolderAdd;

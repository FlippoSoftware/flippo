import type { SVGProps } from 'react';
import * as React from 'react';

const PersonEditFill = (props: SVGProps<SVGSVGElement>) => <svg xmlns={ 'http://www.w3.org/2000/svg' } width={ 24 } height={ 24 } fill={ 'none' } viewBox={ '0 0 24 24' } { ...props }><path fill={ 'currentColor' } d={ 'M14 20v-1.25q0-.4.163-.763t.437-.637l4.925-4.925q.225-.225.5-.325a1.6 1.6 0 0 1 .55-.1 1.5 1.5 0 0 1 1.075.45l.925.925q.2.225.313.5t.112.55q0 .275-.1.563a1.3 1.3 0 0 1-.325.512l-4.925 4.925a1.97 1.97 0 0 1-1.4.575H15a.97.97 0 0 1-.712-.288A.97.97 0 0 1 14 20M4 19v-1.8q0-.85.438-1.562A2.93 2.93 0 0 1 5.6 14.55a14.8 14.8 0 0 1 3.15-1.162A13.8 13.8 0 0 1 12 13q.925 0 1.825.113t1.8.362l-2.75 2.75q-.425.425-.65.975T12 18.35V20H5a.97.97 0 0 1-.712-.288A.97.97 0 0 1 4 19m16.575-3.6.925-.975-.925-.925-.95.95zM12 12q-1.65 0-2.825-1.175T8 8t1.175-2.825T12 4t2.825 1.175T16 8t-1.175 2.825T12 12' } /></svg>;
export default PersonEditFill;

import type { SVGProps } from 'react';
import * as React from 'react';

const Funnel = (props: SVGProps<SVGSVGElement>) => <svg xmlns={'http://www.w3.org/2000/svg'} width={24} height={24} fill={'none'} viewBox={'0 0 24 24'} {...props}><path fill={'currentColor'} d={'M11 20a.97.97 0 0 1-.712-.288A.97.97 0 0 1 10 19v-6L4.2 5.6q-.375-.5-.112-1.05T5 4h14q.65 0 .913.55T19.8 5.6L14 13v6a.97.97 0 0 1-.288.713A.96.96 0 0 1 13 20zm1-7.7L16.95 6h-9.9z'} /></svg>;
export default Funnel;

import type { SVGProps } from 'react';
import * as React from 'react';

const ArrowOutward = (props: SVGProps<SVGSVGElement>) => <svg xmlns={'http://www.w3.org/2000/svg'} width={24} height={24} fill={'none'} viewBox={'0 0 24 24'} {...props}><path fill={'currentColor'} d={'m16 8.4-8.9 8.9a.95.95 0 0 1-.7.275.95.95 0 0 1-.7-.275.95.95 0 0 1-.275-.7q0-.425.275-.7L14.6 7H7a.97.97 0 0 1-.712-.288A.97.97 0 0 1 6 6q0-.424.288-.712A.97.97 0 0 1 7 5h10q.425 0 .713.288.288.289.287.712v10a.97.97 0 0 1-.288.713A.96.96 0 0 1 17 17a.97.97 0 0 1-.712-.288A.97.97 0 0 1 16 16z'} /></svg>;
export default ArrowOutward;

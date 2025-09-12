import type { SVGProps } from 'react';
import * as React from 'react';

const Plus = (props: SVGProps<SVGSVGElement>) => <svg xmlns={'http://www.w3.org/2000/svg'} fill={'none'} viewBox={'0 0 24 24'} {...props}><path fill={'currentColor'} d={'M11 13H6a.97.97 0 0 1-.712-.288A.97.97 0 0 1 5 12q0-.424.288-.712A.97.97 0 0 1 6 11h5V6q0-.424.288-.712A.97.97 0 0 1 12 5q.424 0 .713.288A.96.96 0 0 1 13 6v5h5q.425 0 .713.288T19 12q0 .424-.288.713A.96.96 0 0 1 18 13h-5v5a.97.97 0 0 1-.288.713A.96.96 0 0 1 12 19a.97.97 0 0 1-.712-.288A.97.97 0 0 1 11 18z'} /></svg>;
export default Plus;

import type { SVGProps } from 'react';
import * as React from 'react';

const Home = (props: SVGProps<SVGSVGElement>) => <svg xmlns={'http://www.w3.org/2000/svg'} width={24} height={24} fill={'none'} viewBox={'0 0 24 24'} {...props}><path fill={'currentColor'} d={'M5.25 19.844h3.375v-5.625q0-.478.324-.801t.801-.324h4.5q.478 0 .802.324t.323.8v5.626h3.375V9.719L12 4.656 5.25 9.72zm-2.25 0V9.719q0-.534.24-1.013t.66-.787l6.75-5.063q.591-.45 1.35-.45t1.35.45L20.1 7.92q.422.309.662.787T21 9.72v10.125q0 .927-.662 1.59-.66.66-1.588.66h-4.5q-.479 0-.801-.324a1.1 1.1 0 0 1-.324-.801v-5.625h-2.25v5.625q0 .478-.324.802a1.08 1.08 0 0 1-.801.323h-4.5q-.928 0-1.588-.66T3 19.843'} /></svg>;
export default Home;

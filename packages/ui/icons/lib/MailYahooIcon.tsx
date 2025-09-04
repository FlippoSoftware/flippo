import type { SVGProps } from 'react';
import * as React from 'react';

function MailYahoo(props: SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns={'http://www.w3.org/2000/svg'} width={24} height={24} fill={'none'} viewBox={'0 0 24 24'} {...props}>
            <path fill={'#720AC1'} d={'M0 5a5 5 0 0 1 5-5h14a5 5 0 0 1 5 5v14a5 5 0 0 1-5 5H5a5 5 0 0 1-5-5z'} />
            <g fill={'#fff'}>
                <path d={'M4.813 8.35h3l2.852 7.604-2.852.395z'} />
                <path d={'M10.667 8.35h2.999l-4 11h-3zm4.999-3.001h2.999L16 11.5s-.5-1-1.5 0-1.666 1.547-1.666 1.547zm-.166 9.736a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0'} />
            </g>
        </svg>
    );
}
export default MailYahoo;

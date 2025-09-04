import type { SVGProps } from 'react';
import * as React from 'react';

function MailYandex(props: SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns={'http://www.w3.org/2000/svg'} width={24} height={24} fill={'none'} viewBox={'0 0 24 24'} {...props}>
            <g clipPath={'url(#a)'}>
                <rect width={38} height={26} x={-7} y={-1} fill={'#FECA38'} rx={5} />
                <path fill={'#FECA38'} d={'M0 5a5 5 0 0 1 5-5h14a5 5 0 0 1 5 5v14a5 5 0 0 1-5 5H5a5 5 0 0 1-5-5z'} />
                <path fill={'#FFDD7C'} d={'m12 6 16 19H-4z'} />
                <path fill={'url(#b)'} d={'M-.712 4.295C-2.852 2.493-1.578-1 1.22-1h21.56c2.798 0 4.072 3.493 1.932 5.295l-10.779 9.077c-1.117.94-2.75.94-3.866 0z'} />
            </g>
            <defs>
                <linearGradient id={'b'} x1={7.378} x2={23.345} y1={6.742} y2={-3.507} gradientUnits={'userSpaceOnUse'}>
                    <stop stopColor={'#FF4412'} />
                    <stop offset={1} stopColor={'#FFBB7A'} />
                </linearGradient>
                <clipPath id={'a'}><rect width={24} height={24} fill={'#fff'} rx={5} /></clipPath>
            </defs>
        </svg>
    );
}
export default MailYandex;

import type { SVGProps } from 'react';
import * as React from 'react';

function FlagRu(props: SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns={'http://www.w3.org/2000/svg'} fill={'none'} viewBox={'0 0 24 24'} {...props}>
            <mask
              id={'a'} width={24} height={24} x={0} y={0} maskUnits={'userSpaceOnUse'} style={{
                    maskType: 'luminance'
                }}
            >
                <path fill={'#fff'} d={'M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12'} />
            </mask>
            <g mask={'url(#a)'}>
                <path fill={'#0052B4'} d={'M24 7.969v8.062l-12 1.5-12-1.5V7.97l12-1.5z'} />
                <path fill={'#EEE'} d={'M24 0v7.969H0V0z'} />
                <path fill={'#D80027'} d={'M24 16.031V24H0v-7.969z'} />
            </g>
        </svg>
    );
}
export default FlagRu;

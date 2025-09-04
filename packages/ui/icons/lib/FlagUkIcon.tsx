import type { SVGProps } from 'react';
import * as React from 'react';

function FlagUk(props: SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns={'http://www.w3.org/2000/svg'} width={24} height={24} fill={'none'} viewBox={'0 0 24 24'} {...props}>
            <mask
              id={'a'} width={24} height={24} x={0} y={0} maskUnits={'userSpaceOnUse'} style={{
                    maskType: 'luminance'
                }}
            >
                <path fill={'#fff'} d={'M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12'} />
            </mask>
            <g mask={'url(#a)'}>
                <path fill={'#EEE'} d={'m0 0 .375 1.031L0 2.11v1.079l1.5 2.53L0 8.25v1.5L1.5 12 0 14.25v1.5l1.5 2.531L0 20.813V24l1.031-.375L2.11 24h1.079l2.53-1.5L8.25 24h1.5L12 22.5l2.25 1.5h1.5l2.531-1.5 2.532 1.5H24l-.375-1.031L24 21.89v-1.078l-1.5-2.532 1.5-2.53v-1.5L22.5 12 24 9.75v-1.5l-1.5-2.531L24 3.187V0l-1.031.375L21.89 0h-1.078L18.28 1.5 15.75 0h-1.5L12 1.5 9.75 0h-1.5L5.719 1.5 3.187 0z'} />
                <path fill={'#0052B4'} d={'M15.75 0v5.063L20.813 0zM24 3.188 18.938 8.25H24zM0 8.25h5.063L0 3.188zM3.188 0 8.25 5.063V0zM8.25 24v-5.062L3.188 24zM0 20.813l5.063-5.063H0zm24-5.063h-5.062L24 20.813zM20.813 24l-5.063-5.062V24z'} />
                <path fill={'#D80027'} d={'M0 0v2.11l6.14 6.14h2.11zm9.75 0v9.75H0v4.5h9.75V24h4.5v-9.75H24v-4.5h-9.75V0zm12.14 0-6.14 6.14v2.11L24 0zM8.25 15.75 0 24h2.11l6.14-6.14zm7.5 0L24 24v-2.11l-6.14-6.14z'} />
            </g>
        </svg>
    );
}
export default FlagUk;

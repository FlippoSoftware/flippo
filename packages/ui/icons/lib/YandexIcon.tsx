import type { SVGProps } from 'react';
import * as React from 'react';

function Yandex(props: SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns={'http://www.w3.org/2000/svg'} width={24} height={24} fill={'none'} viewBox={'0 0 24 24'} {...props}>
            <g clipPath={'url(#a)'}>
                <path fill={'#FC3D17'} d={'M0 12C0 5.372 5.371 0 12 0c6.626 0 12 5.372 12 12s-5.374 12-12 12C5.371 24 0 18.628 0 12'} />
                <path fill={'#fff'} d={'M13.32 7.666h-.924c-1.694 0-2.585.858-2.585 2.123 0 1.43.616 2.1 1.881 2.96l1.045.703-3.003 4.487H7.49l2.695-4.014c-1.55-1.11-2.42-2.19-2.42-4.015 0-2.288 1.595-3.85 4.62-3.85h3.003v11.868H13.32z'} />
            </g>
            <defs><clipPath id={'a'}><path fill={'#fff'} d={'M0 0h24v24H0z'} /></clipPath></defs>
        </svg>
    );
}
export default Yandex;

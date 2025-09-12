import type { SVGProps } from 'react';
import * as React from 'react';

function MailGmail(props: SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns={'http://www.w3.org/2000/svg'} fill={'none'} viewBox={'0 0 24 24'} {...props}>
            <path fill={'#4285F4'} d={'M6.545 19v-7.21L4.15 9.744 2 8.609v9.119C2 18.432 2.611 19 3.364 19z'} />
            <path fill={'#34A853'} d={'M17.455 19h3.181c.755 0 1.364-.57 1.364-1.272v-9.12L19.566 9.91l-2.111 1.88z'} />
            <path fill={'#EA4335'} d={'M6.545 11.79 6.22 8.972l.326-2.696L12 10.093l5.454-3.817.365 2.55-.364 2.964L12 15.607z'} />
            <path fill={'#FBBC04'} d={'M17.455 6.276v5.514L22 8.609V6.912c0-1.573-1.925-2.47-3.273-1.527z'} />
            <path fill={'#C5221F'} d={'m2 8.609 4.545 3.18V6.277l-1.272-.89C3.923 4.441 2 5.338 2 6.911z'} />
        </svg>
    );
}
export default MailGmail;

import type { SVGProps } from 'react';
import * as React from 'react';

const FolderOpen = (props: SVGProps<SVGSVGElement>) => <svg xmlns={'http://www.w3.org/2000/svg'} fill={'none'} viewBox={'0 0 24 24'} {...props}><path fill={'currentColor'} d={'M4 20q-.824 0-1.412-.587A1.93 1.93 0 0 1 2 18V6q0-.824.588-1.412A1.93 1.93 0 0 1 4 4h5.175a1.98 1.98 0 0 1 1.4.575L12 6h9q.425 0 .713.288.288.289.287.712 0 .424-.288.713A.96.96 0 0 1 21 8h-9.825l-2-2H4v12l1.975-6.575q.2-.65.738-1.037A2 2 0 0 1 7.9 10h12.9q1.025 0 1.613.813t.312 1.762l-1.8 6q-.2.65-.737 1.038A1.98 1.98 0 0 1 19 20zm2.1-2H19l1.8-6H7.9z'} /></svg>;
export default FolderOpen;

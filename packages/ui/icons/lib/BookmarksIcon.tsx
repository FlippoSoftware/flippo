import type { SVGProps } from 'react';
import * as React from 'react';

const Bookmarks = (props: SVGProps<SVGSVGElement>) => <svg xmlns={'http://www.w3.org/2000/svg'} width={24} height={24} fill={'none'} viewBox={'0 0 24 24'} {...props}><path fill={'currentColor'} d={'m10 19-4.55 2.275a.95.95 0 0 1-.975-.038Q4 20.949 4 20.376V8q0-.824.588-1.412A1.93 1.93 0 0 1 6 6h8q.825 0 1.413.588T16 8v12.375q0 .575-.475.863a.95.95 0 0 1-.975.037zm-4-.025 3.05-1.65a1.93 1.93 0 0 1 1.9 0l3.05 1.65V8H6zM19 18a.97.97 0 0 1-.712-.288A.97.97 0 0 1 18 17V4H8a.97.97 0 0 1-.712-.288A.97.97 0 0 1 7 3q0-.424.288-.712A.97.97 0 0 1 8 2h10q.825 0 1.413.588T20 4v13a.97.97 0 0 1-.288.713A.96.96 0 0 1 19 18'} /></svg>;
export default Bookmarks;

import type { SVGProps } from 'react';
import * as React from 'react';

const BookmarkFill = (props: SVGProps<SVGSVGElement>) => <svg xmlns={ 'http://www.w3.org/2000/svg' } width={ 24 } height={ 24 } fill={ 'none' } viewBox={ '0 0 24 24' } { ...props }><path fill={ 'currentColor' } d={ 'm12 18-4.2 1.8q-1 .425-1.9-.162T5 17.975V5q0-.824.588-1.412A1.93 1.93 0 0 1 7 3h10q.825 0 1.413.588T19 5v12.975q0 1.075-.9 1.663t-1.9.162z' } /></svg>;
export default BookmarkFill;

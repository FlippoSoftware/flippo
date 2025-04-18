import type { SVGProps } from 'react';
import * as React from 'react';

const AttachFile = (props: SVGProps<SVGSVGElement>) => <svg xmlns={ 'http://www.w3.org/2000/svg' } width={ 24 } height={ 24 } fill={ 'none' } viewBox={ '0 0 24 24' } { ...props }><path fill={ 'currentColor' } d={ 'M18 15.75q0 2.6-1.825 4.425Q14.349 22 11.75 22q-2.6 0-4.425-1.825T5.5 15.75V6.5q0-1.875 1.313-3.187T10 2q1.874 0 3.188 1.313Q14.502 4.627 14.5 6.5v8.75q0 1.15-.8 1.95t-1.95.8a2.65 2.65 0 0 1-1.95-.8 2.65 2.65 0 0 1-.8-1.95V7q0-.424.288-.712A.97.97 0 0 1 10 6q.424 0 .713.288A.96.96 0 0 1 11 7v8.25a.73.73 0 0 0 .75.75.74.74 0 0 0 .538-.213.72.72 0 0 0 .212-.537V6.5q-.025-1.05-.737-1.775T10 4t-1.775.725T7.5 6.5v9.25q-.025 1.775 1.225 3.013T11.75 20q1.75 0 2.975-1.237T16 15.75V7q0-.424.288-.712A.97.97 0 0 1 17 6q.424 0 .713.288A.96.96 0 0 1 18 7z' } /></svg>;
export default AttachFile;

import type { SVGProps } from 'react';
import * as React from 'react';

const ChevronUpToLine = (props: SVGProps<SVGSVGElement>) => <svg xmlns={ 'http://www.w3.org/2000/svg' } width={ 24 } height={ 24 } fill={ 'none' } viewBox={ '0 0 24 24' } { ...props }><path fill={ 'currentColor' } d={ 'M5.988 7.012q0-.424.288-.712a.97.97 0 0 1 .712-.288h10q.424 0 .712.288.286.289.288.712 0 .424-.288.713a.96.96 0 0 1-.712.287h-10a.97.97 0 0 1-.713-.288.96.96 0 0 1-.287-.712m6 6.8-3.9 3.9a.95.95 0 0 1-.7.276.95.95 0 0 1-.7-.276.95.95 0 0 1-.275-.7q0-.424.275-.7l4.6-4.6q.15-.15.325-.211.174-.063.375-.063.2-.002.375.063a.9.9 0 0 1 .325.212l4.6 4.6a.95.95 0 0 1 .274.7.95.95 0 0 1-.274.7.95.95 0 0 1-.7.274.95.95 0 0 1-.7-.274z' } /></svg>;
export default ChevronUpToLine;

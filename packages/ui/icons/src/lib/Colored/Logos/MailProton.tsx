import type { SVGProps } from 'react';
import * as React from 'react';

function MailProton(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns={ 'http://www.w3.org/2000/svg' } width={ 24 } height={ 24 } fill={ 'none' } viewBox={ '0 0 24 24' } { ...props }>
      <path fill={ '#D1C4E9' } d={ 'm21.225 4.632-8.048 6.412c-.7.559-1.701.556-2.4-.005L2.768 4.6C2.456 4.361 2 4.581 2 4.971v12.667c0 1.038.853 1.88 1.905 1.88h16.19c1.052 0 1.905-.842 1.905-1.88V4.998a.477.477 0 0 0-.776-.366' } />
      <path fill={ '#7C4DFF' } d={ 'm17.715 7.429-6.895 5.494c-.7.557-1.7.556-2.399-.004L2 7.772v9.867c0 1.038.853 1.878 1.905 1.878h13.81z' } />
    </svg>
  );
}
export default MailProton;

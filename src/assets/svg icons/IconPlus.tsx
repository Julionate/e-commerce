// icon:plus | Feathericons https://feathericons.com/ | Cole Bemis
import * as React from 'react';

function IconPlus(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export default IconPlus;

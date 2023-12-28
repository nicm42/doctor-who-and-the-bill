// https://reactgo.com/react-change-favicon-dynamically/

import { useEffect } from 'react';

export function useFavicon(favicon) {
  useEffect(() => {
    const faviconElement = document.querySelector('.favicon');
    const faviconImage = favicon === 'doctorwho' ? '/tardis.png' : favicon === 'thebill' ? '/helmet.png' : '';
    if (faviconElement) {
      faviconElement.href = faviconImage;
    }

    return () => {
      <div></div>;
    };
  });
}

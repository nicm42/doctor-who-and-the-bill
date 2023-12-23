// https://reactgo.com/react-change-favicon-dynamically/

import { useEffect } from 'react';

export function useFavicon(favicon) {
  useEffect(() => {
    const faviconElement = document.querySelector('.favicon');
    const faviconImage = favicon === 'doctorwho' ? '/tardis.png' : favicon === 'thebill' ? '/helmet.png' : '';
    faviconElement.href = faviconImage;

    console.log(faviconImage);

    return () => {
      faviconElement.href = faviconImage;
    };
  });
}

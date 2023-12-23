// https://stackoverflow.com/questions/71173874/can-i-change-page-title-in-reactjs-in-this-way-using-usestate-and-useeffect

import { useEffect } from 'react';

export function useTitle(title) {
  useEffect(() => {
    const originalTitle = 'Doctor Who & The Bill';

    const newTitle =
      title === 'doctorwho'
        ? 'Doctor Who in The Bill'
        : title === 'thebill'
          ? 'The Bill in Doctor Who'
          : 'Doctor Who & The Bill';

    const prevTitle = originalTitle;
    document.title = newTitle;
    return () => {
      document.title = prevTitle;
    };
  });
}

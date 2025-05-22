import { useMediaQuery } from 'react-responsive'

export  function useBreakPoint() {
   const isMobile = useMediaQuery({ maxWidth: 799 });
   const isTinyDesktop = useMediaQuery({ minWidth: 800, maxWidth: 1100 });
   const isDesktop = useMediaQuery({ minWidth: 800 });

   return { isMobile, isTinyDesktop, isDesktop };
}


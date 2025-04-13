import { useMediaQuery } from 'react-responsive'

export default function useIsDesktop() {
   return useMediaQuery({minWidth:769})
}
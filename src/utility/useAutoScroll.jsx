import { useRef, useEffect } from 'react'

export function useAutoScroll(dependencies){
      const ref=useRef(null);
      useEffect(()=>{
       const containerElem=ref.current;
       containerElem.scrollTop=containerElem.scrollHeight;
      },[dependencies])
      return ref;
    }
import { useState, useEffect, useRef } from 'react';

function getIsMobile() {
  // definition of mobile width, this is the trigger to switch
  return window.innerWidth<800
}

const screenWidthOffset = 36

function getScreenWidth() {
  return window.innerWidth - screenWidthOffset
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(getIsMobile());

  useEffect(() => {
    function handleResize() {
        setIsMobile(getIsMobile());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
}

function useScreenWidth() {
  const [width, setWidth] = useState(getScreenWidth());

  useEffect(() => {
    function handleResize2() {
      setWidth(getScreenWidth());
    }

    window.addEventListener('resize', handleResize2);
    return () => window.removeEventListener('resize', handleResize2);
  }, []);

  return width;
}

function usePrevious(stateValue:any) {
  const ref = useRef();
  useEffect(() => {
    ref.current = stateValue; //assign the value of ref to the argument
  },[stateValue]); //this code will run when the value of 'value' changes
  return ref.current; //in the end, return the current ref value.
}


export { useIsMobile, useScreenWidth, getScreenWidth, getIsMobile, screenWidthOffset, usePrevious }
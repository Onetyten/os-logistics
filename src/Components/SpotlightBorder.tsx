import clsx from 'clsx'
import type React from 'react';

interface propsType{
    children?: React.ReactNode
    className?:string
}

const injectCursorPosition = (e:PointerEvent)=>{
  document.documentElement.style.setProperty('--x',`${Math.round(e.clientX)}px`)
  document.documentElement.style.setProperty('--y',`${Math.round(e.clientY)}px`)
}
document.body.addEventListener('pointermove',injectCursorPosition)

export default function SpotlightBorder(props:propsType) {
    const {children,className} = props
    return(

    <div className={clsx(`spotlight relative bg-box rounded-md before:absolute before:inset-0 before:pointer-events-none`,className)}>
       {children} 
    </div>
  );
}

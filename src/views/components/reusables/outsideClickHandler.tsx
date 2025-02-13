import React, { useRef } from 'react'

type Props = {
    children: React.ReactNode;
    exceptionRef?: React.RefObject<HTMLElement>;
    onClick: () => void;
    className?: string;
}

  
const OutsideClickHandler = (props: Props) => {
    
    const wrapperRef = useRef<HTMLDivElement>(null)
    
    React.useEffect(()=>{

        const handleClick = (e: MouseEvent) => {

            let innerClick: null | boolean = false;

            if (props.exceptionRef) {
                innerClick = (wrapperRef.current && wrapperRef.current.contains(e.target as Node))
                        || (props.exceptionRef.current && props.exceptionRef.current === e.target)
                        || (props.exceptionRef.current && props.exceptionRef.current.contains(e.target as Node));
            }
            else {
                innerClick = wrapperRef.current && wrapperRef.current.contains(e.target as Node)
            }

            if (!innerClick) {
                props.onClick()
            }
        }

        document.addEventListener('mousedown', handleClick)

        return () => {
            document.removeEventListener('mousedown', handleClick)
        }
    }, [props, props.exceptionRef])

    return (
        
        <div ref={wrapperRef} className={`${props.className || ''}`}>
            {props.children}
        </div>
    )
}

export default OutsideClickHandler
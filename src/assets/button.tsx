import React from 'react'

type SolidButtonProps = {
    children: React.ReactNode,
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void,
    className?: string,
    variant?: string,
    size?: string
}
const Button = (props: SolidButtonProps) => {

    return (
        <button
            className={`${props.className ? props.className : 'h-8 w-full flex items-center justify-center text-xs md:text-sm font-medium cursor-pointer rounded-xl border border-transparent text-white bg-[#2563eb] hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none'}`}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    )
}

export default Button
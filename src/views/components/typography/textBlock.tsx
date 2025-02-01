
type TitleProps = {
    text: string;
    subText: string;
    className?: string
    textClassName?: string;
    subTextClassName?: string;
}
const TextBlock = (props: TitleProps) => {
    
    return (
      <div className={`flex flex-col ${props.className || ""}`}>
          <h1 className={props.textClassName ? props.textClassName : `text-3xl md:text-5xl leading-snug max-w-3xl dark:text-white text-gray-900`}>
              {props.text}
          </h1>
          <p className={props.subTextClassName ? props.subTextClassName : "my-5 lg:my-8 text-sm lg:text-base font-medium text-gray-700 dark:text-gray-300 max-w-lg mx-auto lg:mx-0"}>
              {props.subText}
          </p>
      </div>
    );
  };
  
export default TextBlock;
  
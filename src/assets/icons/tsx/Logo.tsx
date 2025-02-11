
import logo from "@assets/images/svg/logo.svg";


type LogoProps = {
  className: string
  src?: string;
}

const Logo = (props: LogoProps) => {
  return (
    <img className={props.className} src={props.src? props.src :logo}/>
  )
}

export default Logo
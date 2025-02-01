import {Icon} from "@iconify/react";

export function OtherSignUpOptions() {
    return (
        <div className={"Other-SignUp-Options"}>
            <div className="Option-Google-SignUp">
                <button type="button">
                    <Icon
                        icon={"flat-color-icons:google"}
                        height={"25px"}
                        width={"25px"}
                    />
                    <p>SignUp With Google</p>
                </button>
            </div>
            <div className="Option-Facebook-SignUp">
                <button type="button">
                    <Icon icon="logos:facebook" height={"30px"} width={"30px"} />
                    <p>SignUp With Facebook</p>
                </button>
            </div>
            <div className="Option-X-SignUp">
                <button type="button">
                    <Icon icon={"devicon:twitter"} height={"25px"} width={"25px"} />
                    <p>SignUp With Facebook</p>
                </button>
            </div>
        </div>
    );
};
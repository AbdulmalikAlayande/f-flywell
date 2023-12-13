
export function getRandomInt(min: number, max: number): number {
    const byteArray = new Uint32Array(1);
    let unitArray = window.crypto.getRandomValues(byteArray);
    console.log("unitArray", unitArray)
    const range = max - min + 1;
    const maxRange = Math.pow(2, 32) - 1;
    console.log("maxRange ==> ", maxRange);
    if (unitArray[0] >= Math.floor(maxRange / range) * range) {
      return getRandomInt(min, max);
    }
    return min + (byteArray[0] % range);
}
export const modalStyle: ReactModal.Styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50vw",
    height: "85vh",
    backgroundColor: "powderblue",
    border: "none",
    borderRadius: "5px",
    borderStyle: "solid",
    borderColor: "white",
  },
};
const cloudName =  process.env.REACT_APP_CLOUD_NAME;
export const cloudinaryUploadUrl =  `https://api.cloudinary.com/v1_1/${cloudName}/image/upload/`;

const BASE_URL = 'http://localhost:8081/bola-air/api/v3/';
export const loginUrl: URL = new URL( BASE_URL+'login-customer')
export const signUpUrl: URL = new URL(BASE_URL+'register-customer/')
export const userTripUrl: URL = new URL(BASE_URL+`${localStorage.getItem("email")}/trips`)
export const emailPattern: string = '/^[a-z0-9._%±]+@(gmail|yahoo|outlook|hotmail|aol|icloud|mail|msn|live|yandex)\.com$/i';
export const emailPattern2 = '^[a-zA-Z0-9._%+-]+@gmail\.com$/i'

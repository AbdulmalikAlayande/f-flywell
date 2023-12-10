
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
const BASE_URL = 'http://localhost:8081/bola-air/api/v3/';
export const loginUrl: URL = new URL( BASE_URL+'login-customer')
export const signUpUrl: URL = new URL(BASE_URL+'register-customer/')
export const emailPattern: string = '/^[a-z0-9._%±]+@(gmail|yahoo|outlook|hotmail|aol|icloud|mail|msn|live|yandex)\.com$/i';
export const emailPattern2 = '^[a-zA-Z0-9._%+-]+@gmail\.com$/i'



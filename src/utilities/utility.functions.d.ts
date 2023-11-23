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

export function rand(min: number, max: number) {
    // add 1 to make it an inclusive range
    const dif = max - min + 1;
    return Math.floor(Math.random() * dif) + min;
}

// WIDTHS
const DEFAULT_WIDTH = 3;
const width = new Map();

width.set("/",2);

export const getNumWidth = char => {
    return width.get(char) ?? DEFAULT_WIDTH;
}

// FRAMES

export const numFrameMap = new Map();

[
    "abcdefghijklmnopqrstuvwxyz",
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    "0123456789/âê",
    ".!-,?'çôà ___",
    "áéíóúÁÉÍÓÚã _"

].join("").split("").forEach((char,index) => {
    numFrameMap.set(char,index)
})

export const getNumberFrame = (char) => {
    return numFrameMap.get(char) ?? 0
}

export default function getDeduplicatedTropesArray(
    arr: BookTropes,
    trope: string,
): BookTropes {
    /** Returns an array with deduplicated & sorted values, example: input `trope: "IMMACAP"` will replace existing `arr: "ImACap"` */
    const newArr: BookTropes = []
    for (let i = 0; i < arr.length; i++) {
        if (trope.trim().toLowerCase() !== arr[i].trim().toLowerCase()) {
            newArr.push(arr[i])
        }
    }
    newArr.push(trope)
    newArr.sort((a, b) => a.localeCompare(b))
    return newArr
}

export default function logError(
    functionName: string,
    fileName: string,
    lineNr: number,
    msgText?: string,
) {
    console.warn(
        "ERRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR Error caused! Function " +
            functionName +
            " in " +
            fileName +
            ":" +
            lineNr +
            ". " +
            (msgText ? msgText + "." : ""),
    )
}

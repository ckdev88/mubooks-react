// TODO check if there is redundancy in ./utils/formatInput.ts & ./utils/formatInputAuthor.ts

/**
 * Format author (input) by:
 *      capitalizing first letter per word,
 *      and if previous and next char is dot (.)
 * Example: j.f.k. rowling -> J.F.K. Rowling
 * */
export default function formatAuthor(input: string): BookAuthor {
    if (input.trim().length === 0) return ""

    const returnValue = input.trim()
    const returnValueArr: string[] = returnValue.split(" ")
    // apply simple capitalizing
    for (let i = 0; i < returnValueArr.length; i++) {
        let word = returnValueArr[i].slice(0, 1).toUpperCase() + returnValueArr[i].slice(1)
        // apply caps for initials, like B.f.g. Jackson > B.F.G. Jackson
        if (word.indexOf(".")) {
            const letters = word.split("")
            for (let j = 0; j < letters.length; j++) {
                if (letters[j - 1] === "." && letters[j + 1] === ".") {
                    letters[j] = letters[j].toUpperCase()
                }
            }
            word = letters.join("")
        }
        returnValueArr[i] = word
    }
    return returnValueArr.join(" ")
}

// TODO: this can be made faster by assigning the uppercase ASCII code, for ultimate optimization
function cleanInput(input: string, capfirst: boolean = false): string {
	if (input.length < 1) return ''
	input.trim()
	let returnvalue: string
	if (capfirst) returnvalue = input[0].toUpperCase() + input.slice(1)
	else returnvalue = input
	return returnvalue
}
function cleanAnchor(input: string): string {
	if (input.length < 1) return ''
	let returnvalue = ''

	let c
	for (let i = 0; i < input.length; i++) {
		c = input.charCodeAt(i)
		// change to hyphen if not part of alphanumerical ... 48=0, 57=9, 65=A, 90=Z, 97=a, 122=z
		if (c < 48 || (c > 57 && c < 65) || (c > 90 && c < 97) || c > 122) returnvalue += '-'
		else returnvalue += input[i]
	}
	return returnvalue
}
export { cleanInput, cleanAnchor }

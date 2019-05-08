export function getFixedNumber (str) {
  let num = 0
  for (let i = 0; i < str.length; i++) {
    num += str.charCodeAt(i)
  }
  return num
}

export function getFixedNumber (str) {
  let num = 0
  for (let i = 0; i < str.length; i++) {
    num += str.charCodeAt(i)
  }
  return num
}

export function strJoin (arr, split) {
  if (arr.length === 0) {
    return ''
  }
  let str = arr[0]
  if (arr.length > 1) {
    for (let i = 1; i < arr.length; i++) {
      str += `,${arr[i]}`
    }
  }
  return str
}

const pad2 = (number) => {
  return (number < 10 ? '0' : '') + String(number)
}

const generateTimestamp = () => {
  const dateNow = new Date()

  return (
    dateNow.getFullYear() +
    pad2(dateNow.getMonth() + 1) +
    pad2(dateNow.getDate()) +
    pad2(dateNow.getHours()) +
    pad2(dateNow.getMinutes()) +
    pad2(dateNow.getSeconds()) +
    pad2(dateNow.getMilliseconds()).substring(0, 2)
  )
}

const generateCheckSum = (timestamp) => {
  const wages = [1, 3, 7, 9]

  const sumTimestampWagesMod10 =
    timestamp.split('').reduce((acc, t, i) => {
      return acc + t * wages[i % 4]
    }, 0) % 10

  return sumTimestampWagesMod10 === 0 ? 0 : 10 - sumTimestampWagesMod10
}

module.exports = () => {
  const timestamp = generateTimestamp()

  return 'PO-' + timestamp + generateCheckSum(timestamp)
}

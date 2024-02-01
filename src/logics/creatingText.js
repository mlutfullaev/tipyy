import { useSelector } from 'react-redux'
import textLibrary from '@/assets/textLibrary.json'
export function createText (settings, length) {
  // const { settings, length } = useSelector(state => state.slice)
  const text = []
  let quantity = 0;

  while (length > quantity) {
    let numberRnd = random(3)
    let numberSpace = numberRnd ? random(numberRnd) : false
    let wordRnd = random(6)
    let wordSpace = wordRnd > 2 ? random(wordRnd - 2) + 2 : false
    let symbolRnd = random(2)
    let symbolSpace = symbolRnd ? random(symbolRnd) : false

    if (settings.words) {
      for (let i = 0; i <= wordRnd; i++) {
        text.push(textLibrary.words[random(textLibrary.words.length)])
        quantity++
        if (i === wordSpace) {
          quantity++
          text.push(' ')
        }
      }
    }
    if (settings.numbers) {
      for (let i = 0; i <= numberRnd; i++) {
        text.push(textLibrary.numbers[random(textLibrary.numbers.length)])
        quantity++
        if (i === numberSpace) {
          quantity++
          text.push(' ')
        }
      }
    }
    if (settings.symbols) {
      for (let i = 0; i <= symbolRnd; i++) {
        text.push(textLibrary.symbols[random(textLibrary.symbols.length)])
        quantity++
        if (i === symbolSpace) {
          quantity++
          text.push(' ')
        }
      }
    }
    if (!Object.values(settings).includes(true)) {
      quantity = length
      return 'select'
    }
  }

  return text
}

function random(num) {
  return Math.floor(Math.random() * num)
}


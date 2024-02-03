import textLibrary from '@/assets/textLibrary.json'
export function createText (settings, length) {
  const text = []
  let space = 0;

  while (settings.space.selected > space) {
    let numberRnd = random(3)
    let numberSpace = numberRnd ? random(numberRnd) : false
    let wordRnd = random(6)
    let wordSpace = wordRnd > 2 ? random(wordRnd - 2) + 2 : false
    let symbolRnd = random(2)
    let symbolSpace = symbolRnd ? random(symbolRnd) : false
    const codesRnd = random(2)

    if (settings.words.selected) {
      for (let i = 0; i <= wordRnd; i++) {
        pushRnd(textLibrary.words[settings.words.selected], text)
        if (i === wordSpace) {
          space++
          text.push(' ')
        }
      }
    }
    if (settings.numbers) {
      for (let i = 0; i <= numberRnd; i++) {
        pushRnd(textLibrary.numbers, text)
        if (i === numberSpace) {
          space++
          text.push(' ')
        }
      }
    }
    if (settings.symbols) {
      for (let i = 0; i <= symbolRnd; i++) {
        pushRnd(textLibrary.symbols, text)
        if (i === symbolSpace) {
          space++
          text.push(' ')
        }
      }
    }
    if (settings.codes.selected) {
      for (let i = 0; i <= codesRnd; i++) {
        pushRnd(textLibrary.codes[settings.codes.selected], text)
        space++
      }
    }
    if (!text.length) {
      space = length
      return []
    }
  }

  console.log(text)
  return text
}

function random(num) {
  return Math.floor(Math.random() * num)
}

function pushRnd(array, text) {
  const el = array[random(array.length)]
  if (el.length > 1) {
    el.split('').forEach(t => text.push(t))
    text.push(' ')
  } else {
    text.push(el)
  }
}

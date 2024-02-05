import textLibrary from '@/assets/textLibrary.json'
export function createText ({ settings, language, words }) {
  let text = []
  let space = 0;

  while (words.selected > space) {
    let numberRnd = random(3)
    let numberSpace = numberRnd ? random(numberRnd) : false
    let charRnd = random(6)
    let charSpace = charRnd > 2 ? random(charRnd - 2) + 2 : false
    let wordRnd = random(3)
    let symbolRnd = random(2)
    let symbolSpace = symbolRnd ? random(symbolRnd) : false
    const codesRnd = random(2)

    switch (settings.letter.selected) {
      case 'chars':
        for (let i = 0; i <= charRnd; i++) {
          pushRnd(textLibrary.letter[language.selected].chars, text)
          if (i === charSpace) {
            space++
            text.push(' ')
          }
        }
        break;
      case 'words':
        for (let i = 0; i <= wordRnd; i++) {
          pushRnd(textLibrary.letter[language.selected].words, text)
          space++
        }
        break;
      case 'mixed':
        const rnd = random(3)
        if (rnd === 2) {
          for (let i = 0; i <= wordRnd; i++) {
            pushRnd(textLibrary.letter[language.selected].words, text)
            space++
          }
        } else {
          for (let i = 0; i <= charRnd; i++) {
            pushRnd(textLibrary.letter[language.selected].chars, text)
            if (i === charSpace) {
              space++
              text.push(' ')
            }
          }
        }
        break;
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

  if (text[text.length - 1] === ' ') {
    text = text.slice(0, -1)
  }

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

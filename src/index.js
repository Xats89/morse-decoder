const MORSE_TABLE = {
    '.-':     'a',
    '-...':   'b',
    '-.-.':   'c',
    '-..':    'd',
    '.':      'e',
    '..-.':   'f',
    '--.':    'g',
    '....':   'h',
    '..':     'i',
    '.---':   'j',
    '-.-':    'k',
    '.-..':   'l',
    '--':     'm',
    '-.':     'n',
    '---':    'o',
    '.--.':   'p',
    '--.-':   'q',
    '.-.':    'r',
    '...':    's',
    '-':      't',
    '..-':    'u',
    '...-':   'v',
    '.--':    'w',
    '-..-':   'x',
    '-.--':   'y',
    '--..':   'z',
    '.----':  '1',
    '..---':  '2',
    '...--':  '3',
    '....-':  '4',
    '.....':  '5',
    '-....':  '6',
    '--...':  '7',
    '---..':  '8',
    '----.':  '9',
    '-----':  '0',
};
function decode(expr) {
  
//разбиваю строку в массив arr1
    let arr1 = expr.split('')

//закидываю по 10 символов в arr2, т.к. по заданию "Each encoded **letter's length is 10**."
    let arr2 = []
    while(arr1.length) arr2.push(arr1.splice(0, 10))

//убираю из подмассивов лишние "0" и оставляю две "*" вместо десяти.
    arr2.forEach((value)=>{
      value.splice(0, value.indexOf("1"))
      if (value.includes('*')) value.length = 2
    })

//создаю массив arr3, по структуре такойже как arr2, чтобы в массивы второго уровня положить подмассивы, содержащие "10", "11" или "**"
    let arr3 = []
    for(let i =0; i<arr2.length; i++) arr3.push([])

//ложу в arr3 разделенные по 2 значения элементы из arr2
    arr2.forEach((value, id) => {
      while(value.length) arr3[id].push(value.splice(0, 2))
    })

//создаю массив arr4, по структуре такойже как arr3
    let arr4 = []
    for(let i =0; i<arr3.length; i++) arr4.push([])
      
    arr3.forEach((value,id) => {
      for(let i =0; i<value.length; i++) arr4[id].push([])
    })

//складываю значения в подмассивах arr3 (['1', '0'] перевожу в ['10']), и следом меняю "11" на "-",  "10" на "." и "**" на " ", и ложу всё в arr4
    arr3.forEach((value, id) => {
      value.forEach((prop, key) => {
        arr4[id][key].push(prop.reduce((total, property) => total + property).replaceAll('11', '-').replaceAll('10', '.').replaceAll('**', ' '))
      })
    })
      
    let arr5 = []

//в arr5 кложу объедененные в подмассив "." и "-"  
    arr4.forEach((value) => {
      arr5.push(value.flat().reduce((acc, val) => acc+val))
    })

  let result =''

//перевожу объедененные  "." и "-" в буквы и цифры
  arr5.forEach((value) => {
    if (value === ' ') result += value //отдельно проверка на " ", т.к. в начальном объекте MORSE_TABLE его нет.
      for (let key in MORSE_TABLE) {
          if (value === key) result += value.replace(value, MORSE_TABLE[key])
        }
  })

  return result
}

module.exports = {
    decode
}
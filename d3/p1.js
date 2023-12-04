const fs = require("fs");

const specialCharArray = [
  "$",
  "&",
  "+",
  ",",
  ":",
  ";",
  "=",
  "?",
  "@",
  "#",
  "|",
  "'",
  "<",
  ">",
  "-",
  "^",
  "*",
  "(",
  ")",
  "%",
  "!",
  "/",
  "\\",
];

fs.readFile("./source.txt", { encoding: "utf-8" }, function (err, data) {
  if (!err) {
    let cpt = 0;
    const splittedData = data.split("\n");
    for (let i = 0; i < splittedData.length; i++) {
      console.log("line", i);
      const currentLine = splittedData[i];
      const previousLine = splittedData[i - 1];
      const nextLine = splittedData[i + 1];

      const numbers = [];
      const numberThatMatched = [];

      const numbersMatchAll = [...splittedData[i].matchAll(/\d+/g)];

      for (numberMatch of numbersMatchAll) {
        numbers.push({
          number: numberMatch[0],
          start: numberMatch.index,
          end: numberMatch.index + numberMatch[0].length - 1,
        });
      }

      for (k in numbers) {
        const { start, end, number } = numbers[k];

        if (
          specialCharArray.includes(currentLine[start - 1]) ||
          specialCharArray.includes(currentLine[end + 1])
        ) {
          numberThatMatched.push(number);
        }

        if (previousLine) {
          for (let z = start - 1; z <= end + 1; z++) {
            if (specialCharArray.includes(previousLine[z])) {
              numberThatMatched.push(number);
            }
          }
        }
        if (nextLine) {
          for (let z = start - 1; z <= end + 1; z++) {
            if (specialCharArray.includes(nextLine[z])) {
              numberThatMatched.push(number);
            }
          }
        }
      }

      const numberToAdd = numberThatMatched.reduce((acc, number) => {
        return acc + parseInt(number);
      }, 0);

      cpt += numberToAdd;
    }
    console.log(cpt);
  } else {
    console.log(err);
  }
});

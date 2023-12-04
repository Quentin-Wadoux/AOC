const fs = require("fs");

const numbers = {
  o1e: "one",
  t2o: "two",
  t3e: "three",
  f4r: "four",
  f5e: "five",
  s6x: "six",
  s7n: "seven",
  e8t: "eight",
  n9e: "nine",
  z0o: "zero",
};

fs.readFile("./source.txt", { encoding: "utf-8" }, function (err, data) {
  if (!err) {
    let cpt = 0;
    const splittedData = data.split("\n");
    for (let i = 0; i < splittedData.length; i++) {
      let splittedDataReplaced = splittedData[i];
      for (number in numbers) {
        splittedDataReplaced = splittedDataReplaced.replaceAll(
          numbers[number],
          number
        );
      }
      const findedNumbers = splittedDataReplaced.match(/[0-9]+/g);
      first = findedNumbers[0][0];
      last = findedNumbers[findedNumbers.length - 1].slice(-1);
      const finalNumber = first + last;
      cpt += parseInt(finalNumber);
      console.log(
        i,
        splittedData[i],
        splittedDataReplaced,
        first,
        last,
        finalNumber,
        cpt
      );
    }
    console.log(cpt);
  } else {
    console.log(err);
  }
});

const fs = require("fs");

const search = (line, regex) => {
  const table = [];

  if (line === undefined) return table;

  const lineMatch = [...line.matchAll(regex)];

  for (match of lineMatch) {
    table.push({
      value: match[0],
      start: match.index,
      end: match.index + match[0].length - 1,
    });
  }

  return table;
};

fs.readFile("./source.txt", { encoding: "utf-8" }, function (err, data) {
  if (!err) {
    let cpt = 0;
    const splittedData = data.split("\n");
    for (let i = 0; i < splittedData.length; i++) {
      console.log("line", i);
      const currentLine = splittedData[i];
      const previousLine = splittedData[i - 1];
      const nextLine = splittedData[i + 1];

      const multiplierTable = search(currentLine, /\*/g);
      const numbersInCurrentLine = search(currentLine, /\d+/g);
      const numbersInPreviousLine =
        currentLine !== undefined ? search(previousLine, /\d+/g) : [];
      const numbersInNextLine =
        nextLine !== undefined ? search(nextLine, /\d+/g) : [];

      for (multiplier in multiplierTable) {
        const matchingNumbers = [];
        const { start } = multiplierTable[multiplier];

        const matchingNumbersInCurrentLine = numbersInCurrentLine.filter(
          (number) => number.end === start - 1 || number.start === start + 1
        );

        const matchingNumbersInPreviousLine = numbersInPreviousLine.filter(
          (number) =>
            number.end === start - 1 ||
            number.start === start + 1 ||
            (number.start <= start && number.end >= start)
        );

        const matchingNumbersInNextLine = numbersInNextLine.filter(
          (number) =>
            number.end === start - 1 ||
            number.start === start + 1 ||
            (number.start <= start && number.end >= start)
        );

        matchingNumbers.push(
          ...matchingNumbersInCurrentLine,
          ...matchingNumbersInPreviousLine,
          ...matchingNumbersInNextLine
        );

        console.log({ matchingNumbers });

        if (matchingNumbers.length === 2) {
          cpt +=
            parseInt(matchingNumbers[0].value) *
            parseInt(matchingNumbers[1].value);
        }
      }
    }
    console.log(cpt);
  } else {
    console.log(err);
  }
});

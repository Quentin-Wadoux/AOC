const fs = require("fs");

fs.readFile("./source.txt", { encoding: "utf-8" }, function (err, data) {
  if (!err) {
    let cpt = 0;
    const splittedData = data.split("\n");
    for (let i = 0; i < splittedData.length; i++) {
      const firstSplit = splittedData[i].split(":");
      const secondSplit = firstSplit[1].split("|");
      const winningNumber = secondSplit[0].match(/\d+/g);
      const number = secondSplit[1].match(/\d+/g);
      const winningNumberInNumber = number.filter((n) =>
        winningNumber.includes(n)
      );
      const localCpt = winningNumberInNumber.reduce((acc, n) => {
        return acc === 0 ? 1 : acc * 2;
      }, 0);
      cpt += parseInt(localCpt);
    }
    console.log(cpt);
  } else {
    console.log(err);
  }
});

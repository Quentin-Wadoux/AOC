const fs = require("fs");

fs.readFile("./source.txt", { encoding: "utf-8" }, function (err, data) {
  if (!err) {
    let cpt = 0;
    const splittedData = data.split("\n");
    for (let i = 0; i < splittedData.length; i++) {
      const numbers = splittedData[i].match(/[0-9]+/g);
      first = numbers[0][0];
      last = numbers[numbers.length - 1].slice(-1);
      const number = first + last;
      cpt += parseInt(number);
    }
    console.log(cpt);
  } else {
    console.log(err);
  }
});

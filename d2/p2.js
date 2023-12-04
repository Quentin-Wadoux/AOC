const fs = require("fs");

const numberOfCubes = {
  red: 12,
  green: 13,
  blue: 14,
};

fs.readFile("./source.txt", { encoding: "utf-8" }, function (err, data) {
  if (!err) {
    let cpt = 0;
    const splittedData = data.split("\n");
    for (let i = 0; i < splittedData.length; i++) {
      const split = splittedData[i].split(":");
      const gameId = split[0].split(" ")[1];
      const partOfGames = split[1].split(";");
      let blue = 0;
      let red = 0;
      let green = 0;
      for (let j = 0; j < partOfGames.length; j++) {
        const partOfGame = partOfGames[j].split(",");
        for (let k = 0; k < partOfGame.length; k++) {
          const temp = partOfGame[k].split(" ");
          const number = parseInt(temp[1]);
          const color = temp[2];
          switch (color) {
            case "red":
              if (number > red) red = parseInt(number);
              break;
            case "green":
              if (number > green) green = parseInt(number);
              break;
            case "blue":
              if (number > blue) blue = parseInt(number);
              break;
            default:
              break;
          }
        }
      }

      cpt += parseInt(red * green * blue);
    }
    console.log(cpt);
  } else {
    console.log(err);
  }
});

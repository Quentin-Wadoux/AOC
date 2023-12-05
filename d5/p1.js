const fs = require("fs");

function createMap(splittedData) {
  const map = {};
  for (let i = 1; i < splittedData.length; i++) {
    const splitted = splittedData[i].split("\n");
    const splittedMapName = splitted[0].split(" ")[0].split("-");
    const from = splittedMapName[0];
    const to = splittedMapName[2];

    for (let j = 1; j < splitted.length; j++) {
      const splittedLine = splitted[j].split(" ");
      const destinationRangeStart = parseInt(splittedLine[0]);
      const sourceRangeStart = parseInt(splittedLine[1]);
      const rangeLength = parseInt(splittedLine[2]);

      if (map[from + "-" + to] === undefined) {
        map[from + "-" + to] = [];
      }

      map[from + "-" + to].push({
        destinationRangeStart,
        sourceRangeStart,
        rangeLength,
      });
    }
  }

  return map;
}

fs.readFile("./source.txt", { encoding: "utf-8" }, function (err, data) {
  if (!err) {
    const splittedData = data.split("\n\n");
    const seedsList = splittedData[0].split(":")[1].trim().split(" ");

    const map = createMap(splittedData);

    const locations = [];

    for (let i = 0; i < seedsList.length; i++) {
      const seed = seedsList[i];
      locations.push(
        Object.keys(map).reduce((acc, key) => {
          for (let z = 0; z < map[key].length; z++) {
            const { sourceRangeStart, destinationRangeStart, rangeLength } =
              map[key][z];
            if (
              acc >= sourceRangeStart &&
              acc < sourceRangeStart + rangeLength
            ) {
              return destinationRangeStart + (acc - sourceRangeStart);
            }
          }
        }, seed)
      );
    }

    let minLocation = locations.reduce((acc, location) => {
      return location < acc ? location : acc;
    }, locations[0]);

    console.log(minLocation);
  } else {
    console.log(err);
  }
});

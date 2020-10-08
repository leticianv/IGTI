import { promises as fs } from 'fs';

var estados = null;
var cidades = null;

// Exercicio 1
//readAndWriteJsonFile();

// Exercicio 2
console.log('Exercicio 2:');
(async () => {
  console.log(await countCitiesByUF('MG'));
})();

// Exercicio 3
//printStatesWithMoreCities();

// Exercicio 4
//printStatesWithLessCities();

// Exercicio 5
//printCitiesLongNameByStates();

// Exercicio 6
//printCitiesShortNameByStates();

// Exercicio 7
printCityBiggerName();

async function readAndWriteJsonFile() {
  try {
    estados = JSON.parse(await fs.readFile('Estados.json'));
    //console.log(estados);
    cidades = JSON.parse(await fs.readFile('Cidades.json'));
    //console.log(cidades);

    estados.map((UF) => {
      let fileName = './arquivos/' + UF.Sigla + '.json';
      console.log(fileName);

      let contentFile = cidades.filter((cidade) => cidade.Estado === UF.ID);
      console.log(contentFile);
      fs.writeFile(fileName, JSON.stringify(contentFile));
    });
  } catch (err) {
    console.log(err);
  }
}

async function countCitiesByUF(uf) {
  try {
    const fileName = './arquivos/' + uf + '.json';

    const cidades = JSON.parse(await fs.readFile(fileName));
    const count = Object.keys(cidades).length;
    return count;
  } catch (err) {
    console.log(err);
  }
}

async function printStatesWithMoreCities() {
  try {
    estados = JSON.parse(await fs.readFile('Estados.json'));
    estados = estados.map(async (UF) => {
      UF.total = await countCitiesByUF(UF.Sigla);
      return UF;
    });
    estados = await Promise.all(estados);

    estados = estados.sort((a, b) => b.total - a.total);
    const statesMoreCities = estados.slice(0, 5).map((uf) => {
      return uf.Sigla + '-' + uf.total;
    });

    const ufsMore = estados.slice(0, 5);
    const total = ufsMore.reduce((acc, city) => {
      return acc + city.total;
    }, 0);
    console.log('Exercicio 3 (Estados com mais cidades):');
    console.log(statesMoreCities);
    return statesMoreCities;
  } catch (err) {
    console.log(err);
  }
}

async function printStatesWithLessCities() {
  try {
    estados = JSON.parse(await fs.readFile('Estados.json'));
    estados = estados.map(async (UF) => {
      UF.total = await countCitiesByUF(UF.Sigla);
      return UF;
    });
    estados = await Promise.all(estados);

    estados = estados.sort((a, b) => a.total - b.total);
    const statesMoreCities = estados.slice(0, 5).map((uf) => {
      return uf.Sigla + '-' + uf.total;
    });

    const ufsMore = estados.slice(0, 5);
    const total = ufsMore.reduce((acc, city) => {
      return acc + city.total;
    }, 0);
    console.log('Exercicio 4 (Estados com menos cidades):');
    console.log(statesMoreCities);
    return statesMoreCities;
  } catch (err) {
    console.log(err);
  }
}

// Exercicio 5
async function printCitiesLongNameByStates() {
  try {
    estados = JSON.parse(await fs.readFile('Estados.json'));
    console.log('Exercicio 5:');
    estados.map(async (UF) => {
      let fileName = './arquivos/' + UF.Sigla + '.json';
      const cidades = JSON.parse(await fs.readFile(fileName));
      var city = await getCityGreaterNameLength(cidades, UF.Sigla);
      console.log(city + '-' + UF.Sigla);
    });
  } catch (err) {
    console.log(err);
  }
}

// Exercicio 6
async function printCitiesShortNameByStates() {
  try {
    estados = JSON.parse(await fs.readFile('Estados.json'));
    console.log('Exercicio 6:');
    estados.map(async (UF) => {
      let fileName = './arquivos/' + UF.Sigla + '.json';
      const cidades = JSON.parse(await fs.readFile(fileName));
      var city = await getCityShortNameLength(cidades, UF.Sigla);
      console.log(city + '-' + UF.Sigla);
    });
  } catch (err) {
    console.log(err);
  }
}

async function printCityBiggerName() {
  try {
    estados = JSON.parse(await fs.readFile('Estados.json'));
    console.log('Exercicio 7:');
    var cities = estados.map(async (UF) => {
      let fileName = './arquivos/' + UF.Sigla + '.json';
      const cidades = JSON.parse(await fs.readFile(fileName));
      var city = getCityGreaterNameLength(cidades, UF.Sigla);
      return city;
    });
    cities = await Promise.all(cities);
    cities = cities.sort(function (city1, city2) {
      if (city1.nameLenght < city2.nameLenght) return 1;
      if (city1.nameLenght > city2.nameLenght) return -1;
      if (city1.Nome > city2.Nome) return 1;
      if (city1.Nome < city2.Nome) return -1;
    });
    const greatherCity = cities.slice(0, 1).map((city) => {
      return city[0];
    });
    console.log(greatherCity);
  } catch (err) {
    console.log(err);
  }
}

async function getCityGreaterNameLength(cities, uf) {
  cities = cities.map(async (city) => {
    city.nameLenght = city.Nome.length;
    return city;
  });
  cities = await Promise.all(cities);
  cities = cities.sort(function (city1, city2) {
    if (city1.nameLenght < city2.nameLenght) return 1;
    if (city1.nameLenght > city2.nameLenght) return -1;
    if (city1.Nome > city2.Nome) return 1;
    if (city1.Nome < city2.Nome) return -1;
  });
  const greatherCity = cities.slice(0, 1).map((city) => {
    return city.Nome;
  });

  return greatherCity;
}

async function getCityShortNameLength(cities, uf) {
  cities = cities.map(async (city) => {
    city.nameLenght = city.Nome.length;
    return city;
  });
  cities = await Promise.all(cities);
  cities = cities.sort(function (city1, city2) {
    if (city1.nameLenght > city2.nameLenght) return 1;
    if (city1.nameLenght < city2.nameLenght) return -1;
    //    if (city1.Nome > city2.Nome) return 1;
    //    if (city1.Nome < city2.Nome) return -1;
  });
  const shortCity = cities.slice(0, 1).map((city) => {
    return city.Nome;
  });

  return shortCity;
}

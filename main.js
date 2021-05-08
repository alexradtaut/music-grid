// Classes
class AngajatIT {
  constructor(cnp, nume, prenume, vechime, departament) {
    this.cnp = cnp;
    this.nume = nume;
    this.prenume = prenume;
    this.vechime = vechime;
    this.departament = departament;
  }

  afiseazaVarsta() {
    const dataNasterii = new Date(
      this.cnp.substring(3, 5) +
        '-' +
        this.cnp.substring(5, 7) +
        '-' +
        this.cnp.substring(1, 3)
    );
    console.log(
      `${this.nume} ${this.prenume} are ${
        new Date().getFullYear() - dataNasterii.getFullYear()
      } ani`
    );
  }

  afiseazaAnulAngajarii() {
    console.log(
      `${this.nume} ${this.prenume} s-a angajat in anul ${
        new Date().getFullYear() - this.vechime
      }`
    );
  }

  lucreaza() {
    console.log('Neimplementat');
  }
}

const angajat = new AngajatIT('1101025102400', 'John', 'Doe', 7, '');
angajat.afiseazaAnulAngajarii();
angajat.afiseazaVarsta();
angajat.lucreaza();

class QA extends AngajatIT {
  constructor(cnp, nume, prenume, vechime, departament) {
    super(cnp, nume, prenume, vechime, departament);
  }

  lucreaza() {
    console.log(`${this.nume} ${this.prenume} testează software`);
  }
}
class Developer extends AngajatIT {
  constructor(cnp, nume, prenume, vechime, departament) {
    super(cnp, nume, prenume, vechime, departament);
  }

  lucreaza() {
    console.log(`${this.nume} ${this.prenume} scrie cod`);
  }
}

const angajatQA = new QA('1111025102400', 'Jane', 'Doe', 6, 'Web');
angajatQA.afiseazaAnulAngajarii();
angajatQA.afiseazaVarsta();
angajatQA.lucreaza();

const angajatDev = new Developer('1121025102400', 'Will', 'Smith', 5, 'QA');
angajatDev.afiseazaAnulAngajarii();
angajatDev.afiseazaVarsta();
angajatDev.lucreaza();

//API + DOM
const URL = 'https://randomuser.me/api/';

const fetchData = async () => {
  const result = await fetch(URL);
  const data = await result.json();
  console.log(result, data);
  document
    .getElementById('picture')
    .setAttribute('src', data.results[0].picture.medium);
  document
    .getElementById('name')
    .setAttribute(
      'value',
      data.results[0].name.first + ' ' + data.results[0].name.last
    );
  document
    .getElementById('gender')
    .setAttribute('value', data.results[0].gender);
  document.getElementById('email').setAttribute('value', data.results[0].email);
  document.getElementById('age').setAttribute('value', data.results[0].dob.age);
};

document.getElementById('fetch').addEventListener('click', fetchData);

//Functions
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

for (let i = 0; i < array.length; i++) {
  console.log(array[i] + array[i] * 15);
}

array.forEach((e) => {
  console.log(e + e * 15);
});

function destructure() {
  return array.map((a) => {
    return parseInt(a.toString() + a.toString());
  });
}

const [a, b, c, d, e, f, g, h, i, j] = destructure();
console.log(
  'new array: ',
  [a, b, c, d, e, f, g, h, i, j],
  '\n',
  'old array: ',
  array
);

'use strict';

//  Selectores HTML

const selectNameArray = document.querySelectorAll('.winners-btn-select');
const winner1 = document.querySelector('.js-select1');
const winner2 = document.querySelector('.js-select2');
const winner3 = document.querySelector('.js-select3');
const btnSubmit = document.querySelector('.js-btn');
const stickerList = document.querySelector('.js-sticker-list');

let adalabers = [
  {
    name: 'Adhara',
    id: 0,
    quantity: 0,
  },
  {
    name: 'Beatriz',
    id: 1,
    quantity: 0,
  },
  {
    name: 'Belén',
    id: 2,
    quantity: 0,
  },
  {
    name: 'Cristina',
    id: 3,
    quantity: 0,
  },
  {
    name: 'Eva',
    id: 4,
    quantity: 0,
  },
  {
    name: 'Gloria',
    id: 5,
    quantity: 0,
  },
  {
    name: 'Grisel',
    id: 6,
    quantity: 0,
  },
  {
    name: 'Jesica',
    id: 7,
    quantity: 0,
  },
  {
    name: 'Margui',
    id: 8,
    quantity: 0,
  },
  {
    name: 'María José',
    id: 9,
    quantity: 0,
  },
  {
    name: 'Marina',
    id: 10,
    quantity: 0,
  },
  {
    name: 'Marta',
    id: 11,
    quantity: 0,
  },
  {
    name: 'Natalia',
    id: 12,
    quantity: 0,
  },
  {
    name: 'Patricia',
    id: 13,
    quantity: 0,
  },
  {
    name: 'Raquel',
    id: 14,
    quantity: 0,
  },
  {
    name: 'Rosanna',
    id: 15,
    quantity: 0,
  },
  {
    name: 'Sara Juárez',
    id: 16,
    quantity: 0,
  },
  {
    name: 'Sara Martín',
    id: 17,
    quantity: 0,
  },
  {
    name: 'Silvia',
    id: 18,
    quantity: 0,
  },
  {
    name: 'Violeta',
    id: 19,
    quantity: 0,
  },
];

// getApiData();

// peticiones al servidor myjson https://api.myjson.com/bins/jbptk
// function getApiData() {
//   fetch('https://api.myjson.com/bins/jbptk')
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       adalabers = data;
//       createSelect(adalabers);
//       paintNames();
//     });
// }

// function putData() {
//   fetch('https://api.myjson.com/bins/jbptk', {
//     method: 'PUT',
//     mode: 'cors',
//     redirect: 'follow',
//     body: JSON.stringify(adalabers),
//     headers: new Headers({
//       'Content-Type': 'application/json; charset=utf-8',
//     }),
//   }).then(function (error) {
//     console.log(error);
//   });
// }

createSelect();

//  bucle para hacer 3 select
function createSelect() {
  for (const selectName of selectNameArray) {
    paintAdalabersNames(selectName);
  }
}

//  función para crear el select con todas las adalabers como opción
function paintAdalabersNames(selectName) {
  for (const adalaber of adalabers) {
    const listElement = document.createElement('option');
    const listElementContent = document.createTextNode(`${adalaber.name}`);
    listElement.value = adalaber.id;
    listElement.appendChild(listElementContent);
    selectName.appendChild(listElement);
  }
}

let adalabersLS = [];
getDataLS();

function getDataLS() {
  adalabersLS = JSON.parse(localStorage.getItem('adalabers'));
  if (adalabersLS !== null) {
    paintNames(adalabersLS);
  }
}

//  función para conseguir los ID de las ganadoras
function saveResults() {
  if (adalabersLS !== null) {
    adalabers = adalabersLS;
  }
  const win1 = winner1.value;
  const win2 = winner2.value;
  const win3 = winner3.value;
  adalabers[win1].quantity += 1;
  adalabers[win3].quantity += 1;
  adalabers[win2].quantity += 1;
  // putData();
  localStorage.setItem('adalabers', JSON.stringify(adalabers));
  getDataLS();
  paintNames(adalabersLS);
}

// Ejecutamos función de pintar con las ganadoras del Local Storage

function paintNames() {
  stickerList.innerHTML = '';
  for (const adalaber of adalabersLS) {
    if (adalaber.quantity !== 0) {
      const stickerElement = document.createElement('li');
      stickerList.appendChild(stickerElement);
      stickerElement.setAttribute('class', 'section-list-el');
      const stickerListContent = document.createTextNode(
        `Pegatinas para ${adalaber.name}: ${adalaber.quantity}`
      );
      stickerElement.appendChild(stickerListContent);
    }
  }
}

// // listenner
btnSubmit.addEventListener('click', saveResults);

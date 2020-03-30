'use strict';

//  Selectores HTML

const selectNameArray = document.querySelectorAll('.select-btn');
const winner1 = document.querySelector('.js-select1');
const winner2 = document.querySelector('.js-select2');
const winner3 = document.querySelector('.js-select3');
const btnSubmit = document.querySelector('.js-btn');
const stickerList = document.querySelector('.js-sticker-list');

let adalabers;
getApiData();

// peticiones al servidor https://api.myjson.com/bins/qkqfc
function getApiData() {
  fetch('https://api.myjson.com/bins/jbptk')
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      adalabers = data;
      createSelect(adalabers);
      paintNames();
    });
}

function putData() {
  fetch('https://api.myjson.com/bins/jbptk', {
    method: 'PUT',
    mode: 'cors',
    redirect: 'follow',
    body: JSON.stringify(adalabers),
    headers: new Headers({
      'Content-Type': 'application/json; charset=utf-8'
    })
  }).then(function(error) {
    console.log(error);
  });
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

//  bucle para hacer 3 select
function createSelect() {
  for (const selectName of selectNameArray) {
    paintAdalabersNames(selectName);
  }
}

//  función para conseguir los ID de las ganadoras
function saveResults() {
  const win1 = winner1.value;
  const win2 = winner2.value;
  const win3 = winner3.value;
  adalabers[win1].quantity += 1;
  adalabers[win3].quantity += 1;
  adalabers[win2].quantity += 1;
  putData();
  paintNames();
}

// Ejecutamos función de pintar con las ganadoras del Local Storage

function paintNames() {
  stickerList.innerHTML = '';
  for (const adalaber of adalabers) {
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

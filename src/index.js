import { fetchBreerds, fetchCatByBreed } from "./cat-api.js"
import Notiflix from 'notiflix';
const elements = {
    breedSelect: document.querySelector('.breed-select'),
    loader: document.querySelector('.loader'),
    error: document.querySelector('.error'),
    catInfo: document.querySelector('.cat-info'),
}
elements.error.style.display = 'none';
elements.breedSelect.style.display = 'none';
elements.catInfo.style.display = 'none';

fetchBreerds().then((data) => {
    let ListOfCats = '<option disabled = "disabled" selected="selected">Select Cat</option>';
    ListOfCats += data.map(({ id, name }) => `<option value ="${id}">${name}</option>`).join("");
    elements.breedSelect.innerHTML = ListOfCats;
}).catch(() => {
    Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
    elements.error.style.display = 'block';
    elements.loader.style.display = 'none';
}).finally(() => {
    elements.loader.style.display = 'none';
    elements.breedSelect.style.display = 'block';
})

elements.breedSelect.addEventListener('change', handlerGetCat);

function handlerGetCat() {
    const catSelectedById = elements.breedSelect.value;
    elements.catInfo.style.display = 'none';
    elements.loader.style.display = 'block';
    elements.error.style.disaply = 'none';
    fetchCatByBreed(catSelectedById).then((data) => {
        console.log(data);
        elements.catInfo.style.display = 'block';
        elements.catInfo.innerHTML = createMarkup(data);
    }).catch(() => {
        Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
        elements.error.style.display = 'block';
        elements.loader.style.display = 'none';
    }).finally(() => {
        elements.loader.style.display = 'none';
    })
}

function createMarkup(array) {
    return array.map(({ url, breeds: [{ name, description, temperament }] }) => {
        return `<img src="${url}" alt="${name}" width="500px">
      <h2>${name}</h2>
      <h3>${temperament}</h3>
      <p>${description}</p>`
    }).join("");
};

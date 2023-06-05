import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const breedSelect = document.querySelector('.breed-select');
const catImage = document.querySelector('.cat-image');
const breedName = document.querySelector('.breed-name');
const description = document.querySelector('.description');
const temperament = document.querySelector('.temperament');
const loader = document.querySelector('.loader');
const catInfo = document.querySelector('.cat-info');
const error = document.querySelector('.error');

function showLoaderBreeds() {
  breedSelect.classList.add('hidden');
  loader.classList.add('visible');
}

function showLoaderCat() {
  catInfo.classList.add('hidden');
  loader.classList.add('visible');
}

function hideLoader() {
  loader.classList.remove('visible');
}

function showCatInfo(imageUrl, name, desc, temp) {
  catImage.src = imageUrl;
  breedName.textContent = name;
  description.textContent = desc;
  temperament.textContent = temp;
  catInfo.classList.remove('hidden');
}

function hideCatInfo() {
  catInfo.classList.add('hidden');
}

function showError() {
  error.classList.add('visible');
}

function hideError() {
  error.classList.remove('visible');
  breedSelect.style.display = 'block';
}

function populateBreedSelect(breeds) {
  breeds.forEach(breed => {
    const option = document.createElement('option');
    option.value = breed.id;
    option.textContent = breed.name;
    breedSelect.appendChild(option);
  });
}

// Handle breed select change event
function handleBreedSelectChange() {
  const selectedBreedId = breedSelect.value;

  if (selectedBreedId) {
    showLoaderCat();
    hideCatInfo();
    hideError();

    fetchCatByBreed(selectedBreedId)
      .then(cats => {
        const cat = cats[0];
        showCatInfo(
          cat.url,
          cat.breeds[0].name,
          cat.breeds[0].description,
          cat.breeds[0].temperament
        );
      })
      .catch(() => {
        showError();
      })
      .finally(() => {
        hideLoader();
      });
  } else {
    hideCatInfo();
  }
}

// Initialize the app
function initApp() {
  showLoaderBreeds();

  fetchBreeds()
    .then(breeds => {
      populateBreedSelect(breeds);
    })
    .catch(() => {
      showError();
    })
    .finally(() => {
      hideLoader();
      breedSelect.classList.remove('hidden');
    });

  breedSelect.addEventListener('change', handleBreedSelectChange);
}

initApp();

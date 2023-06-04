const apiKey =
  'live_fxNvOn1nwOAUHs0XTXBvqwVQbLTmBDTKVfTzDnjmOa3ERAUy2NxchVWrjM63YfPe';

export function fetchBreeds() {
  const url = 'https://api.thecatapi.com/v1/breeds';

  return fetch(url, {
    headers: {
      'x-api-key': apiKey,
    },
  })
    .then(response => response.json())
    .catch(error => {
      console.error('Error fetching breeds:', error);
      throw error;
    });
}

export function fetchCatByBreed(breedId) {
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;

  return fetch(url, {
    headers: {
      'x-api-key': apiKey,
    },
  })
    .then(response => response.json())
    .catch(error => {
      console.error('Error fetching cat by breed:', error);
      throw error;
    });
}

function fetchBreerds() {
    const BASE_URL = 'https://api.thecatapi.com/v1/breeds';
    return fetch(BASE_URL).then((responce) => {
        if (!responce.ok) {
            throw new Error(responce.statusText)
        }
        return responce.json();
    })
}
function fetchCatByBreed(breedId) {
    const API_KEY = 'live_cfXGjtvZIAmInchnZi8lincEI39zoBTI9p4QqC96J09hmbQrUBKdCICr9hvx9Yac';
    return fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`, { headers: { 'x-api-key': API_KEY } }).then((responce) => {
        if (!responce.ok) {
            throw new Error(responce.statusText)
        }
        return responce.json();
    })

}
export { fetchBreerds, fetchCatByBreed }
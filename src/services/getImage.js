const BASE_URL = 'https://pixabay.com/api';
const KEY = '33445990-2dd1c7e9397bdf317f172af9d';
const PER_PAGE = '12';
const IMAGE_TYPE = 'photo';
const ORIENTATION = 'horizontal';

export const getImages = (query, page) => {
  return fetch(
    `${BASE_URL}/?q=${query}&page=${page}&key=${KEY}&image_type=${IMAGE_TYPE}&orientation=${ORIENTATION}&per_page=${PER_PAGE}`
  );
};

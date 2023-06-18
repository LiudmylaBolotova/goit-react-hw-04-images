import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '29672596-80b7f00160ec49143013d00d9';

export async function fetchImages(nextValue, nextPage) {
  const { data } = await axios.get(
    `?q=${nextValue}&page=${nextPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return data;
}

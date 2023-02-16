import axios from 'axios';

export const getImages = async (query, page = 1) => {
  axios.defaults.baseURL = 'https://pixabay.com/api/';
  const key = '32850247-834ccb9697f220487d271dcee';

  const params = {
    key,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
    page,
  };

  try {
    const { data } = await axios.get('', {
      params,
    });

    const { hits, totalHits } = data;

    const images = hits.map(({ id, webformatURL, largeImageURL, tags }) => ({
      id,
      webformatURL,
      largeImageURL,
      tags,
    }));

    return { images, totalImages: totalHits };
  } catch (err) {
    throw new Error(err);
  }
};

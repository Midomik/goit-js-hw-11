import { KEY } from "./api-key";
import axios from "axios";
import Notiflix from 'notiflix';



axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      Notiflix.Notify.failure('Something went wrong! Try later)');
      return Promise.reject(error);
    },
  );

export async function fetchImg(query, page, perPage){
    const searchParams = new URLSearchParams({
        q: `${query}`,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: "true",
        page: `${page}`,
        per_page: perPage,
    })
    const response = await axios.get(`?key=${KEY}&${searchParams.toString()}`);
    // console.log(response.data)
    return response.data;
}
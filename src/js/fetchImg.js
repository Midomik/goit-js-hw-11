import { KEY } from "./api-key";
import axios from "axios";
const apiKEY = axios.defaults.headers.common["x-api-key"] = KEY;

export async function fetchImg(query, page){
    const searchParams = new URLSearchParams({
        q: `${query}`,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: "true",
        page: `${page}`,
        per_page: 40,
    })
    const response = (await fetch(`https://pixabay.com/api/?key=${apiKEY}&${searchParams.toString()}`)).json();
    return response;
}
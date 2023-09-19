import axios from "axios";
import { fetchImg } from "./js/fetchImg";
import Notiflix from 'notiflix';

const formEl = document.querySelector(".search-form");
const searchEl = formEl.firstElementChild;
const galleryEl = document.querySelector(".gallery");
const loMore = document.querySelector(".load-more");

let page = 1;
let count = 0;
const perPage = 40;

const renderImages = (arr, maxPages)=>{
         
    const markup = arr.map(item=>{return `<a class="large-img-link" href="${item.largeImageURL}">
      <div class="photo-card">
        <img class="img" src="${item.webformatURL}" alt="${item.tags}" loading="lazy"width="400" height="250" />
        <div class="info">
          <p class="info-item"><b>Likes</b>${item.likes}</p>
          <p class="info-item"><b>Views</b>${item.views}</p>
          <p class="info-item"><b>Comments</b>${item.comments}</p>
          <p class="info-item"><b>Downloads</b>${item.downloads}</p>
        </div>
      </div>
    </a>`
  }).join("")
    galleryEl.insertAdjacentHTML("beforeend", markup);
    // loMore.style.display = "block";
    page+=1;
    console.log(maxPages);
    console.log(page);

    if(page>=maxPages){
        loMore.style.display="none";

        Notiflix.Notify.success(`The end.`);
    }
}

const imgHandler = (e)=>{ 
    e.preventDefault();
    
    if(searchEl.value==="".trim() ){
        Notiflix.Notify.failure('Enter a request');
        return;
    }
    fetchImg(searchEl.value, page, perPage).then(item =>{
          
        if (count!==0){
            galleryEl.innerHTML="";
            page=1;
        }
        if (item.totalHits===0 || item.totalHits===1){   
            Notiflix.Notify.failure('No photo at your request');
            loMore.style.display = "none";
        } else{
            renderImages(item.hits);
            
            if(item.total>=40){
                loMore.style.display = "block";
            }
            Notiflix.Notify.success(`Hooray! We found ${item.total} images.`);
            count=count+1;           
        }    
    }).catch(err=>{console.log(err)})
}




const loadMoreImg = () =>{
    fetchImg(searchEl.value, page, perPage).then(item=>{
        const maxPages = Math.ceil(item.totalHits/perPage);
        renderImages(item.hits, maxPages);   

    })
}

loMore.addEventListener("click", loadMoreImg);
formEl.addEventListener("submit", imgHandler)
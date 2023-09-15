import axios from "axios";
import { fetchImg } from "./js/fetchImg";

const formEl = document.querySelector(".search-form");
const searchEl = formEl.firstElementChild;
const galleryEl = document.querySelector(".gallery");
const loMore = document.querySelector(".load-more");

let page = 1;
let count = 0;


const renderImages = (arr)=>{
    
        
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
    loMore.style.display = "block";
    page+=1;
    

}

const imgHandler = (e)=>{
    
    
    
    e.preventDefault();
    fetchImg(searchEl.value, page).then(item =>{
        
        if(searchEl.value===""){
            console.log("Enter a request");
            return;
        }

        if (count!==0){
            galleryEl.innerHTML="";
            page=1;
        }
        console.log(item)
        if (item.totalHits===0 || item.totalHits===1){
            
            console.log("No photo at your request");
            loMore.style.display = "none";
        } else{
            renderImages(item.hits);
            count=count+1;
            query = searchEl.value;
           
        }
        
        
    }).catch(err=>{console.log(err)})
    
    
}

const loadMoreImg = () =>{
    fetchImg(searchEl.value, page).then(item=>{
        const maxPages = Math.ceil(item.totalHits/40);
        if(page>maxPages){
            loMore.style.display="none";
            console.log("Hooray! We found totalHits images.")
        }else{
        renderImages(item.hits);   
        }
    })
}


loMore.addEventListener("click", loadMoreImg);
formEl.addEventListener("submit", imgHandler)
"use strict";

const elForm = document.querySelector(".form");
const elMovies = document.querySelector(".movies");
const elInput = document.querySelector(".input");
const elPags = document.querySelector(".btns");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

let search = 'Panda';
let page = 1;
let API_KEY = '81afce36';


let renderMovies = function(arr, htmlEl) {
    arr.forEach(movie => {
        let li = document.createElement('li');
        let title = document.createElement('h3');
        let img = document.createElement('img');
        let div = document.createElement('div');
        let p = document.createElement('p');
        let span = document.createElement('span');

        li.setAttribute("class", 'li');
        title.setAttribute("class", 'title');
        img.setAttribute("class", 'img');
        div.setAttribute("class", 'li__div');
        p.setAttribute("class", 'p');
        span.setAttribute("class", 'span');

        img.src = movie.Poster;
        title.textContent = movie.Title
        p.textContent = movie.Year;
        span.textContent = movie.Type;

        div.appendChild(title);
        div.appendChild(p);
        div.appendChild(span);
        li.appendChild(img);
        li.appendChild(div);

        htmlEl.appendChild(li);
    })
}

elForm.addEventListener('submit', function(e) {
    e.preventDefault();
    search = elInput.value.toLowerCase();
    elMovies.innerHTML = null;
    elPags.innerHTML = null;
    extractData();
})

let pages = 0;
const renderButtons = function(numbers,html) {
    if(Number(numbers) % 10 === 0){
        pages = Math.floor(numbers / 10)
    } else {
        pages = Math.floor(numbers / 10) + 1
    }

    for(let num = 1; num <= pages; num++){
        let num_btn = document.createElement('a');
        num_btn.setAttribute('class', 'btn-pages');
        num_btn.dataset.numID = num;
        num_btn.href = '#'
        num_btn.textContent = num;
        html.appendChild(num_btn)
    }
}

elPags.addEventListener('click', function(e){
    if(e.target.matches('.btn-pages')){
        page = e.target.dataset.numID * 1;
        extractData();
        elMovies.innerHTML = null;
    }
})

prevBtn.addEventListener("click", function() {
    if(page > 1){
        page--
        extractData();
        elMovies.innerHTML = null;
    }
})

nextBtn.addEventListener("click", function() {
    if(page < pages) {
        page++
        extractData();
        elMovies.innerHTML = null;
    }
})


let extractData = async function() {
    const request = await fetch(`https://www.omdbapi.com/?=&apikey=81afce36&s=${search}&page=${page}`);
    const response = await request.json();
    console.log(response);
    renderMovies(response.Search, elMovies);
    renderButtons(response.totalResults,elPags);
}
extractData();
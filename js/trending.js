// * *  TRENDING TAGS  * * //

async function getTrendingTag (){
    await fetch (`https://api.giphy.com/v1/trending/searches?${apiKey}`)
          .then(response => response.json())
          .then((response) => templateTrendingTags(response))
          .catch ((error) => console.log(error));
};
getTrendingTag();

function templateTrendingTags(response){    
    for (i = 0; i < 5; i++){
        let $trendingTag = document.createElement('span');
        $trendingTag.classList.add('trending_tags');
        $trendingTag.innerHTML = response.data[i];
        $trendingTag.setAttribute('onclick',`searchGif("${response.data[i]}")`);
        
        $trendingTagsContent.appendChild($trendingTag);
    }    
};


// * *  TRENDING GIFS  * * //

async function getTrendingGif() {
    await fetch(`${trendingEndpointWithApiKey}&limit=12&rating=g`)
        .then((response) => response.json())
        .then((trendings) => {
            console.log(trendings);
             templateTrendingGifs(trendings);
        })
        .catch((err) => console.error(err));
};
getTrendingGif();


const templateTrendingGifs = (trendings) => {
	for (let i = 0; i < trendings.data.length; i++) {
		const trendingGifsContainer = document.createElement('div');
		trendingGifsContainer.classList.add('trending_gif_content');
		trendingGifsContainer.innerHTML = ` 
        <img class="trendingGif_result" onclick="maximizeGif('${trendings.data[i].images.original.url}','${trendings.data[i].username}','${trendings.data[i].title}')" src="${trendings.data[i].images.original.url}" alt="${trendings.data[i].title}">
        <section class="trendingGif_info">
        <div class="icons">
            <div class="icon icon_fav" onclick="addGifToFavourites('${trendings.data[i].images.original.url}','${trendings.data[i].username}','${trendings.data[i].title}')" src="/assets/icon-fav.svg" alt=""></div>
            <div class="icon icon_download" onclick="downloadGif('${trendings.data[i].images.original.url}','${trendings.data[i].title}')" src="/assets/icon-download.svg" alt=""></div>
            <div class="icon icon_max" onclick="maximizeGif('${trendings.data[i].images.original.url}','${trendings.data[i].username}','${trendings.data[i].title}')" src="/assets/icon-max-normal.svg" alt=""></div>               
        </div>
        <div class="details">
            <p class="gif_user">${trendings.data[i].username}</p>
            <h4 class="gif_title">${trendings.data[i].title}</h4>                          
        </div>
        </section>
		`;
		$trendingGifsSlider.appendChild(trendingGifsContainer);
	}
};

function slideNext() {
    $trendingGifsSlider.scrollLeft += 500;
};

function slidePrevious(){
    $trendingGifsSlider.scrollLeft -= 500;
};

$btnArrowNext.addEventListener('click', slideNext);
$btnArrowPrevious.addEventListener('click', slidePrevious);
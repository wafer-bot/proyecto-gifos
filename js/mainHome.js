//!   HEADER SECTION  !//

/** BURGUER MENU **/

const showMenu = () => {
    $navbarMenu.classList.toggle('navbar_menu_open');

    if ($navbarMenu.classList.contains("navbar_menu_open")) {
        $btnMenu.src = "assets/close.svg"
    } else{
        $btnMenu.src = "assets/burger.svg"
    }
}

// * * NAVBAR ICONS EVENTS * * //

const $btnCrear = document.getElementById('btnCrear');

$btnCrear.addEventListener('mouseover', () => {
    $btnCrear.src = "assets/CTA-crear-gifo-hover.svg";
}  )

$btnCrear.addEventListener('mouseout', () => {
    $btnCrear.src = "assets/button-crear-gifo.svg";
}  )

$btnCrear.addEventListener('click', () => {
    $btnCrear.src = "assets/CTA-crear-gifo-active.svg"
})


// * * NAVBAR STICKY * * //
const $navbarSearchBar = document.querySelector('.navbar_search_container');
const $headerContainer = document.querySelector('#header__container');

function stickyNav() {
    if (document.documentElement.scrollTop > 500) {
        if (window.innerWidth < 1024) {
            $navbarSearchBar.classList.add('hide');
        } else {
            $navbarSearchBar.classList.remove('hide');
            $headerContainer.style.boxShadow =
                '0 9px 8px -10px rgba(148,147,147,0.9)';
        }
    } else {
        $navbarSearchBar.classList.add('hide');
        $headerContainer.style.boxShadow = 'none';
    }
}

window.addEventListener('scroll', stickyNav);


// *!   HERO SECTION

///       SEARCH BAR       ///


let offset = 0;


// * * FUNCTIONS * * //
async function searchGif(search){

    event.preventDefault();
    cleanSearch();

    $searchInput.value = search;
    $searchInputNavbar.value = search;
    $searchTitle.innerHTML = search;


    if (offset === 0) {
		$searchResultGallery.innerHTML = '';
	}

    await fetch(searchEndpointWithApiKey + search + '&limit=12' + '&offset=' + offset)
        .then(data => data.json())
        .then(result => {
            console.log(result)
                if (result.data == 0) {
                    errorSearch ();
        
                 } else {
                    displayGif(result);
                }
        })
        .catch (err => console.log("error", err));
}


function displayGif(result) {

    $searchResultContainer.classList.remove('hide');
    $btnShowMore.classList.remove('hide');

    for (let i = 0; i < result.data.length; i++){
        const gifResultContainer = document.createElement('div');
        gifResultContainer.classList.add('gif_result_container');
        gifResultContainer.innerHTML = `
                                            <img class="gif_result" src="${result.data[i].images.original.url}" alt="${result.data[i].title}">
                                            <section class="gif_content">
                                            <div class="icons">
                                                <img class="icon_fav" src="/assets/icon-fav.svg" alt="" srcset="">
                                                <img class="icon_download" src="/assets/icon-download.svg" alt="">
                                                <img class="icon_max" src="/assets/icon-max-normal.svg" alt="">               
                                            </div>
                                            <div class="details">
                                                <p class="gif_user">${result.data[i].username}</p>
                                                <h4 class="gif_title">${result.data[i].title}</h4>                          
                                            </div>
                                            </section>`                                   
    
        $searchResultGallery.appendChild(gifResultContainer);  
    }
};

function errorSearch () {
    $searchResultContainer.classList.remove('hide');
    $searchErrorContainer.classList.remove('hide');
    // $btnShowMore.style.display = 'none';

    $searchErrorContainer.innerHTML = `
                                    <h4 class="search__error__title">${$searchInput.value}</h4>
                                    <img src="/assets/icon-busqueda-sin-resultado.svg" alt="" srcset="">
                                    <h5>Intenta con otra búsqueda.</h5>`;
};

function cleanResultsContainer () {
    $searchResultContainer.classList.add('hide');
    $searchErrorContainer.classList.add('hide');

    
};

const showMore = () => {
    offset += 12;
    if ($searchInput.value) {
        searchGif($searchInput.value);
    } else {
        searchGif($searchInputNavbar.value);      
    }
	
};


// * * SUGERECIAS * * //


const getSearchSuggestions = async () => {
    cleanSearch();
    const input_user = $searchInput.value;
    $recomendedSearchContainer.classList.remove('hide');

    if (input_user.length >= 1) {
        await fetch(
            `https://api.giphy.com/v1/tags/related/${input_user}?${apiKey}&limit=4`
        )
            .then((response) => response.json())
            .then((suggestions) => {
                console.log(suggestions);
                displaySuggestions(suggestions);
            })
            .catch((err) => {
                console.log(err);
            });
    }
};


const displaySuggestions = (suggestions) => {
    //estilos
    $recomendedSearchContainer.classList.add('recommendedSearch__container');
    
    
    for (let i = 0; i < 4; i++) {
        const searchSuggestionItem = document.createElement('li');
        searchSuggestionItem.innerHTML = `<li class="suggested_item" onclick="searchGif('${suggestions.data[i].name}')"><img class="suggested_icon" src="/assets/icon-search-gray.svg">${suggestions.data[i].name}</li>`;
        $recomendedSearch.appendChild(searchSuggestionItem);
    }
};
$btnSearch.addEventListener('click', getSearchSuggestions);


const cleanSearch = () => {
    $recomendedSearchContainer.classList.add('hide');
	$recomendedSearchContainer.innerHTML = '';
};

$searchInput.addEventListener('input_user', getSearchSuggestions);


// * *  EVENTS * * //
//  HERO SEARCH
$btnSearch.addEventListener('click', searchGif($searchInput.value));
$searchInput.addEventListener('keypress', function (e){
    if (e.keyCode === 13){
        searchGif($searchInput.value);
    }
});

// NAVBAR SEARCH
$btnSearchNavbar.addEventListener('click', searchGif($searchInputNavbar.value));
$navbarSearchBar.addEventListener('keypress', function (e){
    if (e.keyCode === 13){
        searchGif($searchInputNavbar.value);
    }
});


$btnShowMore.addEventListener('click', showMore);



// ! TRENDING SECTION

const getTrendingGif = async () => {
    await fetch(`${trendingEndpointWithApiKey}&limit=12&rating=g`)
        .then((response) => response.json())
        .then((trendings) => {
            console.log(trendings);
            // displayTrendingGifs(trendings);
        })
        .catch((err) => console.error(err));
};

getTrendingGif();

const displayTrendingGifs = (trendings) => {
	for (let i = 0; i < trendings.data.length; i++) {
		const gifContainer = document.createElement('div');
		gifContainer.classList.add('gif__container');
		gifContainer.innerHTML = ` 
		<img class="gif" src="${trendings.data[i].images.original.url}" alt="${trendings.data[i].title}">
	
		<div class="gifActions">
			<div class="gifActions__btn">
				<img src="assets/icon-fav.svg" class="favorite" alt="Botón para agregar a mis favoritos">
				<img src="assets/icon-download.svg" class="download" alt="Botón para descargar">
				<img src="assets/icon-max-normal.svg" class="maximize" alt="Botón para maximizar">
			</div>
			<div class="gif__info">
				<p class="gif_user">${trendings.data[i].username}</p>
				<p class="gif_title">${trendings.data[i].title}</p>
			</div>
		</div>
		`;
		$trendingSlider.appendChild(gifContainer);
	}
}
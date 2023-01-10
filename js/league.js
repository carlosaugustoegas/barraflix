const apiKey = 'RGAPI-4a0cf193-eaea-447e-8c99-21b6eb6d9ebb';
const url =
    'http://ddragon.leagueoflegends.com/cdn/12.23.1/data/pt_BR/champion.json';
const loadScreen =
    'http://ddragon.leagueoflegends.com/cdn/img/champion/loading/';
const squareAssets =
    'http://ddragon.leagueoflegends.com/cdn/12.23.1/img/champion/';
const passiveAssets =
    'http://ddragon.leagueoflegends.com/cdn/12.23.1/img/passive/';
const splashAssets =
    'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/';
const main = document.querySelector('.main');
const urlRotation = 'https://br1.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=RGAPI-c44380ab-8b32-4efd-81d2-9751c856fbe2';
const rotationContainer = document.querySelector('.rotation-container');
const rotationCardsContainer = document.querySelector(".rotation-container-footer")
const cardsContainer = document.querySelector('.cards-container');

fetch(url)
    .then(resp => resp.json())
    .then(dados => {
        // console.log(dados.data);

        Object.keys(dados.data).forEach(el => {
            //console.log(dados.data[el].key);
            const champBox = document.createElement('div');
            champBox.className = 'champBox';
            champBox.id = dados.data[el].key;
            champBox.innerHTML = `
        <div id="${dados.data[el].key}-boxIMG" class="boxIMG">
        <img id="${dados.data[el].key}-img" width="250px" src="${splashAssets + dados.data[el].id
                }_0.jpg">
        </div>
        <div id="${dados.data[el].key}-boxFooter" class="boxFooter">
        <h3>${dados.data[el].id}</h3>
        <h5 id="${dados.data[el].key}-h5">${dados.data[el].title}</h5>
        </div>

        `;
            cardsContainer.appendChild(champBox);
        });

        //animação cards

        const cards = document.querySelectorAll('.champBox');
        cards.forEach(el => {
            el.onmouseover = e => {
                const img = document.getElementById(`${el.id}-img`);
                const footerBox = document.getElementById(`${el.id}-boxFooter`);
                const h5 = document.getElementById(`${el.id}-h5`);
                img.style.transform = 'scale(1.9)';
                footerBox.style.paddingLeft = '30px';
                h5.style.color = '#8a28e6';
            };
            el.onmouseout = e => {
                const img = document.getElementById(`${el.id}-img`);
                const footerBox = document.getElementById(`${el.id}-boxFooter`);
                const h5 = document.getElementById(`${el.id}-h5`);
                img.style.transform = 'scale(2)';
                footerBox.style.paddingLeft = '15px';
                h5.style.color = '#6e32a7';
            };
        });
    });

function championsBox(classe) {
    cardsContainer.innerHTML = '';
    fetch(url)
        .then(resp => resp.json())
        .then(dados => {
            // console.log(dados.data);

            Object.keys(dados.data).forEach(el => {
                //console.log(dados.data[el].key)
                if (dados.data[el].tags.includes(classe)) {
                    const champBox = document.createElement('div');
                    champBox.className = 'champBox';
                    champBox.id = dados.data[el].key;
                    champBox.innerHTML = `
                <div id="${dados.data[el].key}-boxIMG" class="boxIMG">
                <img id="${dados.data[el].key}-img" width="250px" src="${splashAssets + dados.data[el].id
                        }_0.jpg">
                </div>
                <div id="${dados.data[el].key}-boxFooter" class="boxFooter">
                <h3>${dados.data[el].id}</h3>
                <h5 id="${dados.data[el].key}-h5">${dados.data[el].title}</h5>
                </div>
        
                `;
                    cardsContainer.appendChild(champBox);
                    window.location = "#menu"

                } else if (classe == 'Todos') {
                    const champBox = document.createElement('div');
                    champBox.className = 'champBox';
                    champBox.id = dados.data[el].key;
                    champBox.innerHTML = `
                <div id="${dados.data[el].key}-boxIMG" class="boxIMG">
                <img id="${dados.data[el].key}-img" width="250px" src="${splashAssets + dados.data[el].id
                        }_0.jpg">
                </div>
                <div id="${dados.data[el].key}-boxFooter" class="boxFooter">
                <h3>${dados.data[el].id}</h3>
                <h5 id="${dados.data[el].key}-h5">${dados.data[el].title}</h5>
                </div>
        
                `;

                    cardsContainer.appendChild(champBox);
                    window.location = "#menu"
                }

            });

            //animação cards

            const cards = document.querySelectorAll('.champBox');
            //console.log(cards);
            cards.forEach(el => {
                el.onmouseover = e => {
                    const img = document.getElementById(`${el.id}-img`);
                    const footerBox = document.getElementById(`${el.id}-boxFooter`);
                    const h5 = document.getElementById(`${el.id}-h5`);
                    img.style.transform = 'scale(1.9)';
                    footerBox.style.paddingLeft = '30px';
                    h5.style.color = '#8a28e6';
                };
                el.onmouseout = e => {
                    const img = document.getElementById(`${el.id}-img`);
                    const footerBox = document.getElementById(`${el.id}-boxFooter`);
                    const h5 = document.getElementById(`${el.id}-h5`);
                    img.style.transform = 'scale(2)';
                    footerBox.style.paddingLeft = '15px';
                    h5.style.color = '#6e32a7';
                };
            });
        });
}
//Menu Classes
const btnMenu = document.querySelectorAll('.menuItems');

btnMenu.forEach(el => {
    el.onclick = e => {

        if(el.id != "Todos"){
            const classContainer = document.querySelector(".class-image")
            classContainer.innerHTML = ""
            classContainer.innerHTML = `
            <img src="/imagens/${el.id}.png" width="600px">
            `
        }
        
        window.location.hash = el.innerText;

        btnMenu.forEach(el => {
            el.removeAttribute('menuDestaque');
        });


        championsBox(el.id);

        el.setAttribute('menuDestaque', '');
    };
});

// chamando campeoes em rotação

fetch(urlRotation)
    .then(resp => resp.json())
    .then(dados => {
        // console.log(dados.freeChampionIds);

        fetch(url)
            .then(resp => resp.json())
            .then(champs => {
                //console.log(champs.data);

                Object.keys(champs.data).forEach(el => {
                    dados.freeChampionIds.forEach(keychamp => {
                        if (champs.data[el].key == keychamp) {
                            const divCardRotation = document.createElement('div');
                            divCardRotation.className = `card-rotation`
                            divCardRotation.id = `${keychamp}-card-rotation`;
                            divCardRotation.innerHTML = `
                            <div class="${keychamp}-img-rotation-container">
                              <img id="${champs.data[el].id}" class="img-rotation"  src="${loadScreen + champs.data[el].id}_0.jpg" alt"">
                            </div>
                            `
                            rotationCardsContainer.appendChild(divCardRotation)

                        }
                    });
                });

                //Add background Header
                const imgsRotaion = document.querySelectorAll(".img-rotation")
                // console.log(imgsRotaion[0].id)
                const rotationMain = document.querySelector(".rotation-container")
                //rotationMain.style.backgroundImage = `url("${splashAssets + imgsRotaion[0].id}_0.jpg")`


                //Muda Background header
                const todosCardsRotation = document.querySelectorAll(".img-rotation")
                //console.log(todosCardsRotation)
                todosCardsRotation.forEach(el => {
                    const rotationInfo = document.querySelector(".rotation-main")

                    el.onclick = e => {
                        rotationInfo.innerHTML = "";
                        const video = document.querySelector(".video-bg")
                        rotationInfo.innerHTML = `
                        <h1>${champs.data[el.id].id}</h1>
                        <h2>${champs.data[el.id].title}</h2>
                        <p>${champs.data[el.id].blurb}</p>
                        
                        `

                        if (video) {
                            video.remove()
                        }
                        // console.log(champs.data)
                        rotationMain.style.backgroundImage = `url("${splashAssets + el.id}_0.jpg")`

                    }



                })
                // Slide

                const navLeft = document.querySelector("#slide-left")
                const navRight = document.querySelector("#slide-right")
                console.log(navLeft)

                navLeft.onclick = e => {
                    console.log("Cliquei na seta esquerda")
                    const cardsRotatioContainer = document.querySelector(".rotation-container-footer")
                    const cardsRotation = document.querySelectorAll(".card-rotation")
                    cardsRotation.forEach(el => {
                        el.setAttribute("slide-prev", "")
                        el.addEventListener("animationend", () => {
                            el.removeAttribute("slide-prev")
                            cardsRotatioContainer.appendChild(cardsRotation[0])
                        })
                    })
                }

                //
                navRight.onclick = e => {
                    console.log("Cliquei na seta esquerda")
                    const cardsRotatioContainer = document.querySelector(".rotation-container-footer")
                    const cardsRotation = document.querySelectorAll(".card-rotation")
                    cardsRotation.forEach(el => {
                        el.setAttribute("slide-next", "")
                        el.addEventListener("animationend", () => {
                            el.removeAttribute("slide-next")
                            cardsRotatioContainer.insertAdjacentElement("afterbegin", cardsRotation[cardsRotation.length-1])
                        })
                    })
                }

            });




    })
    .catch(error => {
        console.log(`erro: ${error}`)
    })

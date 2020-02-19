import City from "../Models/citiesModel.js"

// Define an array where it it will store the cities data
export let cities = []

// #### special checker, if there is a local storage of the cities on the computure, it will import it, if not it will create 3defaut cities in this case

if (localStorage.cities) {
    cities = JSON.parse(localStorage.cities)
} else {
    
    
   // There will be a total of 12 cities hardcoded has defeault, if no local storage exists, these will be created
   // bigger data or an array of objects whit in an object are seperate then added to the city

  
   //##################### Array Gallery whit picture urls #########################
   //Ponta Delgada
   const pdlGallery = [
       "https://d1oe1fd4hqfth9.cloudfront.net/wp-content/uploads/Ponta-Delgada-3.jpg",
       "http://comercioenoticias.pt/wp-content/uploads/2018/09/Ponta-Delgada-2.jpg",
       "https://ahresp.com/app/uploads/2019/02/Ponta-Delgada_edited.jpg",
       "https://www.planetware.com/photos-large/P/portugal-ponta-delgada-city-view-with-harbor-sao-miguel-azores.jpg"
    ]

   //Porto
   const prtGallery = [
       "https://media.timeout.com/images/104692355/630/472/image.jpg",
       "http://www.warmrental.com/blog/wp-content/uploads/2018/05/20-Things-To-Do-In-Porto-That-You-Cannot-Miss-0.jpg",
       "https://d254u7jd4zosxo.cloudfront.net/files/2017/07/porto-2048724_1920.jpg?w=640",
       "https://cdn.ejamo.it/wp-content/uploads/sites/106/porto-panorama.jpg"
    ]

   //Lisboa
   const lsbGallery = [
       "https://www.visitportugal.com/sites/www.visitportugal.com/files/mediateca/TAP_PracaComercio_01e_CL-co.jpg",
       "https://nit.pt/wp-content/uploads/2018/05/89d568ddb3bc9e8c09de6d84b5972ba9-754x394.jpg",
       "https://www.ulisboa.pt/sites/ulisboa.pt/files/styles/rect_large/public/basicpage/images/1920_600_lisboa_cidade_internacional_1.jpg?itok=cdDlaHtp"
    ]

   //Vila do Conde
   const vdcGallery = [
       "https://nit.pt/wp-content/uploads/2017/07/b715e28fc1db1044565276c704c20daa-754x394.jpg",
       "https://media-cdn.tripadvisor.com/media/photo-s/12/93/6b/2c/largo-dom-afonso-sanches.jpg",
       "https://www.visitportugal.com/sites/default/files/styles/encontre_detalhe_poi_destaque/public/mediateca/VilaConde_Marginal-Praia_CMVC_660x371.jpg?itok=gV1xXSqP"
    ]

   //Braga 
   const brgGallery =[
       "https://r-ec.bstatic.com/images/hotel/max1024x768/155/155755371.jpg",
       "https://www.cm-braga.pt/archive/img/sbv_braga04.jpg",
       "https://ominho.pt/wp-content/uploads/2018/04/Cidade-de-Braga-Turismo.jpg"
   ]

   //Coimbra
   const cbrGallery =[
       "https://i2.wp.com/ncultura.pt/wp-content/uploads/2018/04/capa-8.jpg?fit=1500%2C640&ssl=1",
       "https://www.ambitur.pt/wp-content/uploads/ViewCoimbraHotelOslo-e1546598610390-770x439_c.jpg",
       "https://i2.wp.com/www.vortexmag.net/wp-content/uploads/2017/11/35194527144_aef015cf8e_k-e1509809110460.jpg?fit=1200%2C831&ssl=1"
   ]

  

   //Funchal
   const fncGallery = [
       "https://www.madeira-web.com/images/madeira-web/3-places/31-funchal-a.jpg",
       "https://agencia.ecclesia.pt/portal/wp-content/uploads/2018/02/funchal.jpg",
       "https://jornaleconomico.sapo.pt/wp-content/uploads/2017/09/Funchal-Foto-CMF.jpg?w=610&h=381&q=60&compress=auto,format&fit=crop"
    ]
    
    //Figueira da Foz
    const figGallery =[
        "https://i.ytimg.com/vi/DP14WMxLTHk/maxresdefault.jpg",
        "https://i.ytimg.com/vi/aOLeTnVVnkw/hqdefault.jpg",
        "https://pumpkin.pt/wp-content/uploads/2013/06/figueira-da-foz.jpg"
    ]

    //Horta
    const hrtGallery = [
        "https://www.caf-faial.com/wp-content/uploads/2016/04/a-9.jpg",
        "http://www.portugal-live.net/images/stories/rotators/places_do_see/azores/horta/03.jpg",
        "https://cdn-images.rtp.pt/icm/images/fd/fdeac7a21d6dbe8991b2d69a823bea5a?1200&rect=0,30,620,340"
    ]
    
    //Guara (lvl3)
    const grdGallery = [
        "https://www.visitportugal.com/sites/default/files/styles/encontre_detalhe_poi_destaque/public/mediateca/Guarda_ARPTCentro_660x371.jpg?itok=yu7u14Nm",
        "https://beira.pt/diretorio/wp-content/uploads/sites/14/2015/07/Se-Catedral-da-Guarda-750x400.jpg",
        "https://www.mundoportugues.pt/wp-content/uploads/sites/3/2018/07/guarda19.jpg"
    ]

   // Evora
   const evrGallery = [
       "https://www.visitportugal.com/sites/default/files/styles/encontre_detalhe_poi_destaque/public/mediateca/Evora-SeCatedral-Shutterstock-Fotoeventis-Visit3.jpg?itok=OwjUsJeR",
       "https://www.visitevora.net/wp-content/uploads/2018/05/visitar-evora-660x330.jpg",
       "https://d1oe1fd4hqfth9.cloudfront.net/wp-content/uploads/slid_Pra%C3%A7a-do-Giraldo.jpg"
   ]



   //portimao (lvl4)

   const ptmGallery = [
       "https://www.visitportimao.com/pt/get_image.php?img=ffe162cb24d817381e7988cc40a0d1710f4a8990.jpg",
       "https://portugal-103ca.kxcdn.com/wp-content/uploads/2019/05/Praia-da-Rocha-Portimao-Algarve-Portugal.jpg",
       "https://d1oe1fd4hqfth9.cloudfront.net/wp-content/uploads/Praria-da-Rocha.jpg"
   ]

   //############################ Google map scr (there long so we keep them in variable to keep it short) ##########################
    //braga
    const brgMap = "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d766330.2724520763!2d-8.224827416503912!3d41.38543269213305!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd24febc6cf5d867%3A0xbc5d054162d1e218!2sBraga!5e0!3m2!1spt-PT!2spt!4v1561317649831!5m2!1spt-PT!2spt"

    //coimbra
    const cbrMap = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d194951.56067281085!2d-8.55635841176482!3d40.228675510852526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd22f9144aacd16d%3A0x634564477b42a6b9!2sCoimbra!5e0!3m2!1spt-PT!2spt!4v1561318787577!5m2!1spt-PT!2spt"

   //Ponta Delgada
   const pdlMap = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25239.416897237556!2d-25.696059305736423!3d37.74485415493512!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xb432acc76b00e97%3A0x765580f24e6fc416!2sPonta+Delgada!5e0!3m2!1spt-PT!2spt!4v1560768945950!5m2!1spt-PT!2spt";
   //Porto
   const prtMap = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48061.84192467006!2d-8.6288206583127!3d41.15929440933758!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd2465abc4e153c1%3A0xa648d95640b114bc!2sPorto!5e0!3m2!1spt-PT!2spt!4v1560771822723!5m2!1spt-PT!2spt";
   
   //Lisboa
   const lsbMap = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d99580.03468299573!2d-9.230243382264508!3d38.743605703601276!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd19331a61e4f33b%3A0x400ebbde49036d0!2sLisboa!5e0!3m2!1spt-PT!2spt!4v1560771869288!5m2!1spt-PT!2spt";
   //Vila do Conde 
   const vdcMap = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23958.92354587857!2d-8.761721148313045!3d41.35527832307782!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd24441d30f3cc2b%3A0xf35fd2261be6b72f!2sVila+do+Conde!5e0!3m2!1spt-PT!2spt!4v1560771902551!5m2!1spt-PT!2spt";
   
   //#### LVL 2 cities
   //Funchal (nivel 2)
   const fncMap = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d53743.643668332144!2d-16.95969009006523!3d32.660036787752205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xc605fc3501f8bab%3A0xffd84d2c15cda139!2sFunchal!5e0!3m2!1spt-PT!2spt!4v1560771763998!5m2!1spt-PT!2spt";
   //Figueira da foz
   const figMap = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d97580.60550727215!2d-8.906874792926441!3d40.15578230058868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd2237e03def9c41%3A0x878e2298dda9f4de!2sFigueira+da+Foz!5e0!3m2!1spt-PT!2spt!4v1561319216091!5m2!1spt-PT!2spt"

   //Horta
   const hrtMap ="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24967.684345867125!2d-28.654339495077235!3d38.53467769618925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xb478ad7f06d385f%3A0x35e81c36998de709!2sHorta!5e0!3m2!1spt-PT!2spt!4v1561319696658!5m2!1spt-PT!2spt"

   //Guarda (lvl3)
   const grdMap ="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d388102.6156819805!2d-7.5302129200552645!3d40.540447254531166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd3cfac48ff6c653%3A0x400ebbde4903500!2sGuarda!5e0!3m2!1spt-PT!2spt!4v1561320184862!5m2!1spt-PT!2spt"

   // Evora
   const evrMap ="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d99821.9618430467!2d-7.981049092710526!3d38.569799332204546!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd19e4df3883139d%3A0xa6ad8a31c3bdef6c!2zw4l2b3Jh!5e0!3m2!1spt-PT!2spt!4v1561321127462!5m2!1spt-PT!2spt"

   //portimao (lvl4)
   const ptmMap ="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d101723.05696257732!2d-8.60531908496227!3d37.180141787737426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd1b28eca9242961%3A0x93fcc923718014e1!2zUG9ydGltw6Nv!5e0!3m2!1spt-PT!2spt!4v1561321662980!5m2!1spt-PT!2spt"


// adding the information to the 3 cities

    const city1 = new City("Ponta Delgada", "Açores", "1546","31/5/2019",1,1,0,0,"../IMG/Ponta-Delgada-cover.jpg","../IMG/PDL-Brasao.png","https://pt.wikipedia.org/wiki/Ponta_Delgada","Cidade central da Ilha São Miguel",pdlGallery,pdlMap)
    const city2 = new City("Porto","Norte","1112","31/5/2019",2,1,0,0,"../IMG/Porto.jpg","../IMG/Porto-Brasao.png","https://pt.wikipedia.org/wiki/Porto","Cidade Linda e boa para visitar",prtGallery,prtMap)
    const city3 = new City("Lisboa","Área Metropolitana de Lisboa","1147","1/6/2019",3,1,0,0,"../IMG/Lisboa.jpg","../IMG/LSB-Brasao.png" ,"https://pt.wikipedia.org/wiki/Lisboa","Cidade Grande e metropolitana e Capital",lsbGallery,lsbMap)
    const city4 = new City("Vila do Conde","Norte","1988","17/6/2019",4,1,0,0,"../IMG/Vdc-cover.jpg","../IMG/VDC-Brasao.png","https://pt.wikipedia.org/wiki/Vila_do_Conde","Cidade perto do mar!",vdcGallery,vdcMap) 
    const city5 = new City("Funchal","Madeira","1508","17/6/2019",5,2,0,0,"../IMG/Funchal-cover.jpg","../IMG/FNC-Brasao.png","https://pt.wikipedia.org/wiki/Funchal","Cidade principal da ilha da Madeia",fncGallery,fncMap)
    const city6 = new City("Braga","Norte","1070","23/6/2019",6,1,0,0,"https://upload.wikimedia.org/wikipedia/commons/3/3f/Se_Catedral_de_Braga.jpg","https://upload.wikimedia.org/wikipedia/commons/2/25/BRG.png","https://pt.wikipedia.org/wiki/Braga","Em 2019 foi eleita o segundo Melhor Destino Europeu do ano.",brgGallery,brgMap)
    const city7 = new City("Coimbra","Norte","1080","23/6/2019",7,1,0,0,"https://upload.wikimedia.org/wikipedia/commons/3/38/Almedina-CCBY.jpg","https://upload.wikimedia.org/wikipedia/commons/7/76/CBR.png","https://pt.wikipedia.org/wiki/Coimbra","É considerada uma das mais importantes cidades portuguesas!",cbrGallery,cbrMap)
    const city8 = new City("Figueira da foz","Centro","1882","23/6/2019",8,2,0,0,"https://upload.wikimedia.org/wikipedia/commons/6/66/PacosdoConcelho.jpg","https://upload.wikimedia.org/wikipedia/commons/3/39/FIG.png","https://pt.wikipedia.org/wiki/Figueira_da_Foz","Foi conhecida como *Rainha das Praias de Portugal*",figGallery,figMap)
    const city9 = new City("Horta","Açores","1833","23/6/2019",9,2,0,0,"https://upload.wikimedia.org/wikipedia/commons/4/4f/Cidhorta.jpg","https://upload.wikimedia.org/wikipedia/commons/e/e1/HRT.png","https://pt.wikipedia.org/wiki/Horta","Uma cidade portuguesa com cerca de 8800 habitantes da Região Autónoma dos Açores.",hrtGallery,hrtMap)
    const city10 = new City("Guarda","Centro","1199","23/6/2019",10,3,0,0,"https://upload.wikimedia.org/wikipedia/commons/8/84/GuardaCathedral2.jpg","https://upload.wikimedia.org/wikipedia/commons/0/0e/GRD.png","https://pt.wikipedia.org/wiki/Guarda","Toda a região é marcada pelo granito, pelo clima contrastado de montanha e pelo seu ar puro e frio que permite a cura e manufatura de fumeiro e queijaria de altíssima qualidade.",grdGallery,grdMap)
    const city11 = new City("Évora","Alentejo","1165","23/6/2019",11,3,0,0,"https://upload.wikimedia.org/wikipedia/commons/9/98/Evora-RomanTemple.jpg","https://upload.wikimedia.org/wikipedia/commons/f/fb/COA_of_%C3%89vora_municipality_%28Portugal%29.png","https://pt.wikipedia.org/wiki/%C3%89vora","O seu centro histórico bem-preservado é um dos mais ricos em monumentos de Portugal",evrGallery,evrMap)
    const city12 = new City("Portimão","Algarve","1924","23/6/2019",12,4,0,0,"https://upload.wikimedia.org/wikipedia/commons/3/38/Apartment_buildings_at_Praia_da_Rocha%2C_Portim%C3%A3o.jpg","https://upload.wikimedia.org/wikipedia/commons/8/80/COA_of_Portim%C3%A3o_municipality_%28Portugal%29.png","https://pt.wikipedia.org/wiki/Portim%C3%A3o","O centro da cidade está situado a cerca de 2 km do mar e é um centro importante de pesca e turismo.",ptmGallery,ptmMap)

    
    cities.push(city1,city2,city3,city4,city5,city6,city7,city8,city9,city10,city11,city12)    
    localStorage.setItem("cities", JSON.stringify(cities))
}


// ######################### Functions to be exported by the viewers and adding/manipulating the local storage data ###########################

//###########################Filter Fuctions####################
// city sorting  by AZ and ZA fuctions
export function sortCities(order) {
    if (order == "az"){
        cities.sort(City.compareAZ)
    }
    else{
        cities.sort(City.compareZA)
    }
    
    localStorage.setItem("cities", JSON.stringify(cities))
}

// city sorting by most Liked
export function sortLikes(){
    cities.sort(City.compareLikes)
    localStorage.setItem("cities", JSON.stringify(cities))
}

// city sorting by most commented
export function sortComments(){
    cities.sort(City.compareComment)
    localStorage.setItem("cities", JSON.stringify(cities))
}

export function sortRecent(){
    cities.sort(City.compareRecent)
    localStorage.setItem("cities", JSON.stringify(cities))
}

//#################### fuctions to add and Remove cities #############

//Add city
export function addCity(txtCity,txtLevel,sltZone,txtDate,txtCover,txtBrasao,txtMap,txtLink,txtDescription,txtImg1,txtImg2,txtImg3){
     
    let existCity = false
    let citynew = txtCity;
    citynew = citynew.toLowerCase();
    //search if the city already exists
    for (const city of cities) {

        let cityLow = city.name;        
        cityLow = cityLow.toLowerCase();
        

        
        if (cityLow == citynew) {            
            existCity = true
        }
    }
    if (!existCity) {
        
        //if the city doesnt exists then it will push all the information in to the cities object
        //default information , idDate , likes, comments count, upload date,
        const idDate = cities.length + 1;
        const faves = 0;
        const comments = 0 ;
        const upload = currentDate();
        const galleryArray = [txtImg1, txtImg2, txtImg3]
        cities.push(new City(txtCity, sltZone, txtDate, upload, idDate,txtLevel,comments,faves,txtCover,txtBrasao,txtLink,txtDescription,galleryArray,txtMap))
        localStorage.setItem("cities", JSON.stringify(cities))
        //add a sweet alert 2*/

        Swal.fire({            
            title:'Cidade adicionada!',
            text:`${txtCity}  foi adicionada.`,            
            type: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok!'
          }).then((result) => {
            if (result.value) {
                // Goes back to the Cities catalog to check the newly added city
                location.href = "CatalogPage.html"
            }
        })
        
        
    } else {
        Swal.fire({
            title:'..oops.',
            text:`${txtCity} ja existe.`,            
            type:'error'
          })        
    }

}

//################ fuction to get the current date of creation #################
function currentDate() {
    let fulldate = "";
    let today = new Date();

    //fuction to add a 0 to minutes and months so it has a two digit format
    function addZero(i){
        if (i < 10) {
            i = "0" + i;
          }
          return i;
    }


    let time = today.getHours() + ":" + addZero(today.getMinutes());
    let date = +today.getDate()+'-'+ addZero((today.getMonth()+1))+'-'+today.getFullYear();
    
    fulldate =  time + " " + date ;

    return fulldate;
}

//#### fuction to remove a city

export function removeCity(txtCity){
    //sweet alrt confirmation
    for (let i = 0; i < cities.length; i++) {
        if (cities[i].name === txtCity) {
            cities.splice(i, 1)
        }
    }
    localStorage.setItem("cities", JSON.stringify(cities))

}









//####################### getting the city's name and setting it has current city#########################
export function setCurrentCity(txtCity) {
    localStorage.setItem("city", txtCity)
    location.href = "CityPage.html"
}

// getting thethe city we set from the Citties list model

export function getCurrentCity() {
    const city = localStorage.getItem("city")
    for (let i = 0; i < cities.length; i++) {
        if (cities[i].name === city) {
            return cities[i]
        }
    }
}

export function getCurrentLvl(txtcity){
//look up the city's index position on the object class 
    for (let i = 0; i < cities.length; i++) {
        if (cities[i].name === txtcity) {
            //once found , return the cities lvl
            return cities[i].level;
        }
    }
}

export function cityLike(txtName, keyLike){

    if (keyLike == 1){

        for (let i = 0; i < cities.length; i++) {
            if (cities[i].name === txtName) {
                cities[i].faves ++;                
                localStorage.setItem("cities", JSON.stringify(cities))
            }
        }
        
        

    }

    else if(keyLike == 0){

        for (let i = 0; i < cities.length; i++) {
            if (cities[i].name === txtName) {
                cities[i].faves --;
                localStorage.setItem("cities", JSON.stringify(cities))
            }
        }
        
        


    }

    

}


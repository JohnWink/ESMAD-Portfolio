import Sugestion from "../Models/sugestionModel.js";

//Defines an array to save user Objects
export let sugestions=[]

// In case a user object exists in LocalStorage, this one is loaded into the array
//Otherwise, they are saved into the array with several objects User are inserted manualy
//question whit date now is the format it wil present, in the end it will effect the sorting date
if(localStorage.sugestions){
    sugestions = JSON.parse(localStorage.sugestions)
}else{
    //change the user names
    const sugestion1= new Sugestion("Adicione Ponta Delgada", "Mint", "15:45 8-6-2019",1,false)
    const sugestion2= new Sugestion("Adicione Lagoa", "Luis","17:25 9-6-2019",2,false)
    const sugestion3= new Sugestion("Nao gosto do site!", "joao","16:31 10-6-2019",3,false)
    sugestions.push(sugestion1,sugestion2,sugestion3);
    localStorage.setItem("sugestions", JSON.stringify(sugestions))
}


//###############Fuctions exports #########

export function addSugestion(txtSugestion,user){
    //sweeet alert condition, if txtSugestion is "" then itwill not add
    if(txtSugestion != ""){
            //ORDER: sugestion,username, date,dateId
        const date = currentDate();
        const dateId = sugestions.length;
        const goodSugestion = false;

        const newSugestion = new Sugestion ( txtSugestion,user,date,dateId,goodSugestion);
        sugestions.push(newSugestion);
        localStorage.setItem("sugestions", JSON.stringify(sugestions))

        //sweet alert to warn the user of the success
        Swal.fire({            
            title:'Sugestão enviada!',                        
            type: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok!'
          }).then((result) => {
            if (result.value) {
                // Goes back to the Cities catalog to check the newly added city
                location.href = "CatalogPage.html"
            }
        })
    }
    else{
        //sweet alert to warn the user to add something to the txt area
        Swal.fire({
            title:'..oops.',
            text:`Escreva a sua sugestão.`,            
            type:'error'
          }) 
        
    }
    

}


//#### date fuction
function currentDate() {
    let today = new Date();
    let fulldate = "";

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


//########## fuction to turn the good sugestion to switch the value of goodsugestion and return the username

export function sugestionSwitch(sugestionId){
    
    //finding the sugestion index position on the object
    let username = "";
    for (let i = 0; i < sugestions.length; i++) {
        if (sugestions[i].dateId == sugestionId) {
            //when found switch the goodSugestion to true and save the change on the local stoage and set the username
            if(sugestions[i].goodSugestion == false){
                sugestions[i].goodSugestion = true;
            }
            else{
                sugestions[i].goodSugestion = false;
            }
            
                       
            username = sugestions[i].username;           

        }
    }
    
    localStorage.setItem("sugestions", JSON.stringify(sugestions))
    return username

}

export function sugestionCheck(sugestionId){

    for (let i = 0; i < sugestions.length; i++) {
        if (sugestions[i].dateId == sugestionId) {
            if(sugestions[i].goodSugestion == true){
                return true

            }

            else{
                return false
            }

        }

        
    }
    

}

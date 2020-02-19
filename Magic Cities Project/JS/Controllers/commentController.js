import Comment from "../Models/commentModel.js";

//Defines an array to save user Objects
export let comments=[]

// In case a user key exists in LocalStorage, this one is loaded into the array
//Otherwise, they are saved into the array with several objects User are inserted manualy
//question whit date now is the format it wil present, in the end it will effect the sorting date
if(localStorage.comments){
    comments = JSON.parse(localStorage.comments)
}else{
    const comment1= new Comment("Ponta Delgada", "AnaBella", "15:45 8-6-2019","Quero visitar os Açores!")
    const comment2= new Comment("Porto", "João14-6","17:25 10-6-2019","Cidade Linda, gosto muito!")
    const comment3= new Comment("Lisboa", "JorgeBlaze ","16:31 9-6-2019","Que cidade tão grande e movimentada!")
    comments.push(comment1,comment2,comment3);
    localStorage.setItem("comments", JSON.stringify(comments))
}


//########### fuctions to add a comment ##############

export function addComment(cityName,userName,date,stringTxt){
    const newComment = new Comment (cityName,userName,date,stringTxt)
    comments.push(newComment);
    localStorage.setItem("comments", JSON.stringify(comments))
    
}

//################# fuction to get the date ###################
export function currentDate(fulldate) {
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

//####################### fuction to sort the comments by date ##############

export function commentReverse(){
    // sence the insertion of a new comment is always gonna be from old to new in the comments array of object 
    //we want the new ones to be on the top, and the old at the bottom in the html view
    //one solution is to reverse() the array before injecting to html and  after . 
    
    comments.reverse();
    localStorage.setItem("comments", JSON.stringify(comments))

}


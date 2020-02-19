import{
    addQuestion
}from "../Controllers/quizController.js"


document.querySelector("#frmAddQuestion").addEventListener("submit", function(event){
    
    addQuestion(document.querySelector("#correctAnswer").value,
        document.querySelector("#txtNarrative").value,
        document.querySelector("#txtDescription").value,
        document.querySelector("#firstAnswer").value,
        document.querySelector("#secondAnswer").value,
        document.querySelector("#thirdAnswer").value,
        document.querySelector("#fourthAnswer").value,
        document.querySelector("#questionLevel").value)
    /**/

    
    event.preventDefault()
})

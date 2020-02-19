import{questions,removeQuestion,quizzSorting}from "../Controllers/quizController.js"

 

function renderQuestions(){
  //Sorting the qizzes id before doing the injection
    quizzSorting()

    const questionBox= document.querySelector("#questionBox")
    let result = "";
    let wrong = "";
    


    for(const question of questions){
        for (const response of question.responses) {
            wrong += " " + response + ",";
          }
        result+= `<div class="container-fluid bg-Custom1 rounded-lg">
        <div class="row">
          <div class="col-md-10 text-white font-weight-bold" style="padding-left: 2%; padding-top:1% ; padding-bottom: 1%;" >
             <div class=" row-2" style="padding-top: 0.5%; padding-bottom:0.5% ">Pergunta nª: ${question.id}</div>
              <div class=" row-2" style="padding-top: 0.5%; padding-bottom:0.5% ">Narração: ${question.narrative}</div>
               <div class="row-2" style="padding-top: 0.5%; padding-bottom:0.5% ">Descricão: ${question.description}</div>
                <div class="row-2" style="padding-top: 0.5%; padding-bottom:0.5% ">Resposta Correta: ${question.correctResponse}</div>
                 <div class="row-2" style="padding-top: 0.5%; padding-bottom:0.5% ">Respostas: ${wrong}</div>
          </div>
          <div class="col-md-2 align-self-center">
             
            <button type="button" class="btn remove btn-lg btn-danger" id="${question.id}">
              Remover
            </button>
          </div>
        </div>
    </div> `
    wrong= "";
    }

    questionBox.innerHTML=result

    // fuction of the Remove button
const btnsRemove = document.getElementsByClassName("remove")
for (const elem of btnsRemove) {
    elem.addEventListener("click", function () {             
        // will need a sweet  alert to confirm the awnser
        Swal.fire({
            title: 'Tem a certeza?',
            text: "A pergunta vai ser removida!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, Remova!'
          }).then((result) => {
            if (result.value) {
                /// add the export fuction to remove ( add in the code once the add cities is done ) 
                removeQuestion(this.id);

              Swal.fire(
                'Removida!',
                'A pergunta foi removida.',
                'success'
              )
              renderQuestions();
              this.refresh;           
            }
          })
          


        
    })
}
}

renderQuestions() 


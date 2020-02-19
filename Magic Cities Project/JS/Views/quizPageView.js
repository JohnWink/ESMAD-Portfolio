import {
  questions
} from "../Controllers/quizController.js";
import {
  updateUser
} from "../Controllers/usersController.js";
import {
  updateNavbar
} from "../Views/navBarView.js"

//criação da navbar
updateNavbar()

// obter ID da questão mediante o nivel atual da criança
let userQuestionId = sessionStorage.getItem("userQuestionId")

// fazer uma função que dê render a tudo
renderCurrentQuestion()

/**
 * Função que renderiza a questão atual
 */
function renderCurrentQuestion() {
  for (const question of questions) {

    if (question.id == userQuestionId) {

      // Nº da pergunta
      document.querySelector("#QuestionNumber").innerHTML = `<p>Pergunta #${+question.id+1}</p>`
      // Narração
      document.querySelector("#narrativeBox").innerHTML = `<p>${question.narrative}</p>`

      // Questão      
      document.querySelector("#QuestionText").innerHTML = `<p>${question.description}</p>`
      // Respostas
      let i = 0
      let result = ""
      for (const response of question.responses) {
        result += `<button id="${i}" type="button" class="btn btn-primary btn-lg resp">${response}</button>`
        result += `<div class="row"><hr></div>`
        i++
      }
      document.querySelector("#Buttons").innerHTML = result

    }
  }


  // Obter 4 botões
  const buttons = document.getElementsByClassName("resp")
  for (const button of buttons) {
    button.addEventListener("click", function () {
      checkAnswer(this.id)
    })
  }

}


/**
 * 
 * @param {string} answer Resposta selecionada pelo User
 */
function checkAnswer(answer) {
  for (const question of questions) {
    if (question.id == userQuestionId) {

      if (answer == question.correctResponse) {

        //Update do user
        updateUser()
        //update da navbar
        updateNavbar()
        //Chamar a função renderCurrentQuestion para renderizar a proxima pergunta quando o User acerta numa questão
        renderCurrentQuestion()

      } else {
        Swal.fire({
          type: 'error',
          title: 'Errado :(',
          text: 'Boa sorte para a próxima!',
        })

      }
      break
    }

  }

}
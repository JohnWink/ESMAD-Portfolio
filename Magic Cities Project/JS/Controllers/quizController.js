import Question from "../models/quizModel.js"

// Define um array para guardar os objetos Question
export let questions = []

// Caso já exista uma chave questions na LocalStorage é carregado tudo para o array
// Caso contrário são guardadas no array, vários objetos questions inseridos manualmente
if (localStorage.questions) {
    questions = JSON.parse(localStorage.questions)
} else {
    let questionsTempArray = [
        [
            0, // id
            "1", // level
            "Enquanto caminhas pelo norte de Portugal, deparas-te com um camponês, desorientado e confuso, sem saber para onde ir. Ele tem uma carta para ser enviada para uma cidade, mas não conhece o nome completo. Só sabe que começa por Vila...e que foi fundada em 1988.", // narrative
            "Qual o nome completo desta cidade?", // description
            [
                "Vila do Conde",
                "Vila do Minho", // responses  
                "Vila do Camponês",
                "Vila do Tejo"
            ],
            0, //correctResponse
            "25" // points
        ],

        [
            1, // id
            "1", // level
            "Caminhando pelas terras do norte encontras uma cidade antiga, rodeada por uma grande muralha. Verificas que esta foi fundada no ano 1070. Um dos soldados na muralha encontra-se confuso e pergunta-te em que cidade está.", // narrative
            "Qual o nome desta cidade?", // description
            [
                "Silves",
                "Braga", // responses
                "Bragança",
                "Guarda"
            ],
            1, // correctResponse
            "25" // points
        ],

        [
            2, // id
            "1", // level
            "Segues para sul, continuando ainda no norte do país e acabas numa cidade cheia de cores, nesta, atravessa o Rio Douro. Mas também lá, vagueiam pessoas confusas, cheias de dúvidas sobre onde estão. Vês um placar com a data da fundação: ano 1112", // narrative
            "Qual é o nome desta cidade?", // description
            [
                "Coimbra",
                "Braga", // responses
                "Porto",
                "Lisboa",
            ],
            2, // correctResponse
            "25" // points
        ],
        [
            3, // id
            "1", // level
            "Chegas a uma cidade universitária. Lá reparas em vários estudantes confusos. Eles rodeiam-te e atiram várias perguntas sobre aonde estão. Enquando procuras por pistas, descobres que esta cidade foi fundada no ano 1080", // narrative
            "Qual o nome desta cidade?", // description
            [
                "Chaves",
                "Covilhã", // responses
                "Coimbra",
                "Ermesinde"
            ],
            2, // correctResponse
            "25" // points
        ],

        [
            4, // id
            "2", // level
            "Enquanto caminhas o distrito de Coimbra, encontras o litoral. Na Foz do rio Mondego encontras uma cidade. Encontras trabalhadores a construirem uma caravela, agora parados sem saberem o que fazer, confusos sobre aonde estão. Exploras o local por pistas e descobres que a cidade foi fundada no ano 1882", // narrative
            "Qual o nome desta cidade?", // description
            [
                "Felgueiras",
                "Fiães", // responses
                "Funchal",
                "Figueira da foz"
            ],
            3, // correctResponse
            "25" // points
        ],

        [
            5, // id
            "2", // level
            "Encontras um portal que te leva para uma das ilhas dos açores. Encontras-te agora numa praia com pescadores que se preparavam para pescar, mas agora não sabiam se estavam no lugar certo. Vêm ter contigo para perguntar aonde estão. Sabem que estão num lugar chamado de ponta, mas não sabem o resto. Mais pistas que descobres levam-te a concluir que esta cidade foi fundada no ano 1546", // narrative
            "Qual o nome desta cidade?", // description
            [
                "Ponte do Lima",
                "Ponta do Minho", // responses
                "Ponta de Setúbal",
                "Ponta Delgada"
            ],
            3, // correctResponse
            "25" // points
        ],
        
        [
            6, // id
            "2", // level
            "Nos açores descobres que existe um portal de volta para o continente. Arranjas uns pescadores dispostos a ajudarem-te, mas estes esqueceram a onde está o portal. Apenas sabem que fica perto da Ilha do Pico e que foi fundada em 1833", // narrative
            "Qual o nome desta cidade?", // description
            [
                "Ílhavo",
                "Lagoa", // responses
                "Horta",
                "Lagos"
            ],
            2, // correctResponse
            "25" // points
        ],


        [
            7, // id
            "2", // level
            "Voltas ao portal de onde vieste mas não voltas-te ao continente. Continuas numa das ilhas, desta vez numa das ilhas da Madeira. Sabes que estás na capital deste arquipélago. Várias pessoas vêm ter contigo a perguntar onde estão. As tuas pistas indicam que esta cidade foi fundada no ano de 1508", // narrative
            "Qual o nome desta cidade?", // description
            [
                "Funchal",
                "Camacha", // responses
                "Deserta Grande",
                "Porto Santo"
            ],
            0, // correctResponse
            "25" // points
        ],


        [
            8, // id
            "3", // level
            "Voltas a entrar num portal e sais na cidade mais a Sul de Portugal.", // narrative
            "Qual o nome desta cidade?", // description
            [
                "Viseu",
                "Bragança", // responses
                "Funchal",
                "Beja"
            ],
            2, // correctResponse
            "25" // points
        ],

   
       
        [
            9, // id
            "3", // level
            "Continuas a tua jornada e encontras a cidade mais alta de portugal, situada à beira da serra da estrela, descobres que esta cidade foi fundada no ano 1199. Encontras uma carroça parada, O condutor vem até ti para saber aonde está. ", // narrative
            "Qual o nome desta cidade?", // description
            [
                "Silves",
                "Lamego", // responses
                "Bragança",
                "Guarda"
            ],
            3, // correctResponse
            "25" // points
        ],

        [
            10, // id
            "3", // level
            "Continuas para sul e encontras-te agora no centro do país. Vês vários mercadores à procura do que devia ser a capital. Mais uma vês procuras por pistas e descobres que esta foi fundada no ano 1147", // narrative
            "Qual o nome desta cidade?", // description
            [
                "Porto",
                "Lisboa", // responses
                "Setúbal",
                "Tejo"
            ],
            1, // correctResponse
            "25" // points
        ],

        [
            11, // id
            "3", // level
            "Caminhas mais para sul do país, estás na região do Alentejo. Lá encontras uma cidade antiga com ruínas Romanas. Os cidadãos vagueiam as ruas e alguns vêm até ti para saber a onde estão. Descobres num dos monumentos que foi fundada no ano 1165", // narrative
            "Qual o nome desta cidade?", // description
            [
                "Évora",
                "Fafe", // responses
                "Estremoz",
                "Esposende"
            ],
            0, // correctResponse
            "25" // points
        ],

        [
            12, // id
            "4", // level
            "Continuas a tua caminhada para sul e chegas ao Algarve. Nas praias Algarvias descobres uma cidade. No porto da cidade encontras vários pescadores, estes também confusos sem saber onde estão nem para onde ir. Vagueias a cidade á procura de pistas e descobres que a cidade foi fundada no ano 1924.", // narrative
            "Qual o nome desta cidade?", // description
            [
                "Póvoa de Santa Iria",
                "Porto", // responses
                "Portimão",
                "Quarteira"
            ],
            2, // correctResponse
            "25" // points
        ],


     


        
        
    ];

    
    for (let i = 0; i < questionsTempArray.length; i++) {
        let tempQuestion = new Question(
            questionsTempArray[i][0],
            questionsTempArray[i][1],
            questionsTempArray[i][2],
            questionsTempArray[i][3],
            questionsTempArray[i][4],
            questionsTempArray[i][5],
            questionsTempArray[i][6]
        )

        questions.push(tempQuestion);
    }
    localStorage.setItem("questions", JSON.stringify(questions))
}




//############################### Back office fuctions related to quizzes #############
//############# Removing a question
export function removeQuestion(questionId){
    for (let i = 0; i < questions.length; i++) {
        if (questions[i].id == questionId) {
            questions.splice(i, 1)
        }
    }
    localStorage.setItem("questions", JSON.stringify(questions))

    quizzSorting()

    //after removing we need to reaasign all the questions ID's so we dont havea  gap

    for (let i = 0; i < questions.length; i++) {
        questions[i].id = i + 1        
    }
    localStorage.setItem("questions", JSON.stringify(questions))




}

//############# adding a new question 
export function addQuestion(correctAnswer, txtNarrative, txtDescription, firstAnswer, secondAnswer, thirdAnswer, fourthAnswer, questionLevel){
    
    const points = 25;
    const id = questions.length;
    
    const responses=[
        firstAnswer,secondAnswer,thirdAnswer,fourthAnswer
    ]
    questions.push(new Question(id,questionLevel,txtNarrative,txtDescription,responses,correctAnswer,points))
    localStorage.setItem("questions", JSON.stringify(questions))
    
    Swal.fire({            
        title:'Pergunta adicionada',         
        type: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK!'
    }).then((result) => {
        if (result.value) {
            // Goes back to the Cities catalog to check the newly added city
            location.href = "manageQuestionBackOffice.html"
        }
    })
    quizzSorting()

    
}


//############ Sorting quizzes by adding new ids

export function quizzSorting(){
    questions.sort(Question.compareId)
    localStorage.setItem("questions", JSON.stringify(questions))
}
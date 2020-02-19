export default class Question {
    constructor(
        id,
        level,
        narrative,
        description,
        responses,
        correctResponse,
        points
    ) {
        this.id = id
        this.level = level
        this.narrative = narrative
        this.description = description
        this.responses = responses
        this.correctResponse = correctResponse
        this.points = points
    }



    //sorting quizz fuction by id's

    static compareId(quizzA, quizzB) {
        if (quizzA.id < quizzB.id)
            return -1;
        if (quizzA.id > quizzB.id)
            return 1;
        return 0;
    }
}
const getQuestionData = (questionData, path = []) =>
    path.reduce(
        (acc, answer) =>
            acc && acc.nextQuestion
                ? acc.nextQuestion[answer.toString()]
                : null,
        questionData,
    );

export default getQuestionData;

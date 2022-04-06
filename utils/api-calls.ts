export const getQuestion = async (id: string) => {
    const question = await fetch("http://localhost:3000/api/questions/" + id)
    return question.json()
}

export const createAnswer = async (answer: string, questionId: string) => {
    const response = await fetch("/api/answers/create", {
        method: "POST",
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify({
            answer,
            questionId
        })
    })
    return response.json()
}

export const getAnswers = async (questionId: string) => {
    const response = await fetch("http://localhost:3000/api/answers/" + questionId)
    return response.json()
}
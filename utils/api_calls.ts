import { ServerUrl } from "@/lib/url"
import { Question, Answer } from "./types"

/**
 * 
 * @param id Will get question by Question ID
 * @returns A question object
 */
export const getQuestion: (id: string) => Promise<Question> = async (id: string) => {
    const question = await fetch(`${ServerUrl}/api/questions/${id}`)
    return question.json()
}

/**
 * Will Get all questions
 * @returns An array of question objects
 */
export const getQuestions: () => Promise<Question[]> = async () => {
    const questions = await fetch(`${ServerUrl}/api/questions`)
    return questions.json()
}

/**
 * 
 * @param answer Will post an answer to the database
 * @param questionId Will use the Question ID to post the answer to the correct question
 * @returns A response object of success or failure message
 */
export const createAnswer: (answer: string, questionId: string) => Promise<{ message: string }> = async (answer: string, questionId: string) => {
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

/**
 * 
 * @param slug Will use to check if the slug is valid to the question
 * @param questionId Will use the Question ID to get user linked to the question
 * @returns A response object of valid or invalid slug message
 */
export const verifySlug: (slug: string, questionId: string) => Promise<{ isValid: boolean }> = async (slug: string, questionId: string) => {
    const response = await fetch(`${ServerUrl}/api/questions/check-slug`, {
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
            slug,
            questionId
        })
    })
    return response.json()
}

/**
 * 
 * @param questionId Will get all answers for a question
 * @returns  An array of answer objects
 */
export const getAnswers: (questionId: string) => Promise<Answer[]> = async (questionId: string) => {
    const response = await fetch(`${ServerUrl}/api/answers/${questionId}`)
    return response.json()
}

/**
 * 
 * @param username Preferred username by user which will be set to the user's profile
 * @returns A response object of success or failure message
 */
export const setUserName: (username: string) => Promise<{ message: string }> = async (username: string) => {
    const response = await fetch("/api/auth/set-username", {
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
            username: username.toLowerCase()
        })
    })
    return response.json()
}
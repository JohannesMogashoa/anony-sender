export const getQuestion = async (id: string) => {
    const question = await fetch("/api/questions/" + id)
    return question.json()
}
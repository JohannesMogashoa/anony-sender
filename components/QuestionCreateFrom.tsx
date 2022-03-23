import React from "react";

const QuestionCreateFrom = ({ setShowForm }: any) => {
    return (
        <div>
            <form>
                <input type="text" />
                <input type="submit" value="Create" />
            </form>
            <button onClick={() => setShowForm(false)}>Cancel</button>
        </div>
    );
};

export default QuestionCreateFrom;

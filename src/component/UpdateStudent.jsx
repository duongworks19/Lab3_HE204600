import { memo } from "react";

const UpdateStudent = memo(function UpdateStudent({ student, onEditStart }) {
    return (
        <button onClick={() => onEditStart(student)}>Edit</button>
    );
});

export default UpdateStudent;

import { memo } from "react";

const DeleteStudent = memo(function DeleteStudent({ student, onDelete }) {
    return (
        <button onClick={() => onDelete(student.id)}>Delete</button>
    );
});

export default DeleteStudent;

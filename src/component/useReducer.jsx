import { useReducer, useState, useCallback } from "react";
import students from "../data/student";
import SearchStudent from "./SearchStudent";
import { loadStudents, usePersistStudents } from "./SaveData";

function studentReducer(state, action) {
    switch (action.type) {
        case "ADD_STUDENT":
            return [...state, action.payload];

        case "DELETE_STUDENT":
            return state.filter((student) => student.id !== action.payload);

        case "UPDATE_STUDENT":
            return state.map((student) =>
                student.id === action.payload.id ? action.payload : student
            );

        default:
            return state;
    }
}

function StudentManager() {
    const [studentList, dispatch] = useReducer(studentReducer, loadStudents(students));

    usePersistStudents(studentList);

    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [major, setMajor] = useState("");

    const [editingStudent, setEditingStudent] = useState(null);

    const handleAdd = useCallback(() => {
        if (!name.trim() || !age || !major.trim()) {
            alert("Please fill in all fields.");
            return;
        }
        dispatch({
            type: "ADD_STUDENT",
            payload: {
                id: Date.now(),
                name: name.trim(),
                age: Number(age),
                major: major.trim(),
            },
        });
        setName("");
        setAge("");
        setMajor("");
    }, [name, age, major]);

    const handleDelete = useCallback((id) => {
        dispatch({ type: "DELETE_STUDENT", payload: id });
        if (editingStudent?.id === id) setEditingStudent(null);
    }, [editingStudent]);

    const handleEditStart = useCallback((student) => {
        setEditingStudent({ ...student });
    }, []);

    const handleEditSave = useCallback(() => {
        if (!editingStudent.name.trim() || !editingStudent.age || !editingStudent.major.trim()) {
            alert("Please fill in all fields.");
            return;
        }
        dispatch({
            type: "UPDATE_STUDENT",
            payload: { ...editingStudent, age: Number(editingStudent.age) },
        });
        setEditingStudent(null);
    }, [editingStudent]);

    const handleEditCancel = useCallback(() => {
        setEditingStudent(null);
    }, []);

    return (
        <div>
            <h1>Student Management</h1>

            <h2>Add New Student</h2>
            <div>
                <label>Name: </label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter student name"
                />
            </div>
            <div>
                <label>Age: </label>
                <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="Enter student age"
                    min="1"
                />
            </div>
            <div>
                <label>Major: </label>
                <input
                    type="text"
                    value={major}
                    onChange={(e) => setMajor(e.target.value)}
                    placeholder="Enter student major"
                />
            </div>
            <button onClick={handleAdd}>Add Student</button>

            {editingStudent && (
                <div style={{ border: "1px solid #999", padding: "12px", marginTop: "16px" }}>
                    <h2>Edit Student (ID: {editingStudent.id})</h2>
                    <div>
                        <label>Name: </label>
                        <input
                            type="text"
                            value={editingStudent.name}
                            onChange={(e) =>
                                setEditingStudent({ ...editingStudent, name: e.target.value })
                            }
                        />
                    </div>
                    <div>
                        <label>Age: </label>
                        <input
                            type="number"
                            value={editingStudent.age}
                            onChange={(e) =>
                                setEditingStudent({ ...editingStudent, age: e.target.value })
                            }
                        />
                    </div>
                    <div>
                        <label>Major: </label>
                        <input
                            type="text"
                            value={editingStudent.major}
                            onChange={(e) =>
                                setEditingStudent({ ...editingStudent, major: e.target.value })
                            }
                        />
                    </div>
                    <button onClick={handleEditSave}>Save</button>
                    <button onClick={handleEditCancel}>Cancel</button>
                </div>
            )}

            <SearchStudent
                studentList={studentList}
                onEditStart={handleEditStart}
                onDelete={handleDelete}
            />
        </div>
    );
}

export default StudentManager;

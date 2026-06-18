import { useState, useMemo, useCallback } from "react";
import DeleteStudent from "./DeleteStudent";
import UpdateStudent from "./UpdateStudent";
import CountTotal from "./CountTotal";

const MAJORS = [
    "All Major",
    "IT",
    "Business",
    "Marketing",
    "Software Engineering",
];

function SearchStudent({ studentList, onEditStart, onDelete }) {
    const [query, setQuery] = useState("");
    const [selectedMajor, setSelectedMajor] = useState("All Major");

    const handleQueryChange = useCallback((e) => setQuery(e.target.value), []);
    const handleMajorChange = useCallback((e) => setSelectedMajor(e.target.value), []);

    const filteredList = useMemo(() => {
        return studentList.filter((student) => {
            const matchesName = student.name
                .toLowerCase()
                .includes(query.trim().toLowerCase());
            const matchesMajor =
                selectedMajor === "All Major" ||
                student.major.toLowerCase() === selectedMajor.toLowerCase();
            return matchesName && matchesMajor;
        });
    }, [studentList, query, selectedMajor]);

    return (
        <div>
            <h2>Student List</h2>

            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div>
                    <label>Search by name: </label>
                    <input
                        type="text"
                        value={query}
                        onChange={handleQueryChange}
                        placeholder="Type a student name..."
                    />
                </div>
                <div>
                    <label>Major: </label>
                    <select
                        value={selectedMajor}
                        onChange={handleMajorChange}
                    >
                        {MAJORS.map((major) => (
                            <option key={major} value={major}>
                                {major}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <table border="1" cellPadding="8" cellSpacing="0" style={{ marginTop: "8px" }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Major</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredList.length > 0 ? (
                        filteredList.map((student) => (
                            <tr key={student.id}>
                                <td>{student.id}</td>
                                <td>{student.name}</td>
                                <td>{student.age}</td>
                                <td>{student.major}</td>
                                <td>
                                    <UpdateStudent student={student} onEditStart={onEditStart} />
                                    <DeleteStudent student={student} onDelete={onDelete} />
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" style={{ textAlign: "center" }}>
                                No students found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <CountTotal count={filteredList.length} />
        </div>
    );
}

export default SearchStudent;

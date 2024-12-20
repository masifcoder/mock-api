import { useState } from "react";

function CreateForm({ createFormOpen, closeCreateFormModal, createStudent }) {
    const [studentObj, setStudentObj] = useState({name: '', age: '', city: '', isActive: '-'});

    if (!createFormOpen) {
        return null;
    }

    const handleInputUpdate = (e) => {
        const newExp = { ...studentObj, [e.target.name]: e.target.value };
        setStudentObj(newExp);
    };

    const handleSubmit = () => {
        createStudent(studentObj);
    };

    return (
        <div className="mdl-overlay" onClick={closeCreateFormModal}>
            <div className="mdl-container" onClick={(e) => e.stopPropagation()}>
                <div className="mdl-header">
                    <button onClick={closeCreateFormModal} className="close-button">X</button>
                </div>
                <div className="mdl-body">
                    <h5>Create Student</h5>
                    <div className="form-group">
                        <form onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="text"
                                onChange={handleInputUpdate}
                                value={studentObj.name}
                                className="form-control mb-3"
                                name="name"
                                placeholder="student name"
                            />
                            <input
                                type="text"
                                onChange={handleInputUpdate}
                                value={studentObj.city}
                                className="form-control mb-3"
                                name="city"
                                placeholder="student city"
                            />
                            <input
                                type="number"
                                value={studentObj.age}
                                onChange={handleInputUpdate}
                                className="form-control mb-3"
                                name="age"
                                placeholder="student age"
                            />
                            <select
                                value={studentObj.isActive}
                                className="form-select mb-3"
                                name="isActive"
                                onChange={handleInputUpdate}
                            >
                                <option value="-">Select Status</option>
                                <option value="true">Present</option>
                                <option value="false">Absent</option>
                            </select>
                            <button
                                type="button"
                                className="btn btn-sm w-100 btn-success py-2"
                                onClick={() => handleSubmit()}
                            >
                                Create New Student
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateForm;

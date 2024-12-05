import { useState, useEffect } from "react";

function EditForm({ isEditing, selectedObject, udpateStudent, editFormOpen, closeEditFormModal }) {
    const [studentObj, setStudentObj] = useState({ id: '', name: '', city: '', age: '', isActive: '-' });


    useEffect(() => {
        if (selectedObject !== null) {
            console.log(selectedObject)
            setStudentObj({ name: selectedObject.name, city: selectedObject.city, age: selectedObject.age, isActive: selectedObject.isActive, id: selectedObject.id});
        }

    }, [selectedObject]);



    if (!editFormOpen) {
        return null;
    }

    const handleInputUpdate = (e) => {
        const newExp = { ...studentObj, [e.target.name]: e.target.value };
        setStudentObj(newExp);
    };

    return (
        <div className="mdl-overlay" onClick={closeEditFormModal}>
            <div className="mdl-container" onClick={(e) => e.stopPropagation()}>
                <div className="mdl-header">
                    <button onClick={closeEditFormModal} className="close-button">X</button>
                </div>
                <div className="mdl-body">
                    <h5>Update Student Record</h5>
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
                                className={`btn btn-sm w-100 btn-success py-2`}
                                onClick={() => udpateStudent(studentObj)}
                            >
                                Update Student
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditForm;

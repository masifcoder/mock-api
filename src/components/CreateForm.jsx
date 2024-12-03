import { useState } from "react";


function CreateForm({ createFormOpen, closeFormModal, createStudent }) {

    const [studentObj, setStudentObj] = useState({});

    if (createFormOpen == false) {
        return null;
    }


    const handleInputUpdate = (e) => {
        const newExp = { ...studentObj, [e.target.name]: e.target.value };
        setStudentObj(newExp);
    }

    const handleSubmit = () => {
        createStudent(studentObj);
    }

    return (
        <div className="mdl-overlay" onClick={closeFormModal}>
            <div className="mdl-container" onClick={(e) => e.stopPropagation()}>
                <div className="mdl-header">
                    <button onClick={closeFormModal} className="close-button">X</button>
                </div>
                <div className="mdl-body">
                    <h5>Create Student</h5>
                    <div className='form-group'>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <input type='text' onChange={handleInputUpdate} className='form-control mb-3' name='name' placeholder='student name' />
                            <input type='text' onChange={handleInputUpdate} className='form-control mb-3' name='city' placeholder='student city' />
                            <input type='number' onChange={handleInputUpdate} className='form-control mb-3' name='age' placeholder='student age' />
                            <select className='form-select mb-3' name='isActive' onChange={handleInputUpdate}>
                                <option value="-">Select Status</option>
                                <option value='true'>Present</option>
                                <option value='false'>Absent</option>
                            </select>
                            <button className='btn btn-sm w-100 btn-warning py-2' onClick={handleSubmit}>Create New Student</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateForm
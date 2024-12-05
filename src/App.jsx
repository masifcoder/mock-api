import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import CreateForm from "./components/CreateForm";
import EditForm from "./components/EditForm";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [students, setStudents] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const [createFormOpen, setCreateFormOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedObject, setSelectedObject] = useState(null);

  const [editFormOpen, setEditFormOpen] = useState(false);


  // delete function
  const deleteStudent = (studentId) => {
    const id = toast.loading("Please wait deleting...")
    axios.delete(`https://674e8c3e635bad45618f0309.mockapi.io/studens/${studentId}`)
      .then((response) => {
        console.log(response.data);
        setIsDeleted(true);
      })
      .catch((er) => {
        console.log(er.messsage);
      })
      .finally(() => {
        //do something else
        toast.update(id, { render: "Successfully deleted", type: "success", isLoading: false, autoClose: 500 });
      });
  };


  // open modal
  const openFormModal = () => setCreateFormOpen(true);

  // close modal
  const closeCreateFormModal = () => {
    setIsEditing(false);
    setSelectedObject(null);
    setCreateFormOpen(false);
  }


  // create student
  const createStudent = (studentObj) => {
    axios.post("https://674e8c3e635bad45618f0309.mockapi.io/studens", studentObj).then((response) => {
      console.log(response.data)
      setIsCreated(true);
    });

    closeCreateFormModal();
  }



  // open edit modal 
  const openEditFormModal = () => setEditFormOpen(true);
  const closeEditFormModal = () => setEditFormOpen(false);

  // set editing function
  const editStudent = (studentId) => {

    // switch ON editing mode
    setIsEditing(true);
    axios.get(`https://674e8c3e635bad45618f0309.mockapi.io/studens/${studentId}`).then((response) => {
      setSelectedObject(response.data);
      openEditFormModal();
    })
  }

  // udpate student 
  const udpateStudent = (studentObj) => {
    console.log(studentObj)
    axios.put(`https://674e8c3e635bad45618f0309.mockapi.io/studens/${studentObj.id}`, studentObj).then((response) => {
      console.log(response.data)
      setIsCreated(true);
      closeEditFormModal();
    });
  }


  useEffect(() => {

    axios.get("https://674e8c3e635bad45618f0309.mockapi.io/studens").then((response) => {

      console.log(response.data);
      setStudents(response.data);
      setIsDeleted(false);
      setIsCreated(false);

    })


  }, [isDeleted, isCreated]);

  console.log(selectedObject && selectedObject.name)

  return (
    <>
      <div className="container">
        <h1 className="text-center mb-3">Tasks Application <button className="btn btn-success btn-sm" onClick={openFormModal}>Create</button> </h1>
        <div className="task-list">
          <CreateForm createFormOpen={createFormOpen} closeCreateFormModal={closeCreateFormModal} createStudent={createStudent} />
          <EditForm editFormOpen={editFormOpen} udpateStudent={udpateStudent} isEditing={isEditing} selectedObject={selectedObject} closeEditFormModal={closeEditFormModal} />
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">City</th>
                <th scope="col">Age</th>
                <th scope="col" >Status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                students.map((std) => {
                  return (
                    <tr key={std.id}>
                      <td>{std.id}</td>
                      <td>{std.name}</td>
                      <td>{std.city}</td>
                      <td>{std.age}</td>
                      <td>
                        {
                          (std.isActive == true || std.isActive == 'true') ? "Present" : "Absent"
                        }
                      </td>
                      <td>
                        <button className="btn btn-danger btn-sm me-2" onClick={() => { deleteStudent(std.id) }}>Delete</button>
                        <button className="btn btn-warning btn-sm me-2" onClick={() => { editStudent(std.id) }}>Edit</button>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer autoClose={1000} />
    </>
  );
}

export default App;

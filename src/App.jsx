import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import CreateForm from "./components/CreateForm";

function App() {
  const [students, setStudents] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const [createFormOpen, setCreateFormOpen] = useState(false);

  // delete function
  const deleteStudent = (studentId) => {
    axios.delete(`https://674e8c3e635bad45618f0309.mockapi.io/studens/${studentId}`)
      .then((response) => {
        console.log(response.data);
        setIsDeleted(true);
      })
      .catch((er) => {
        console.log(er.messsage);
      })
      .finally(() => { });
  };


  // open modal
  const openFormModal = () => setCreateFormOpen(true);

  // close modal
  const closeFormModal  = () => setCreateFormOpen(false);


  // create student
  const createStudent = (studentObj) => {
      axios.post("https://674e8c3e635bad45618f0309.mockapi.io/studens", studentObj).then( (response) => {
          console.log(response.data)
          setIsCreated(true);
      });

      closeFormModal();
  }



  useEffect(() => {

    axios.get("https://674e8c3e635bad45618f0309.mockapi.io/studens").then( (response) => {

      console.log(response.data);
      setStudents(response.data);
      setIsDeleted(false);
      setIsCreated(false);

    } )


  }, [isDeleted, isCreated]);



  return (
    <>
      <div className="container">
        <h1 className="text-center mb-3">Tasks Application <button className="btn btn-success btn-sm" onClick={openFormModal}>Create</button> </h1>
        <div className="task-list">
          <CreateForm createFormOpen={createFormOpen} closeFormModal={closeFormModal} createStudent={createStudent} />
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
                students.map( (std) => {
                  return(
                    <tr key={std.id}>
                      <td>{std.id}</td>
                      <td>{std.name}</td>
                      <td>{std.city}</td>
                      <td>{std.age}</td>
                      <td>
                        {
                          (std.isActive == true || std.isActive == 'true') ? "Present": "Absent" 
                        }
                      </td>
                      <td>
                        <button className="btn btn-danger btn-sm me-2" onClick={ () => {deleteStudent(std.id)}  }>Delete</button>
                        <button className="btn btn-warning btn-sm me-2">Edit</button>
                      </td>
                    </tr>
                  )
                } )
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default App;

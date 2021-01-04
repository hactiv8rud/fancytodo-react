import React from 'react';
import axios from '../config/axiosinstance.js';
import Swal from 'sweetalert2';

function EditTaskForm(props) {
  const TaskId = props.taskEdit.id;
  const [title, setTitle] = React.useState(props.taskEdit.title);
  const [description, setDescription] = React.useState(props.taskEdit.description);
  const [due_date, setDueDate] = React.useState(props.taskEdit.due_date);

  function handleInputChange(event) {
    const target = event.target;
    const name = target.name;

    if (name === 'title') {
      setTitle(target.value)
    } 

    if (name === 'description') {
      setDescription(target.value)
    } 

    if (name === 'due_date') {
      setDueDate(target.value)
    } 
  }

  function handleSubmit(event) {
    event.preventDefault();
    const payload = {
      title,
      description,
      due_date
    }
    axios
      .put(`/todos/${TaskId}`, payload, { headers: { access_token: localStorage.getItem('access_token') } })
      .then(({ data }) => {
        props.setShowEditForm(false);
        Swal.fire(
          'Edited!',
          'The task has been edited.',
          'success'
        )
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function goMainPage(){
    props.setShowEditForm(false);
  }

  return (
    <>
      <div className="edit-task-form-container">
        <div className="edit-task-form-content">
          <div className="edit-task-form-title">
              <h1>Edit Task</h1>
          </div>
          <form id="edit-task-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input type="text" className="form-control" id="edit-task-title" name="title" value={title} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="description" className="col-form-label">Description</label>
              <textarea className="form-control text-area" id="description" name="description" value={description} onChange={handleInputChange}></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="due_date">Due Date</label>
              <input type="date" className="form-control" id="edit-task-due_date" name="due_date" value={due_date} onChange={handleInputChange} />
            </div>
            <button type="submit" className="btn mt-4" id="edit-task-btn">Edit</button>
            <button type="button" className="btn mt-2" id="edit-cancel-btn" onClick={goMainPage}>Cancel</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditTaskForm;

import React from 'react';
import axios from '../config/axiosinstance.js';
import Swal from 'sweetalert2';
// import Modal from 'react-bootstrap/Modal';

function EditTaskForm(props) {
  const TaskId = props.taskEdit.id;
  const [title, setTitle] = React.useState(props.taskEdit.title);
  const [description, setDescription] = React.useState(props.taskEdit.description);
  const [due_date, setDueDate] = React.useState(props.taskEdit.due_date);
  // const [fetchTasks_ref, setFetchTasksRef] = React.useState();

  // if (props.statusName === 'uncompleted') {
  //   setFetchTasksRef(props.fetchUncompleted_ref);
  // } else if (props.statusName === 'completed') {
  //     setFetchTasksRef(props.fetchCompleted_ref);
  // } else {
  //     setFetchTasksRef(props.fetchExpired_ref);
  // }

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
        // fetchTasks_ref.current();
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
      <div className="edit-task-form-content">
        <div className="edit-task-form-title">
            <h1>Edit Task</h1>
        </div>
        <form id="edit-task-form" onSubmit={handleSubmit}>
          <div className="form-group">
              <label for="title">Title</label>
              <input type="text" className="form-control" id="edit-task-title" name="title" value={title} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label htmlFor="description" className="col-form-label">Description</label>
            <textarea className="form-control text-area" id="description" name="description" value={description} onChange={handleInputChange}></textarea>
          </div>
          <div className="form-group">
            <label for="due_date">Due Date</label>
            <input type="date" className="form-control" id="edit-task-due_date" name="due_date" value={due_date} onChange={handleInputChange} />
          </div>
          <button type="submit" className="btn mt-4" id="edit-task-btn">Edit</button>
          <button type="button" className="btn mt-2" id="edit-cancel-btn" onClick={goMainPage}>Cancel</button>
        </form>
      </div>
    </>
  );
}

// function EditTaskForm(props) {
  // const TaskId = props.task.id;
  // const [title, setTitle] = React.useState(props.task.title);
  // const [description, setDescription] = React.useState(props.task.description);
  // const [due_date, setDueDate] = React.useState(props.task.due_date);
  // const [fetchTasks_ref, setFetchTasksRef] = React.useState();

  // if (props.status.name === 'uncompleted') {
  //   setFetchTasksRef(props.fetchUncompleted_ref);
  // } else if (props.status.name === 'completed') {
  //     setFetchTasksRef(props.fetchCompleted_ref);
  // } else {
  //     setFetchTasksRef(props.fetchExpired_ref);
  // }

  // function handleInputChange(event) {
  //   const target = event.target;
  //   const name = target.name;

  //   if (name === 'title') {
  //     setTitle(target.value)
  //   } 

  //   if (name === 'description') {
  //     setDescription(target.value)
  //   } 

  //   if (name === 'due_date') {
  //     setDueDate(target.value)
  //   } 
  // }

  // // function handleClose() {
  // //   props.setShowEditForm(false);
  // // }

  // function handleSubmit(event) {
  //   event.preventDefault();
  //   const payload = {
  //     title,
  //     description,
  //     due_date
  //   }
  //   axios
  //     .put(`/todos/${TaskId}`, payload, { headers: { access_token: localStorage.getItem('access_token') } })
  //     .then(({ data }) => {
  //       fetchTasks_ref.current();
  //       Swal.fire(
  //         'Edited!',
  //         'The task has been edited.',
  //         'success'
  //       )
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // }

//   return (
//     <>
//       <div class="modal fade" id="edit-task-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
//         {/* <div id="edit-form-notification-container"></div> */}
//         <div className="modal-dialog modal-dialog-centered" role="document">
//             <div className="modal-content" style="background-color:transparent;border:none">
//                 <div className="edit-task-form-content">
//                     <div className="edit-task-form-title">
//                         <h1>Edit Task</h1>
//                     </div>
//                     <form id="edit-task-form" onSubmit={handleSubmit}>
//                         <div className="form-group">
//                             <label for="title">Title</label>
//                             <input type="text" className="form-control" id="edit-task-title" name="title" value={title} onChange={handleInputChange} />
//                         </div>
//                         <div className="form-group">
//                           <label htmlFor="description" className="col-form-label">Description</label>
//                           <textarea className="form-control text-area" id="description" name="description" value={description} onChange={handleInputChange}></textarea>
//                         </div>
//                         <div className="form-group">
//                             <label for="due_date">Due Date</label>
//                             <input type="date" className="form-control" id="edit-task-due_date" name="due_date" value={due_date} onChange={handleInputChange} />
//                         </div>
//                         <button type="submit" className="btn mt-4" id="edit-task-btn">Edit</button>
//                         <button type="button" className="btn mt-2" id="edit-cancel-btn" data-dismiss="modal">Cancel</button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//       </div>

//       {/* <div className="add-task-container col" style={{paddingLeft: 0, paddingRight: 0, width: "30rem"}}>
//         <div className="add-task-form-content">
//           <div className="add-form-container">
//             <div className="add-task-form-title">
//                 <h1>Add a task</h1>
//             </div>
//             <form id="add-task-form" onSubmit={this.handleSubmit}>
//               <div className="form-group">
//                 <label htmlFor="title">Title</label>
//                 <input type="text" className="form-control" id="add-task-title" name="title" value={this.state.title} onChange={this.handleInputChange} />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="description" className="col-form-label">Description</label>
//                 <textarea className="form-control text-area" id="description" name="description" value={this.state.description} onChange={this.handleInputChange}></textarea>
//               </div>
//               <div className="form-group">
//                 <label htmlFor="due_date">Due Date</label>
//                 <input type="date" className="form-control" id="add-task-due_date" name="due_date" value={this.state.due_date} onChange={this.handleInputChange} />
//               </div>
//               <button type="submit" className="btn mt-4" id="add-task-btn">Add</button>
//             </form>
//           </div>
//         </div>
//       </div> */}
//     </>
//   );
// }

export default EditTaskForm;
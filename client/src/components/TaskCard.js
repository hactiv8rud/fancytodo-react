import React from 'react';
import axios from '../config/axiosinstance.js';
import Swal from 'sweetalert2';
import formatDueDate from '../helper/formatDueDate';

function TaskCard(props) {
  const TaskId = props.task.id;

  function editStatus() {
    let payload = {}
    if (props.status.name === 'completed') {
      payload.status = 'uncompleted';
    } else {
      payload.status = 'completed';
    }

    axios
      .patch(`/todos/${TaskId}`, payload, { headers: { access_token: localStorage.getItem('access_token') } })
      .then(({ data }) => {
        props.fetchUncompleted_ref.current();
        props.fetchCompleted_ref.current();
        props.fetchExpired_ref.current();
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function editForm() {
    props.setShowEditForm(true);
    props.setStatusName(props.status.name);
    props.setTaskEdit(props.task);
  }

  function confirmDelete() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        return axios.delete(`/todos/${TaskId}`, { headers: { access_token: localStorage.getItem('access_token') }})
      }
    })
    .then(({ data }) => {
      if (data) {
        Swal.fire({
          toast: true,
          icon: 'success',
          title: data.message,
          animation: true,
          position: 'top',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: false,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        props.fetchUncompleted_ref.current();
        props.fetchCompleted_ref.current();
        props.fetchExpired_ref.current();
      }
    })
    .catch((err) => {
      console.log(err)
    })
  }

  return(
    <>
      <div className="card" style={{width: "100%"}}>
        <div className="card-body completed">
          <h5 className="card-title" style={{backgroundColor: props.status.bgColor}}>{props.task.title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{formatDueDate(props.task.due_date)}</h6>
          <p className="card-text">{props.task.description}</p>
          <div className="task-btn-container">
            {(props.status.name === "expired" || props.status.name === "uncompleted") && <button type="button" className="btn mt-2 btn-sm" onClick={editStatus}><img src="/images/mark_as_done.svg" className="mark_as_done-task-icon" width="30" height="30" alt="mark-as-done icon" />Mark as Done</button>}
            {(props.status.name === "completed") && <button type="button" className="btn mt-2 btn-sm" onClick={editStatus}><img src="/images/mark_as_undone.svg" className="mark_as_undone-task-icon" width="30" height="30" alt="mark-as-undone icon" />Mark as Undone</button>}
            <button type="button" className="btn mt-2 btn-sm" onClick={editForm}><img src="/images/edit.svg" className="edit-task-icon" width="30" height="30" alt="edit icon" />Edit</button>
            <button type="button" className="btn mt-2 btn-sm" onClick={confirmDelete}><img src="/images/delete.svg" className="delete-task-icon" width="30" height="30" alt="delete icon"/>Delete</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default TaskCard;

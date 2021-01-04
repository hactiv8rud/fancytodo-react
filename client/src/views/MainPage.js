import React from 'react';
import CurrentWeather from '../components/CurrentWeather';
import AddTaskForm from '../components/AddTaskForm';
import Quote from '../components/Quote';
import TaskContainer from '../components/TaskContainer';
import TaskEditForm from '../components/EditTaskForm';

function MainPage() {
  const fetchUncompleted_ref = React.useRef(null);
  const fetchCompleted_ref = React.useRef(null);
  const fetchExpired_ref = React.useRef(null);

  const uncompleted = {
    name: "uncompleted",
    title: "ONGOING",
    class: "uncompleted-container col",
    bgColor: "#ffd280"
  }

  const completed = {
    name: "completed",
    title: "COMPLETED",
    class: "completed-container col",
    bgColor: "#80ff80"
  }
  
  const expired = {
    name: "expired",
    title: "EXPIRED",
    class: "expired-container col",
    bgColor: "#ff6666"
  }

  const [showEditForm, setShowEditForm] = React.useState(false);
  const [taskEdit, setTaskEdit] = React.useState({});
  const [statusName, setStatusName] = React.useState({});
  
  return(
    <>
      <div id="main-page">
        {!showEditForm ? (
        <>
          <div className="main-top-container row" style={{height: "40%"}}>
            <CurrentWeather />
            <AddTaskForm fetchUncompleted_ref={fetchUncompleted_ref} />
            <Quote />
          </div>
          <div className="main-bottom-container mt-2 row">
            <TaskContainer setTaskEdit={setTaskEdit} setShowEditForm={setShowEditForm} setStatusName={setStatusName} fetchUncompleted_ref={fetchUncompleted_ref} fetchCompleted_ref={fetchCompleted_ref} fetchExpired_ref={fetchExpired_ref} status={uncompleted} />
            <TaskContainer setTaskEdit={setTaskEdit} setShowEditForm={setShowEditForm} setStatusName={setStatusName} fetchUncompleted_ref={fetchUncompleted_ref} fetchCompleted_ref={fetchCompleted_ref} fetchExpired_ref={fetchExpired_ref} status={completed} />
            <TaskContainer setTaskEdit={setTaskEdit} setShowEditForm={setShowEditForm} setStatusName={setStatusName} fetchUncompleted_ref={fetchUncompleted_ref} fetchCompleted_ref={fetchCompleted_ref} fetchExpired_ref={fetchExpired_ref} status={expired} />
          </div>
        </>
        ) : (
          <TaskEditForm statusName={statusName} taskEdit={taskEdit} setShowEditForm={setShowEditForm} fetchUncompleted_ref={fetchUncompleted_ref} fetchCompleted_ref={fetchCompleted_ref} fetchExpired_ref={fetchExpired_ref} />
        )
        } 
      </div>
    </>
  );
}

export default MainPage;

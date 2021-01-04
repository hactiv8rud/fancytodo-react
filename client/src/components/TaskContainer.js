import React from 'react';
import TaskCard from '../components/TaskCard';
import NoTask from '../components/NoTask';
import axios from '../config/axiosinstance.js';

function TaskContainer(props) {
  const [searchBy, setSearchBy] = React.useState('title');
  const [searchKey, setSearchKey] = React.useState('');
  const [tasks, setTasks] = React.useState([]);
  const fetchTasksCallback = React.useCallback(() => {
    fetchTasks();
  }, [])

  function handleInputChange(event) {
    const target = event.target;
    const name = target.name;

    if (name === 'searchBy') {
      setSearchBy(target.value)
    } 

    if (name === 'searchKey') {
      setSearchKey(target.value)
    } 
  }

  function fetchTasks() {
    axios
      .get('/todos', { headers: { access_token: localStorage.getItem('access_token') } })
      .then(({ data }) => {
        const today = new Date();
        //eslint-disable-next-line
        const groupedTasks = data.filter((task) => {
          if (props.status.name === 'expired') {
            if (task.status === 'uncompleted' && new Date(task.due_date) < today) {
              return task;
            }
          } else if (props.status.name === 'uncompleted') {
              if (task.status === 'uncompleted' && new Date(task.due_date) >= today) {
                return task;
              }
          } else if (props.status.name === 'completed') {
              if (task.status === 'completed') {
                return task;
              } 
          }
        });

        if (searchKey !== '') {
          //eslint-disable-next-line
          const filteredTasks = groupedTasks.filter((task) => {
            if (task[searchBy].toLowerCase().includes(searchKey.toLowerCase())) {
              return task;
            }
          });
          setTasks(filteredTasks);
        } else {
          setTasks(groupedTasks);
        }
      })
  }

  React.useEffect(() => {
    if (props.status.name === 'uncompleted') {
      props.fetchUncompleted_ref.current = fetchTasksCallback;
    }

    if (props.status.name === 'completed') {
      props.fetchCompleted_ref.current = fetchTasksCallback;
    }

    if (props.status.name === 'expired') {
      props.fetchExpired_ref.current = fetchTasksCallback;
    }
  }, []);

  React.useEffect(() => {
    fetchTasks();
  }, [searchKey, searchBy]);

  return (
    <>
      <div className={props.status.class}>  
        <div className="header-container">
          <h3 className="header-title text-center">{props.status.title}</h3>
            <div className="form-group">
              <label htmlFor="search-categories">Search by: </label>
              <select className="form-control" name="searchBy" value={searchBy} onChange={handleInputChange}>
                <option value="title">Title</option>
                <option value="description">Description</option>
                <option value="due_date">Due Date</option>
              </select>
            </div>
            <div className="form-group">
              <input className="form-control border-light" type="text" placeholder="search" name="searchKey" value={searchKey} onChange={handleInputChange} />
            </div>
        </div>
        <div className="task-container-content">
          {
            tasks.length ? (
              tasks.map((task) => {
                return <TaskCard setShowEditForm={props.setShowEditForm} setStatusName={props.setStatusName} setTaskEdit={props.setTaskEdit} task={task} key={task.id} status={props.status} fetchUncompleted_ref={props.fetchUncompleted_ref} fetchCompleted_ref={props.fetchCompleted_ref} fetchExpired_ref={props.fetchExpired_ref} />
              })) : <NoTask />
          }
        </div>
      </div>
    </>
  );
}

export default TaskContainer;

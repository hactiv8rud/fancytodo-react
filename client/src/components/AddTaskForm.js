import React from 'react';
import axios from '../config/axiosinstance.js';
import Swal from 'sweetalert2';

class AddTaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      due_date: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;

    this.setState({
      [name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    axios
      .post('/todos', this.state, { headers: { access_token: localStorage.getItem('access_token') } })
      .then(({ data }) => {
        this.props.fetchUncompleted_ref.current();
        Swal.fire(
          'Added!',
          'The task has been added.',
          'success'
        )
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        this.setState({ title: '', description: '', due_date: '' })
      })
  }

  render() {
    return (
      <>
        <div className="add-task-container col" style={{paddingLeft: 0, paddingRight: 0, width: "30rem"}}>
          <div className="add-task-form-content">
            <div className="add-form-container">
              <div className="add-task-form-title">
                  <h1>Add a task</h1>
              </div>
              <form id="add-task-form" onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input type="text" className="form-control" id="add-task-title" name="title" value={this.state.title} onChange={this.handleInputChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="description" className="col-form-label">Description</label>
                  <textarea className="form-control text-area" id="description" name="description" value={this.state.description} onChange={this.handleInputChange}></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="due_date">Due Date</label>
                  <input type="date" className="form-control" id="add-task-due_date" name="due_date" value={this.state.due_date} onChange={this.handleInputChange} />
                </div>
                <button type="submit" className="btn mt-4" id="add-task-btn">Add</button>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default AddTaskForm;

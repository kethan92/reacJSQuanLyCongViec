import React, {Component} from 'react';

class TaskForm extends Component {
  constructor(props){
    super(props);
    this.state={
        id:'',
        name:'',
        status:false
    }
  }
  onCloseForm=()=>{
    this.props.onCloseForm();
  }
  onChange=(e)=>{
    const target=e.target;
    const name=target.name;
    let value=target.value;
    if(name==='status'){
      value=target.value === 'true' ? true : false;
    }
    this.setState({
      [name]: value
    });
  }
  onSubmit=(e)=>{
    e.preventDefault();
    this.props.onSubmitForm(this.state);
    //Cancel and Close Form
      this.onClear();
  }
  onClear=()=>{
    this.setState({
       name:'',
       status:false
    });
  }
  componentWillMount(){
    const { task }=this.props;
    console.log(task);
    if(task){
      this.setState({
          id:task.id,
          name:task.name,
          status:task.status
      });
    }
  }
  componentWillReceiveProps(nextProps){
      if(nextProps && nextProps.task){
          this.setState({
              id:nextProps.task.id,
              name:nextProps.task.name,
              status:nextProps.task.status
          });
      }
      else if(!nextProps.task) {
        this.setState({
            id:'',
            name:'',
            status:false
        });
      }
  }
  render() {
    const { id }=this.state;
    return (<div className="panel panel-warning">
      <div className="panel-heading">
        <h3 className="panel-title">{ id !== '' ? 'Cap Nhat Công Việc' : 'Them COng Viec' }
          <span
              className="fa fa-times-circle text-right"
              onClick={this.onCloseForm}
          >

          </span>
        </h3>
      </div>
      <div className="panel-body">
        <form
            onSubmit={this.onSubmit}
        >
          <div className="form-group">
            <label>Tên :</label>
            <input
                type="text"
                className="form-control"
                name="name"
                value={this.state.name}
                onChange={this.onChange}
            />
          </div>
          <label>Trạng Thái :</label>
          <select
              className="form-control"
              required="required"
              name="status"
              onChange={this.onChange}
              value={this.state.status}
          >
            <option value={true}>Kích Hoạt</option>
            <option value={false}>Ẩn</option>
          </select>
          <br/>
          <div className="text-center">
            <button type="submit" className="btn btn-warning">Thêm</button>&nbsp;
            <button
                type="button"
                className="btn btn-danger"
                onClick={this.onClear}
            >Hủy Bỏ</button>
          </div>
        </form>
      </div>
    </div>);
  }
}

export default TaskForm;

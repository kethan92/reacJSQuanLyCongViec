import React, {Component} from 'react';

class TaskItem extends Component {
  constructor(props){
    super(props);
    this.UpdateStatus=this.UpdateStatus.bind(this);
    this.onDelete=this.onDelete.bind(this);
  }
  UpdateStatus=()=>{
    const { onUpdateStatus,task }=this.props;
    //console.log(task);
      onUpdateStatus(task.id); //this.props.onUpdateStatus(this.props.task.id)
  }
  onDelete=()=>{
    const { onDelete,task }=this.props;
    onDelete(task.id); //this.props.onDelete(this.props.task.id)
  }
  onUpdate=()=>{
    const { onUpdate,task }=this.props;
    onUpdate(task.id);
  }
  render() {
    const { task,index }=this.props; // var elmTaskItem=this.props.elmTaskItem
    return (<tr>
      <td>{ index }</td>
      <td>{ task.name }</td>
      <td className="text-center">
        <span
            className={ task.status === true ? 'label label-success' : 'label label-danger'}
            onClick={this.UpdateStatus}
        >
            { task.status === true ? 'Kich hoat' : 'An' }
        </span>
      </td>
      <td className="text-center">
        <button
            type="button"
            className="btn btn-warning"
            onClick={this.onUpdate}
        >
          <span className="fa fa-pencil mr-5"></span>Sửa
        </button>
        &nbsp;
        <button
            type="button"
            className="btn btn-danger"
            onClick={this.onDelete}
        >
          <span className="fa fa-trash mr-5"></span>Xóa
        </button>
      </td>
    </tr>);
  }
}

export default TaskItem;

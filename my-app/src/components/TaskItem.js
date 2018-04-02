import React, {Component} from 'react';

class TaskItem extends Component {
  constructor(props){
    super(props);
    this.UpdateStatus=this.UpdateStatus.bind(this);
  }
  UpdateStatus=()=>{
    const { onUpdateStatus,task }=this.props;
    //console.log(task);
      onUpdateStatus(task.id);
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
        <button type="button" className="btn btn-warning">
          <span className="fa fa-pencil mr-5"></span>Sửa
        </button>
        &nbsp;
        <button type="button" className="btn btn-danger">
          <span className="fa fa-trash mr-5"></span>Xóa
        </button>
      </td>
    </tr>);
  }
}

export default TaskItem;

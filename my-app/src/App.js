import React, {Component} from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';

class App extends Component {
  constructor(props){
    super();
    this.state={
        tasks:[], // id,name,status
        isDisplayForm : false,
        taskEditing: null,
        filter : {
            name : '',
            status : -1
        }
    }
  }

  // component Will Mount duoc goi duy nhat 1 lan
  componentWillMount(){
    if(localStorage.getItem('tasks')){
      const tasks=JSON.parse(localStorage.getItem('tasks'));
      this.setState({
          tasks:tasks
      });
    }
  }
  // funciton
  onGenerateData=()=>{
    const tasks=[
        {
            id: this.generateID(),
            name: 'Hoc lap trinh',
            status: true
        },
        {
          id: this.generateID(),
          name: 'Di boi',
          status: false
        },
        {
            id: this.generateID(),
            name: 'ngu',
            status: true
        }
    ];
    //alert("a");
      console.log(tasks);
      this.setState({
          tasks:tasks
      });
    localStorage.setItem('tasks',JSON.stringify(tasks));
  }
  s4(){
    return Math.floor((1+Math.random())*0x10000).toString(16).substring(1);
  }
  generateID(){
    return this.s4()+this.s4()+'-'+this.s4()+this.s4()+'-'+this.s4()+this.s4();
  }
  Toggle=()=>{
      if(this.state.isDisplayForm && this.state.taskEditing !== null){
          this.setState({
              isDisplayForm: true,
              taskEditing: null
          });
      }
      else {
          this.setState({
              isDisplayForm: !this.state.isDisplayForm,
              taskEditing: null
          });
      }
  }
  // function kich nut x them cong viec
    onCloseForm=()=>{
      this.setState({
         isDisplayForm: false
      });
    }
    onSubmitForm=(data)=>{
        const { tasks }=this.state;
        if(data.id === ''){
            data.id=this.generateID();
            tasks.push(data);
        }
        else {
            const index=this.findIndex(data.id);
            tasks[index]=data;
        }
        this.setState({
            tasks:tasks,
            taskEditing: null
        });
        localStorage.setItem('tasks',JSON.stringify(tasks));
    }
    onUpdateStatus=(id)=>{
        //console.log(id);
        const { tasks }=this.state;
        const index=this.findIndex(id);
        if(index!==-1){
            tasks[index].status=!tasks[index].status;
            this.setState({
               tasks:tasks,
            });
            localStorage.setItem('tasks',JSON.stringify(tasks));
        }
    }
    findIndex=(id)=>{
        const { tasks }=this.state;
        let result=-1;
        tasks.forEach((task,index)=>{
            if(task.id===id){
                result=index;
            }
        })
        return result;
    }
    onDelete=(id)=>{
      const {tasks}=this.state;
      const index=this.findIndex(id);
      if(index!==-1){
          tasks.splice(index,1);
          this.setState({
             tasks:tasks
          });
          localStorage.setItem('tasks',JSON.stringify(tasks));
      }
      this.onCloseForm();
    }
    onUpdate=(id)=>{
        const { tasks }=this.state;
        const index=this.findIndex(id);
        const taskEditing=tasks[index];
        this.setState({
           taskEditing: taskEditing
        });
        this.onShowForm();
    }
    onShowForm=()=>{
      this.setState({
          isDisplayForm: true
      });
    }
    onFilter = (filterName, filterStatus) => {
        filterStatus = parseInt(filterStatus,10);
        this.setState({
            filter : {
                name : filterName.toLowerCase(),
                status : filterStatus
            }
        });
    }
  render() {
      const { isDisplayForm,taskEditing,filter } = this.state; // tuong duong voi const tasks=this.state.tasks;
      let { tasks } = this.state;
      if(filter){
          if(filter.name){
              tasks = tasks.filter((task)=>{
                 return task.name.toLowerCase().indexOf(filter.name) !== -1;
              });
          }
          tasks = tasks.filter((task)=>{
              if(filter.status === -1){
                  return task;
              }
              else {
                  return task.status === (filter.status === 1 ? true:false)
              }
          });
      }
      const elmTaskForm = isDisplayForm
          ? <TaskForm
              onCloseForm={this.onCloseForm}
              onSubmitForm={this.onSubmitForm}
              task={taskEditing}
            /> : '';
    return (<div className="container">
      <div className="text-center">
        <h1>Quản Lý Công Việc</h1>
        <hr/>
      </div>
      <div className="row">
        <div className={ isDisplayForm ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4'
            : ''}>
            { elmTaskForm }
        </div>
        <div className={ isDisplayForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8'
            : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
          <button
              type="button"
              className="btn btn-primary"
              onClick={this.Toggle}
          >
            <span className="fa fa-plus mr-5"></span>Thêm Công Việc
          </button>
          <button
            type="button"
            className="btn btn-danger ml-5"
            onClick={this.onGenerateData}
          >GenerateData</button>
          <Control />
          <TaskList
              tasks={ tasks }
              onUpdateStatus={this.onUpdateStatus}
              onDelete={this.onDelete}
              onUpdate={this.onUpdate}
              onFilter = { this.onFilter }
          />
        </div>
      </div>
    </div>);
  }
}

export default App;

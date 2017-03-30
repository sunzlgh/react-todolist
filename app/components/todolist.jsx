import React from 'react';
import TypeNew  from './typenew';
import List from './list';

//父组件
class Todolist extends React.Component{
    constructor() {
        super(); //调用父类的构造函数
        this.state = {  //定义组件状态
            todolist: [
                {
                    content: "111",
                    date: "2017-03-29"
                },
                {
                    content: "222",
                    date: "2017-03-30"
                },
                {
                    content: "333",
                    date: "2017-03-31"
                }
            ]
        }
    }
    render(){
        return(
            <div className="main">
                <h3>收件箱</h3>
                <List todo={this.state.todolist} onChange={this.handleChange.bind(this)} />
                <TypeNew todo={this.state.todolist} onAdd={this.handleChange.bind(this)} />
            </div>
        )
    }
    handleChange (rows) {
        this.setState({
            todolist: rows
        });
    }
    DelClick(index){
        this.state.todolist.splice(index,1);
        this.setState({
            todolist: this.state.todolist
        })
    } 
}

export default Todolist;
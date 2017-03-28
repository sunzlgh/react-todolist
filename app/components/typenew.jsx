import React from 'react';
import List from './list';
import Todolist from './todolist';


//输入框组件，用于新增数据
class TypeNew extends React.Component{
    handleAdd(){
        let newthing = this.refs.inputText.value.trim();
        let rows = this.props.todo;

        if(newthing == ""){
            alert("数据不能为空");
            return;
        }
        rows.push(newthing);
        this.props.onAdd(rows);
        
        this.refs.inputText.value = "";
    }
    render(){
        return (
            <div className="header">
                <input type="text" name="" ref="inputText"/>
                <button onClick={this.handleAdd.bind(this)}>增加</button>
            </div>
        )
    }
}

export default TypeNew;
import React from 'react';

//Because React-Bootstrap doesn't depend on a very precise version of Bootstrap, 
//we don't ship with any included css. However, some stylesheet is required to use these components. 
import 'bootstrap/dist/css/bootstrap.css';
import * as RBt from "react-bootstrap";

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
                <input type="text" className="form-control" ref="inputText"/>
               
                <RBt.Button bsStyle="success" onClick={this.handleAdd.bind(this)}>增加</RBt.Button>
            </div>
        )
    }
}

export default TypeNew;
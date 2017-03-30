import React from 'react';

//Because React-Bootstrap doesn't depend on a very precise version of Bootstrap, 
//we don't ship with any included css. However, some stylesheet is required to use these components. 
import 'bootstrap/dist/css/bootstrap.css';
import * as RBt from "react-bootstrap";

import List from './list';
import Todolist from './todolist';

//输入框组件，用于新增数据
class TypeNew extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            changestyle: 0
        }
    }

    handleAdd() {
        let newthing = this.refs.inputText.value.trim();
        let newdate = this.refs.inputDate.value;

        let rows = this.props.todo;

        if (newthing == "") {
            alert("数据不能为空");
            return;
        }
        rows.push({
            "content": newthing,
            "date": newdate
        });
        this.props.onAdd(rows);

        this.refs.inputText.value = "";
        this.refs.inputDate.value = "";
        this.setState({
            changestyle: 0
        })
    }
    handleCancel() {
        this.setState({
            changestyle: 0
        })
    }
    handleAddList() {
        this.setState({
            changestyle: 1
        })
    }
    render() {
        let date = new Date();
        let month = (date.getMonth() + 1).toString();
        month = month.length < 2 ? "0" + month : month;
        let day = date.getDate().toString();
        day = day.length < 2 ? "0" + day : day;
        let dateToday = date.getFullYear() + "-" + month + "-" + day;

        if (this.state.changestyle == 0) {
            return (
                <div className="add-prev" onClick={this.handleAddList.bind(this)}>
                    <i>＋</i>添加任务
                </div>
            )
        }
        else {
            return (
                <div className="add">
                    <div className="add-list">
                        <input type="text" className="form-control add-text" ref="inputText" />
                        <input type="date" className="form-control add-date" ref="inputDate" defaultValue={dateToday} />
                    </div>
                    <RBt.Button bsStyle="success" onClick={this.handleAdd.bind(this)}>增加</RBt.Button>
                    <a href="" onClick={this.handleCancel.bind(this)}>取消</a>
                </div>
            )
        }

    }
}

export default TypeNew;
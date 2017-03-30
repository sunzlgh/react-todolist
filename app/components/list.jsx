import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import * as RBt from "react-bootstrap";

import TypeNew from './typenew';
import Todolist from './todolist';

import '../styles/components/todolist.scss';

//列表组件，展示、删除、修改数据
class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  //用于记录修改状态
            changenum: -1,      //记录哪一个list要修改
            changevalue: "",     //记录要修改的list content值
            changedate: ""
        }
    }

    handleDel(e) {
        let rows = this.props.todo;
        let delIndex = e.target.getAttribute('data-key');

        // 更新数据，并使用 onDel 更新到 TodoList 的 state 中，以便 React自动render
        rows.splice(delIndex, 1);
        this.props.onChange(rows);

        // 防止修改后按删除按钮
        this.setState({
            changenum: -1
        })
    }
    //点击修改按钮，改变state
    handleChange(e) {
        let editIndex = e.target.getAttribute('data-key');
        let msg = this.props.todo[editIndex].content;
        let date = this.props.todo[editIndex].date;

        this.setState({
            changenum: editIndex,
            changevalue: msg,
            changedate: date
        })
    }
    //react对约束性组件的处理
    handleText(e) {
        this.setState({
            changevalue: e.target.value
        })
    }
    handleDate(e) {
        this.setState({
            changedate: e.target.value
        })
    }
    //保存
    handleSave() {
        let newthing = this.state.changevalue;
        let newdate = this.state.changedate;
        let rows = this.props.todo;

        if (newthing == "") {
            alert("数据不能为空");
            return;
        }
        let index = this.state.changenum;
        rows[index].content = newthing;
        rows[index].date = newdate;
        this.props.onChange(rows);

        this.setState({
            changenum: -1,
            changevalue: "",
            changedate: ""
        })
    }
    render() {
        return (
            <ul className="theList">
                {
                    this.props.todo.map((item, index) => {
                        //如果点击修改，渲染成type框
                        if (this.state.changenum == index) {
                            return (
                                <li key={index}>
                                    <div className="add-list">
                                        <input type="text" className="form-control add-text" ref="inputnew" defaultValue={item.content} onChange={this.handleText.bind(this)} />
                                        <input type="date" className="form-control add-date" ref="inputDate" defaultValue={item.date} onChange={this.handleDate.bind(this)}/>
                                    </div>
                                   <RBt.Button bsStyle="success" onClick={this.handleSave.bind(this)}>保存</RBt.Button>
                                </li>
                            )
                        }
                        else {
                            let dateArr = item.date.split("-");
                            if(dateArr[1].substr(0, 1) == "0"){
                                 dateArr[1] = dateArr[1].slice(1);
                            }
                
                            return (
                                <li key={index}>
                                    <i className="list-del" onClick={this.handleDel.bind(this)} data-key={index}></i>
                                    <div className="list-item" onClick={this.handleChange.bind(this)} data-key={index}>
                                        {item.content}
                                        <span className="list-date" data-key={index}>{dateArr[1]}月{dateArr[2]}日</span>
                                    </div>
                                </li>
                            )
                        }
                    })
                    /* 要获取事件的索引值并对一个函数传参但不执行这个函数时，在方法名后.bind(_this)来改变this的指向*/
                }
            </ul>
        )
    }
}

export default List;
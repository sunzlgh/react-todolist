var React = require('react');
var TypeNew  = require('./typenew');
var List = require('./list');

//父组件
var Todolist = React.createClass({
    //初始化状态
    getInitialState: function(){
        return{
            todolist:['111', '222', '333']
        };
    },
    render: function(){
        return(
            <div>
                <TypeNew todo={this.state.todolist} onAdd={this.handleChange} />
                <List todo={this.state.todolist} onChange={this.handleChange} />
            </div>
        )
    },
    handleChange: function (rows) {
        this.setState({
            todolist: rows
        });
    },
    DelClick:function(index){
        this.state.todolist.splice(index,1);
        this.setState({
            todolist: this.state.todolist
        })
    }
});
        
module.exports = Todolist;
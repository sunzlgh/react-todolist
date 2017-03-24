var React = require('react');

//输入框组件，用于新增数据
var TypeNew = React.createClass({
    handleAdd: function(){
        var newthing = this.refs.inputText.value.trim();
        var rows = this.props.todo;

        if(newthing == ""){
            alert("数据不能为空");
            return;
        }
        rows.push(newthing);
        this.props.onAdd(rows);
        
        this.refs.inputText.value = "";
    },
    render: function(){
        return (
            <div className="header">
                <input type="text" name="" ref="inputText"/>
                <button onClick={this.handleAdd}>增加</button>
            </div>
        )
    }
})

module.exports = TypeNew;
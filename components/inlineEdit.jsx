InlineEdit = React.createClass({
  propTypes: {
    defaultValue: React.PropTypes.string,
    method: React.PropTypes.string,
    parentId: React.PropTypes.string,
    type: React.PropTypes.oneOf(['input', 'textarea']),
    placeholder: React.PropTypes.string
  },

  getDefaultProps() {
    return {
      type: 'input',
      placeholder: 'Click to add'
    };
  },

  getInitialState() {
    return {
      editing: false,
      text: this.props.defaultValue
    };
  },

  handleEditToggle() {
    this.setState({editing: !this.state.editing});
  },

  handleOnChange(event) {
    this.setState({text: event.target.value});
  },

  handleSave(event) {
    console.log(this.state.text);
    if(event.which === 13) {
      if(!event.shiftKey) {
        Meteor.call(this.props.method, {
          id: this.props.parentId,
          value: this.state.text
        }, (error, success) => {
          if(success){
            Session.set('toast', this.props.toast);
            this.setState({
              editing: false
            });
          }
        });
      }
    }
  },

  render() {
    let {defaultValue, type} = this.props;
    if(this.state.editing) {
      return (
        <span className="inline-edit">
          {type === 'input' ?
            <input
              type="text"
              ref="inlineInput"
              defaultValue={this.state.text}
              onChange={this.handleOnChange}
              onBlur={this.handleEditToggle}
              onKeyPress={this.handleSave}
              autoFocus/>
          : null}
          {type === 'textarea' ?
            <span>
              <textarea
                ref="inlineInput"
                defaultValue={this.state.text}
                onChange={this.handleOnChange}
                onKeyPress={this.handleSave}
                onBlur={this.handleEditToggle}
                autoFocus/>
              <small>Format with Markdown. Shift + enter to skip a line.</small>
            </span>
          : null}
        </span>
      );
    }
    return (
      <span onClick={this.handleEditToggle}>
        {defaultValue ? type === 'textarea' ?
          <Markdown>{defaultValue}</Markdown>
        : defaultValue : this.props.placeholder}
      </span>
    );
  }
});

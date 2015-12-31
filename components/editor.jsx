Editor = React.createClass({
  propTypes: {
    markup: React.PropTypes.string,
    onSave: React.PropTypes.func
  },

  getInitialState() {
    return {
      editor: null
    };
  },

  componentDidMount() {
    let editor = CodeMirror.fromTextArea(ReactDOM.findDOMNode(this.refs.editor), {
      lineNumbers: true,
      mode: 'htmlmixed'
    });
    this.setState({editor: editor});
  },

  render() {
    return (
      <div className="editor form-group">
        <textarea
          className="editor__input"
          defaultValue={this.props.markup}
          ref="editor"/>
        <button
          type="submit"
          onClick={this.props.onSave.bind(null, this)}>
          Save
        </button>
      </div>
    );
  }
});

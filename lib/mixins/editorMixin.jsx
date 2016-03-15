EditorMixin = {
  getInitialState() {
    return {
      editor: null
    };
  },

  componentDidMount() {
    console.log("editor mount");
    let editor = CodeMirror.fromTextArea(ReactDOM.findDOMNode(this.refs.editor), {
      lineNumbers: true,
      mode: 'htmlmixed',
      theme: 'tomorrow-night-eighties'
    });
    this.setState({editor: editor});
  }
};

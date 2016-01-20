EditorMixin = {
  getInitialState() {
    return {
      editor: null
    };
  },

  _editorInit() {
    let editor = CodeMirror.fromTextArea(ReactDOM.findDOMNode(this.refs.editor), {
      lineNumbers: true,
      mode: 'htmlmixed',
      theme: 'tomorrow-night-eighties'
    });
    this.setState({editor: editor});
  },

  componentDidMount() {
    this._editorInit();
  }
};

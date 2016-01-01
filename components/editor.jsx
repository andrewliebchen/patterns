Editor = React.createClass({
  propTypes: {
    markup: React.PropTypes.string,
    patternId: React.PropTypes.string,
  },

  getInitialState() {
    return {
      editor: null
    };
  },

  handleSave() {
    Meteor.call('updateMarkup', {
      id: this.props.patternId,
      markup: this.state.editor.getValue()
    }, (error, success) => {
      this.setState({tab: 0});
    });
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
          onClick={this.handleSave}>
          Save
        </button>
      </div>
    );
  }
});

if(Meteor.isServer) {
  Meteor.methods({
    updateMarkup(args) {
      check(args, {
        id: String,
        markup: String
      });

      return Patterns.update(args.id, {
        $set : {
          markup: args.markup
        }
      });
    }
  });
}

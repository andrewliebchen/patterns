Editor = React.createClass({
  mixins: [EditorMixin],

  propTypes: {
    markup: React.PropTypes.string,
    patternId: React.PropTypes.string,
  },

  handleSave() {
    Meteor.call('updateMarkup', {
      id: this.props.patternId,
      markup: this.state.editor.getValue()
    }, (error, success) => {
      this.setState({tab: 0});
    });
  },

  render() {
    return (
      <div className="editor form-group">
        <textarea
          className="editor__input"
          defaultValue={this.props.markup}
          ref="editor"/>
        <footer className="editor__footer">
          <button
            type="submit"
            onClick={this.handleSave}>
            Save
          </button>
        </footer>
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

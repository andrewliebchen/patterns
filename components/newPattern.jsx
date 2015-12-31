NewPattern = React.createClass({
  propTypes: {
    styleguideId: React.PropTypes.string
  },

  handleSavePattern(event) {
    event.preventDefault();
    Meteor.call('addPattern', {
      styleguide: this.props.styleguideId,
      name: ReactDOM.findDOMNode(this.refs.name).value,
      markup: ReactDOM.findDOMNode(this.refs.editor).value,
      created_at: Date.now()
    });
  },

  render() {
    return (
      <form className="new-pattern">
        <h4>New pattern</h4>
        <div className="form-group">
          <label>Pattern name</label>
          <input type="text" ref="name"/>
        </div>
        <div className="form-group">
          <label>Pattern markup</label>
          <textarea
            className="editor"
            defaultValue={this.props.markup}
            ref="editor"/>
        </div>
        <input type="submit" value="Save" onClick={this.handleSavePattern}/>
      </form>
    );
  }
});

if(Meteor.isServer) {
  Meteor.methods({
    addPattern(args) {
      check(args, {
        styleguide: String,
        name: String,
        markup: String,
        created_at: Number
      });

      return Patterns.insert({
        styleguide: args.styleguide,
        name: args.name,
        markup: args.markup,
        created_at: args.created_at
      });
    }
  })
}

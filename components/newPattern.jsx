NewPattern = React.createClass({
  getInitialState() {
    let urlParam = FlowRouter.getQueryParam('new');

    return {
      newPattern: urlParam === 'new-pattern' ? true : false
    };
  },

  handleShowNewPattern() {
    this.setState({newPattern: true});
    FlowRouter.setQueryParams({new: 'pattern'});
  },

  handleHideNewPattern() {
    this.setState({newPattern: false});
    FlowRouter.setQueryParams({new: null});
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
      <span>
        <a onClick={this.handleShowNewPattern}>Add pattern</a>
        {this.state.newPattern ?
          <div className="new-pattern__wrapper">
            <a onClick={this.handleHideNewPattern}>X</a>
            <form className="new-pattern">
              <header className="section__header">
                <h3>New pattern</h3>
              </header>
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
          </div>
        : null}
      </span>
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

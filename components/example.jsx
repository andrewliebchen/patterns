Example = React.createClass({
  propTypes: {
    patternId: React.PropTypes.string,
    markup: React.PropTypes.string,
    stylesheet: React.PropTypes.string
  },

  getInitialState() {
    return {
      tab: 0,
      markup: this.props.markup
    };
  },

  handleTab(tab) {
    this.setState({tab: tab});
  },

  handleUpdateMarkup(event) {
    this.setState({markup: event.target.value})
  },

  handleMarkupEdit(event) {
    Meteor.call('updateMarkup', {
      id: this.props.patternId,
      markup: this.state.markup
    }, (error, success) => {
      this.setState({tab: 0});
    });
  },

  render: function() {
    return (
      <div className="example">
        <nav className="tabs">
          <a
            className={`tab ${this.state.tab === 0 ? 'is-active' : ''}`}
            onClick={this.handleTab.bind(null, 0)}>
            Example
          </a>
          <a
            className={`tab ${this.state.tab === 1 ? 'is-active' : ''}`}
            onClick={this.handleTab.bind(null, 1)}>
            Markup
          </a>
        </nav>
        {this.state.tab === 0 ?
          <div className="tabs__pane">
            <ExampleView markup={this.state.markup} stylesheet={this.props.stylesheet}/>
          </div>
        : null}
        {this.state.tab === 1 ?
          <div className="tabs__pane">
            <div className="form-group">
              <textarea
                className="editor"
                defaultValue={this.state.markup}
                onChange={this.handleUpdateMarkup}/>
              <button type="submit" onClick={this.handleMarkupEdit}>
                Save
              </button>
            </div>
          </div>
        : null}
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

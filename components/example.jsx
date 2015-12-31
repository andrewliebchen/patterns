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

  handleSaveMarkup(component, event) {
    // This might be a bad idea...
    this.setState({markup: component.state.editor.getValue()});

    Meteor.call('updateMarkup', {
      id: this.props.patternId,
      markup: this.state.markup
    }, (error, success) => {
      this.setState({tab: 0});
    });
  },

  render: function() {
    console.log(this.state.markup);
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
            <ExampleView
              markup={this.state.markup}
              stylesheet={this.props.stylesheet}/>
          </div>
        : null}
        {this.state.tab === 1 ?
          <div className="tabs__pane">
            <Editor
              markup={this.state.markup}
              onSave={this.handleSaveMarkup}/>
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

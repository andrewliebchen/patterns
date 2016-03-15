const NewPatternForm = React.createClass({
  mixins: [EditorMixin],

  getInitialState() {
    return {
      tab: 0
    };
  },

  handleTab(tab) {
    this.setState({tab: tab});
  },

  handleSavePattern(event) {
    event.preventDefault();
    Meteor.call('addPattern', {
      styleguide: this.props.styleguideId,
      name: ReactDOM.findDOMNode(this.refs.name).value,
      markup: this.state.editor.getValue(),
      created_at: Date.now()
    }, (error, success) => {
      if(success) {
        Session.set('alert', 'New pattern created!');
      }
    });
  },

  render() {
    let {tab} = this.state;
    return (
      <div className="new-pattern__wrapper">
        <Icon
          type="close"
          className="new-pattern__close"
          onClick={this.handleHideNewPattern}/>
        <form className="new-pattern">
          <header className="section__header">
            <h3>New pattern</h3>
          </header>
          <div className="form-group">
            <label>Pattern name</label>
            <input type="text" ref="name"/>
          </div>
          <div className="tabs__container">
            <nav className="tabs">
              <a
                className={`tab ${tab === 0 ? 'is-selected' : ''}`}
                onClick={this.handleTab.bind(null, 0)}>
                Write markup
              </a>
              <a
                className={`tab ${tab === 1 ? 'is-selected' : ''}`}
                onClick={this.handleTab.bind(null, 1)}>
                Use KSS
              </a>
            </nav>
            <div className="tabs__pane">
              <div
                className="form-group"
                style={{display: tab === 0 ? 'block' : 'none'}}>
                <textarea
                  className="editor__input"
                  ref="editor"/>
              </div>
              <div
                className="form-group"
                style={{display: tab === 1 ? 'block' : 'none'}}>
                <label>Stylesheet or partial URL</label>
                <input type="url" ref="kssUrl"/>
              </div>
            </div>
          </div>
          <button type="submit" onClick={this.handleSavePattern}>
            Create Pattern
          </button>
        </form>
      </div>
    );
  }
});

NewPattern = React.createClass({
  getInitialState() {
    let urlParam = FlowRouter.getQueryParam('new');

    return {
      newPattern: urlParam === 'pattern' ? true : false
    };
  },

  _hideNewPattern() {
    this.setState({newPattern: false});
    FlowRouter.setQueryParams({new: null});
  },

  handleShowNewPattern() {
    this.setState({newPattern: true});
    FlowRouter.setQueryParams({new: 'pattern'});
  },

  handleHideNewPattern() {
    this._hideNewPattern();
  },

  render() {
    return (
      <span>
        <a onClick={this.handleShowNewPattern}>Add pattern</a>
        {this.state.newPattern ?
          <NewPatternForm />
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

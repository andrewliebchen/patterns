Home = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      styleguides: Styleguides.find().fetch(),
      patterns: Patterns.find().fetch()
    };
  },

  render() {
    return (
      <div className="wrapper">
        <div className="styleguides">
          {this.data.styleguides.map((styleguide, i) => {
            return (
              <div className="styleguide" key={i}>
                <h2>{styleguide.name}</h2>
                <PatternList
                  patterns={this.data.patterns}
                  stylesheet={styleguide.stylesheet}/>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
});

PatternList = React.createClass({
  render() {
    return (
      <div className="patterns">
        {this.props.patterns.map((pattern, i) => {
          return (
            <div className="pattern" key={i}>
              <h3>{pattern.name}</h3>
              <Example
                patternId={pattern._id}
                markup={pattern.markup}
                stylesheet={this.props.stylesheet}/>
            </div>
          )
        })}
      </div>
    );
  }
});

Example = React.createClass({
  getInitialState() {
    return {
      editing: false
    };
  },

  handleEditToggle() {
    this.setState({editing: !this.state.editing})
  },

  handleMarkupEdit(event) {
    Meteor.call('updateMarkup', {
      id: this.props.patternId,
      markup: event.target.value
    });
  },

  _renderExample() {
    let exampleFrame = this.refs.example;
    let exampleFrameDoc = exampleFrame.contentWindow.document;
    exampleFrameDoc.write(`<html><head><link rel="stylesheet" href="${this.props.stylesheet}"></head><body>${this.props.markup}</body></html>`);
  },

  componentDidMount() {
    this._renderExample();
  },

  componentDidUpdate() {
    if(!this.state.editing) {
      this._renderExample();
    }
  },

  render: function() {
    return (
      <div className="markup">
        {this.state.editing ?
          <textarea
            className="markup__edit"
            defaultValue={this.props.markup}
            onChange={this.handleMarkupEdit}/>
        : <iframe className="markup__frame" ref="example"/>}
        <a onClick={this.handleEditToggle}>
          {this.state.editing ? 'Done' : 'Edit'}
        </a>
      </div>
    );
  }
});

if(Meteor.isClient) {
  FlowRouter.route('/', {
    subscriptions() {
      this.register('styleguides', Meteor.subscribe('styleguides'));
    },

    action() {
      FlowRouter.subsReady('styleguides', () => {
        DocHead.setTitle('Meteor React Boilerplate');
        ReactLayout.render(Layout, {
          content: <Home/>
        });
      });
    }
  });
}

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
  })
}

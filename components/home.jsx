const writeExample = (stylesheet, markup) => {
  let head = `<head><link rel="stylesheet" href="${stylesheet}"></head>`;
  let body = `<body style="display:inline-block;">${markup}</body>`;
  return `<html>${head}${body}</html>`
};

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
                <NewPattern styleguideId={styleguide._id}/>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
});

PatternList = React.createClass({
  propTypes: {
    patterns: React.PropTypes.array,
    stylesheet: React.PropTypes.string
  },

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
  propTypes: {
    patternId: React.PropTypes.string,
    markup: React.PropTypes.string,
    stylesheet: React.PropTypes.string
  },

  getInitialState() {
    return {
      markup: this.props.markup,
      editing: false
    };
  },

  handleEdit() {
    this.setState({editing: true})
  },

  handleUpdateMarkup(event) {
    this.setState({markup: event.target.value})
  },

  handleMarkupEdit(event) {
    Meteor.call('updateMarkup', {
      id: this.props.patternId,
      markup: this.state.markup
    }, (error, success) => {
      if(success) {
        this.setState({editing: false});
        this._renderExample();
      }
    });
  },

  _renderExample() {
    let exampleFrame = this.refs.example;
    let exampleFrameDoc = exampleFrame.contentWindow.document;
    exampleFrameDoc.write(writeExample(this.props.stylesheet, this.state.markup));
  },

  componentDidMount() {
    this._renderExample();
  },

  render: function() {
    return (
      <div className="markup">
        {this.state.editing ?
          <div className="form-group">
            <textarea
              className="editor"
              defaultValue={this.state.markup}
              onChange={this.handleUpdateMarkup}/>
            <button type="submit" onClick={this.handleMarkupEdit}>
              Save
            </button>
          </div>
        :
          <div className="form-group">
            <iframe
              className="markup__frame"
              frameBorder="0"
              scrolling="no"
              ref="example"/>
            <a onClick={this.handleEdit}>Edit</a>
          </div>
        }
      </div>
    );
  }
});

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
    },

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

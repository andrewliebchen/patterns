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

  _writeExample(stylesheet, markup) {
    let head = `<head><link rel="stylesheet" href="${stylesheet}"></head>`;
    let body = `<body style="display:inline-block;">${markup}</body>`;
    return `<html>${head}${body}</html>`
  },

  _renderExample() {
    let exampleFrame = this.refs.example;
    let exampleFrameDoc = exampleFrame.contentWindow.document;
    exampleFrameDoc.write(this._writeExample(this.props.stylesheet, this.state.markup));
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

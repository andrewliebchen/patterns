Example = React.createClass({
  propTypes: {
    markup: React.PropTypes.string,
    stylesheet: React.PropTypes.string,
    script: React.PropTypes.string
  },

  _renderExample() {
    let exampleFrame = this.refs.example;
    let exampleFrameDoc = exampleFrame.contentWindow.document;

    let stylesheet = `<link rel="stylesheet" href="${this.props.stylesheet}" crossorigin="anonymous">`;
    // let script = this.props.script ? `<script src="${this.props.script}" crossorigin="anonymous"></script>` : '';
    let head = `<head>${stylesheet}</head>`;
    let body = `<body style="display:inline-block;">${this.props.markup}</body>`;
    let html = `<html>${head}${body}</html>`;

    exampleFrameDoc.write(html);
  },

  componentDidMount() {
    this._renderExample();
  },

  render() {
    return (
      <iframe
        className="example__frame"
        frameBorder="0"
        scrolling="no"
        ref="example"/>
    );
  }
});

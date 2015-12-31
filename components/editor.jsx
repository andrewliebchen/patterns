Editor = React.createClass({
  propTypes: {
    markup: React.PropTypes.string,
    onChange: React.PropTypes.func,
    onSave: React.PropTypes.func
  },

  render() {
    return (
      <div className="editor form-group">
        <textarea
          className="editor__input"
          defaultValue={this.props.markup}
          onChange={this.props.onChange}/>
        <button type="submit" onClick={this.props.onSave}>
          Save
        </button>
      </div>
    );
  }
});

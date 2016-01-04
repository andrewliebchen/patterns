PatternList = React.createClass({
  propTypes: {
    patterns: React.PropTypes.array,
    stylesheet: React.PropTypes.string,
    script: React.PropTypes.string
  },

  render() {
    return (
      <div className="patterns">
        {this.props.patterns.map((pattern, i) => {
          return (
            <SinglePattern
              key={i}
              pattern={pattern}
              stylesheet={this.props.stylesheet}
              script={this.props.script}/>
          )
        })}
      </div>
    );
  }
});

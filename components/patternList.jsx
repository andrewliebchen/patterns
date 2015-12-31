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

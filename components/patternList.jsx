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
            <div className="pattern section" key={i}>
              <h3>
                <InlineEdit
                  defaultValue={pattern.name}
                  method="updatePatternName"
                  parentId={pattern._id}
                  placeholder="Click to add at title"/>
              </h3>
              <InlineEdit
                defaultValue={pattern.description}
                type="textarea"
                method="updatePatternDescription"
                parentId={pattern._id}
                placeholder="Click to add a description"/>
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

if(Meteor.isServer) {
  Meteor.methods({
    updatePatternName(args) {
      check(args, {
        id: String,
        value: String
      });

      return Patterns.update(args.id, {
        $set: {name: args.value}
      });
    },

    updatePatternDescription(args) {
      check(args, {
        id: String,
        value: String
      });

      return Patterns.update(args.id, {
        $set: {description: args.value}
      });
    }
  });
}

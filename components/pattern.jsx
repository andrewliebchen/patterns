SinglePattern = React.createClass({
  propTypes: {
    pattern: React.PropTypes.object,
    stylesheet: React.PropTypes.string,
    script: React.PropTypes.string
  },

  render() {
    let {pattern, stylesheet, script} = this.props;
    return (
      <div className="pattern section">
        <div className="section__content">
          <header className="section__header">
            <InlineEdit
              defaultValue={pattern.name}
              method="updatePatternName"
              parentId={pattern._id}
              placeholder="Click to add at title"/>
          </header>
          <InlineEdit
            defaultValue={pattern.description}
            type="textarea"
            method="updatePatternDescription"
            parentId={pattern._id}
            placeholder="Click to add a description"/>
          <Example
            markup={pattern.markup}
            stylesheet={stylesheet}
            script={script}/>
          <CommentsList patternId={pattern._id}/>
        </div>
        <div className="section__inspector">
          <Editor
            markup={pattern.markup}
            patternId={pattern._id}/>
        </div>
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

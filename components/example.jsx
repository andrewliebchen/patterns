Example = React.createClass({
  propTypes: {
    patternId: React.PropTypes.string,
    markup: React.PropTypes.string,
    stylesheet: React.PropTypes.string,
    script: React.PropTypes.string
  },

  render: function() {
    return (
      <div className="example">
        <Tabs
        	defaultTabNum={0}
        	tabNames={['Example','Markup', 'Comments']}>
          <section className="tabs__pane">
            <ExampleFrame
              markup={this.props.markup}
              stylesheet={this.props.stylesheet}
              script={this.props.script}/>
          </section>
          <section className="tabs__pane">
            <Editor
              markup={this.props.markup}
              patternId={this.props.patternId}/>
          </section>
          <section className="tabs__pane">
            <CommentsList patternId={this.props.patternId}/>
          </section>
        </Tabs>
      </div>
    );
  }
});

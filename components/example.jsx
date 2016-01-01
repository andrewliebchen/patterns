Example = React.createClass({
  propTypes: {
    patternId: React.PropTypes.string,
    markup: React.PropTypes.string,
    stylesheet: React.PropTypes.string
  },

  render: function() {
    return (
      <div className="example">
        <Tabs
        	defaultTabNum={0}
        	tabNames={['Example','Markup']}>
          <section className="tabs__pane">
            <ExampleView
              markup={this.props.markup}
              stylesheet={this.props.stylesheet}/>
          </section>
          <section className="tabs__pane">
            <Editor
              markup={this.props.markup}
              patternId={this.props.patternId}/>
          </section>
        </Tabs>
      </div>
    );
  }
});

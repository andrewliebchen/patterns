Styleguide = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      styleguide: Styleguides.findOne(),
      patterns: Patterns.find().fetch()
    };
  },

  render() {
    return (
      <div className="container">
        <aside className="sidebar">
          <h2>{this.data.styleguide.name}</h2>
          {/*<NewPattern styleguideId={this.data.styleguide._id}/>*/}
        </aside>
        <div className="main">
          <PatternList
            patterns={this.data.patterns}
            stylesheet={this.data.styleguide.stylesheet}/>
        </div>
      </div>
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
        DocHead.setTitle('Patterns');
        ReactLayout.render(Layout, {
          content: <Styleguide/>
        });
      });
    }
  });
}

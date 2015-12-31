Styleguide = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      styleguides: Styleguides.find().fetch(),
      patterns: Patterns.find().fetch()
    };
  },

  render() {
    return (
      <div className="wrapper">
        <div className="styleguides">
          {this.data.styleguides.map((styleguide, i) => {
            return (
              <div className="styleguide" key={i}>
                <h2>{styleguide.name}</h2>
                <PatternList
                  patterns={this.data.patterns}
                  stylesheet={styleguide.stylesheet}/>
                <NewPattern styleguideId={styleguide._id}/>
              </div>
            );
          })}
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

Alert = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      alert: Session.get('alert')
    };
  },

  componentDidUpdate() {
    if(this.data.alert) {
      setTimeout(() => {
        Session.set('alert', null);
      }, 5000);
    }
  },

  render() {
    if(this.data.alert) {
      return <p className="alert">{this.data.alert}</p>;
    } else {
      return false;
    }
  }
});

Wrapper = React.createClass({
  propTypes: {
    content: React.PropTypes.element.isRequired
  },

  render() {
    return (
      <div className="wrapper">
        <Alert/>
        {/*
        <header className="app-header">
          Patterns
        </header>
        */}
        {this.props.content}
      </div>
    );
  }
});

Container = React.createClass({
  render() {
    return (
      <div className="container">
        {this.props.children}
      </div>
    );
  }
});

Sidebar = React.createClass({
  propTypes: {
    styleguide: React.PropTypes.object,
    patterns: React.PropTypes.array
  },

  render() {
    let {styleguide, patterns} = this.props;
    let slug = styleguide.slug;
    return (
      <aside className="sidebar">
        <a
          href={`/${slug}`}
          className="brand">
          {styleguide.name}
        </a>
        <nav className="nav">
          <a href={`/${slug}`}>About</a>
          <a href={`/${slug}`}>Getting started</a>
        </nav>
        <nav className="nav">
          {patterns.map((pattern, i) => {
            return (
              <a href={`/${slug}#${pattern.slug}`} key={i}>
                {pattern.name}
              </a>
            );
          })}
        </nav>
        <nav className="nav">
          <a href={`/${slug}/settings`}>Settings</a>
          <NewPattern/>
        </nav>
      </aside>
    );
  }
});

Main = React.createClass({
  render() {
    return (
      <div className="main">
        {this.props.children}
      </div>
    );
  }
});

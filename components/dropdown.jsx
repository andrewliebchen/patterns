const CSSTransitionGroup = React.addons.CSSTransitionGroup;

Dropdown = React.createClass({
  propTypes: {
    toggle: React.PropTypes.object,
    className: React.PropTypes.string
  },

  getInitialState() {
    return {
      menu: false,
      clickOnDropdown: false
    };
  },

  handleMouseDown() {
    this.setState({clickOnDropdown: true});
  },

  handleMouseUp() {
    this.setState({clickOnDropdown: false});
  },

  pageClick() {
    this.setState({
      menu: false,
      clickOnDropdown: false
    });
  },

  handleDropdownToggle() {
    this.setState({menu: !this.state.menu});
  },

  componentDidMount() {
    window.addEventListener('mousedown', this.pageClick, false);
  },

  render() {
    let dropdownClassName = classnames({
      'dropdown': true,
      'show-menu': this.state.menu
    });
    return (
      <div className={`${dropdownClassName} ${this.props.className}`}>
        <span onClick={this.handleDropdownToggle}>{this.props.toggle}</span>
        <CSSTransitionGroup transitionName="menu">
          {this.state.menu ?
            <div
              className="menu"
              onMouseDown={this.handleMouseDown}
              omMouseUp={this.handleMouseUp}>
              {this.props.children}
            </div>
          : null}
        </CSSTransitionGroup>
      </div>
    );
  }
});

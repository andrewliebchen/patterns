Block = React.createClass({
  propTypes: {
    className: React.PropTypes.string,
    onClick: React.PropTypes.func,
    selected: React.PropTypes.bool,
    size: React.PropTypes.oneOf(['tiny', 'small', 'medium']),
    badge: React.PropTypes.number
  },

  getDefaultProps() {
    return {
      size: 'medium'
    };
  },

  render() {
    let {className, onClick, badge, selected, size} = this.props;
    let blockClassName = classnames({
      'block': true,
      'is-selected': selected,
      'tiny': size === 'tiny',
      'small': size === 'small',
      'medium': size === 'medium'
    });

    return (
      <div
        className={`${blockClassName} ${className ? className : ''}`}
        onClick={onClick}>
        {this.props.children}
        {badge ? <strong className="block__badge">{badge}</strong> : null}
      </div>
    );
  }
});

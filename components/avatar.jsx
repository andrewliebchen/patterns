Avatar = React.createClass({
  propTypes: {
    user: React.PropTypes.object,
    size: React.PropTypes.oneOf(['small', 'tiny']),
    className: React.PropTypes.string,
    handleClick: React.PropTypes.func,
    label: React.PropTypes.string,
    selected: React.PropTypes.bool
  },

  render() {
    let {size, className, handleClick, user, label, selected} = this.props;
    let avatarSrc = user ? user.profile.avatar_src : null;
    return (
      <Block
        className={`avatar ${className ? className : ''}`}
        selected={selected}
        onClick={handleClick}
        label={label}
        size={size}>
        <div className="avatar__image">
          {avatarSrc ?
            <img src={avatarSrc}/>
          : <Icon type="person"/>}
        </div>
      </Block>
    );
  }
});

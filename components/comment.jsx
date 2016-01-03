SingleComment = React.createClass({
  mixins: [ReactMeteorData],

  propTypes: {
    comment: React.PropTypes.object.isRequired,
    id: React.PropTypes.string,
    currentUser: React.PropTypes.object
  },

  handleCommentDelete() {
    Meteor.call('deleteComment', this.props.id, (err, success) => {
      if(success) {
        Session.set('alert', 'Poof! comment deleted.');
      }
    });
  },

  _isCommentOwner() {
    return this.props.comment.created_by === this.props.currentUser._id;
  },

  render() {
    let {comment} = this.props;
    let {loading, commenter} = this.data;
    let isCommentOwner = this._isCommentOwner();

    if(loading) {
      return <Loading/>;
    }

    return (
      <div className="comment">
        {/*<Avatar user={commenter} size="small"/>*/}
        <div className="comment__body">
          <header className="comment__header">
            <h4 className="comment__name">{commenter.profile.name}</h4>
            <div className="comment__meta">
              <small className="comment__meta__item">
                {moment(comment.created_at).fromNow()}
              </small>
              <Dropdown
                toggle={<Block size="tiny"><Icon type="settings" size={1}/></Block>}
                className="comment__meta__item">
                <span>
                  <div className="menu__item" onClick={this.handleCommentDelete}>
                    <Icon type="trash" size={1.5}/>Delete
                  </div>
                </span>
              </Dropdown>
            </div>
          </header>
          <div className="comment__content">
            <Markdown>{comment.comment}</Markdown>
          </div>
        </div>
      </div>
    );
  }
});

if(Meteor.isServer) {
  Meteor.methods({
    deleteComment(id) {
      check(id, String);
      return Comments.remove(id);
    }
  });
}

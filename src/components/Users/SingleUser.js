import React from 'react';
import UserProvideComp from './UserProvideComp';
import './Users.css';

class SingleUser extends React.Component {

  state = {
    user: {},
    rare_user: {},
    subscription: []
  }

  componentDidMount() {
    const { userId } = this.props.match.params;
    const authorId = parseInt(userId);
    const followerId = parseInt(localStorage.getItem("rare_user_id"));
    
    UserProvideComp.getUserById(userId)
      .then((response) => this.setState({
        user: response,
        rare_user: response.user,
      }))
    
    UserProvideComp.getSingleSub(authorId, followerId)
      .then((response) => {
        this.setState({ subscription: response })
      })
  }

  subscribeEvent = () => {
    const { subscription } = this.state;

    if (subscription.created_on > subscription.ended_on) {
      console.log('Update subscription!')
    } else if (subscription.length < 1) {
      console.log('Create subscription!')
    }
  }

  render() {
    const { user, rare_user, subscription } = this.state;
    return (
      <div className="container">
        <img alt="no-img" src="https://fishingbakersfield.com/icons/user.svg" className="user_image"/>
        <div className="content">
          <h2 className="content btn-info">{rare_user.first_name} {rare_user.last_name}</h2>
          <h2 className="content btn-info">{user.display_name}</h2>
          <h2 className="content btn-info">{rare_user.email}</h2>
          <h2 className="content btn-info">{rare_user.date_joined}</h2>
          <h2 className="content btn-info">Is staff {rare_user.is_staff}</h2>
        </div>
        <button className="subscribe-button" onClick={this.subscribeEvent}>
          {subscription.created_on > subscription.ended_on || subscription.length >= 1 ? 'Unsubscribe' : 'Subscribe'}
        </button>
      </div>
    );
  }
}

export default SingleUser;

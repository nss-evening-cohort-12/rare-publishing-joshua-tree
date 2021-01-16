import React from 'react';
import moment from 'moment';
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
    
    UserProvideComp.getUserById(userId)
      .then((response) => this.setState({
        user: response,
        rare_user: response.user,
      }))
    
    this.getSubscription();
  }

  getSubscription = () => {
    const authorId = parseInt(this.props.match.params.userId);
    const followerId = parseInt(localStorage.getItem("rare_user_id"));

    UserProvideComp.getSingleSub(authorId, followerId)
    .then((response) => {
      this.setState({ subscription: response })
    })
  }

  subscribeEvent = () => {
    const { subscription } = this.state;
    
    const subscriptionObj = {
      follower_id: parseInt(localStorage.getItem("rare_user_id")),
      author_id: parseInt(this.props.match.params.userId)
    }

    if (subscription.length < 1) {
      subscriptionObj['ended_on'] = null;
      UserProvideComp.createSubscription(subscriptionObj)
        .then(() => this.getSubscription())
    }
    
    else if (moment(subscription[0].created_on).valueOf() > moment(subscription[0].ended_on).valueOf() || subscription[0].ended_on === null) {
      subscriptionObj['created_on'] = subscription[0].created_on;
      subscriptionObj['ended_on'] = null;
      subscriptionObj['id'] = subscription[0].id;
      UserProvideComp.updateSubStatus(subscriptionObj)
        .then(() => this.getSubscription())
    }
    
    else if (moment(subscription[0].created_on).valueOf() < moment(subscription[0].ended_on).valueOf()) {
      subscriptionObj['ended_on'] = subscription[0].ended_on;
      subscriptionObj['created_on'] = null;
      subscriptionObj['id'] = subscription[0].id;
      UserProvideComp.updateSubStatus(subscriptionObj)
        .then(() => this.getSubscription())
    }
  }

  render() {
    const { user, rare_user, subscription } = this.state;
    const subscriptionStatus = () => {
      if (subscription.length < 1) {
        return 'Subscribe';
      } else if (moment(subscription[0].created_on).valueOf() > moment(subscription[0].ended_on).valueOf() || subscription[0].ended_on === null) {
          return 'Unsubscribe';
      } else {
          return 'Subscribe';
      }
    }

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
          {subscriptionStatus()}
        </button>
      </div>
    );
  }
}

export default SingleUser;

import React from 'react';
import UserProvideComp from './UserProvideComp';
import './Users.css';

class SingleUser extends React.Component {

  state = {
    user: {},
    rare_user: {}
  }

  componentDidMount() {
    const { userId } = this.props.match.params;
    
    UserProvideComp.getUserById(userId)
      .then((response) => this.setState({
        user: response,
        rare_user :response.user,

      }))

  }  

  render() {
    const { user, rare_user } = this.state;
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
      </div>
    );
  }
}

export default SingleUser;

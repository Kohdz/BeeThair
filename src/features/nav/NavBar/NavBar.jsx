import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase';
import { Menu, Container, Button } from 'semantic-ui-react';
import { NavLink, withRouter } from 'react-router-dom';
import SignedOutMenu from '../Menus/SignedOutMenu';
import SignedInMenu from '../Menus/SignedInMenu';
import { openModal } from '../../modals/modalActions';

const mapState = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile
});

const actions = {
  openModal
};

class NavBar extends Component {
  handleSignIn = () => {
    this.props.openModal('LoginModal');
  };

  handleRegister = () => {
    this.props.openModal('RegisterModal');
  };

  handleSignOut = () => {
    this.props.firebase.logout();
    this.props.history.push('/');
  };
  Username;
  render() {
    const { auth, profile } = this.props;
    const authenticated = auth.isLoaded && !auth.isEmpty;
    console.log(profile);
    console.log(profile.displayName);
    // console.log(auth.currentUser);
    return (
      <Menu inverted fixed='top'>
        <Container>
          <Menu.Item as={NavLink} exact to='/' header>
            <img src='assets/logo.png' alt='logo' />
            Bee•There
          </Menu.Item>
          <Menu.Item as={NavLink} exact to='/events' name='Events' />
          {authenticated && (
            <Fragment>
              <Menu.Item as={NavLink} to='/people' name='People' />
              <Menu.Item as={NavLink} to='/test' name='Tests' />
              <Menu.Item>
                <Button
                  as={NavLink}
                  to='createEvent'
                  floated='right'
                  positive
                  inverted
                  content='Create Event'
                />
              </Menu.Item>
            </Fragment>
          )}
          {authenticated ? (
            <SignedInMenu signOut={this.handleSignOut} profile={profile} />
          ) : (
            <SignedOutMenu
              signIn={this.handleSignIn}
              register={this.handleRegister}
            />
          )}
        </Container>
      </Menu>
    );
  }
}

export default withRouter(withFirebase(connect(mapState, actions)(NavBar)));

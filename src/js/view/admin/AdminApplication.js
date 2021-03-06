import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import Courses from 'material-ui/svg-icons/communication/import-contacts';
import Tutors from 'material-ui/svg-icons/social/people';
import Settings from 'material-ui/svg-icons/action/settings';
import About from 'material-ui/svg-icons/editor/short-text';
import { Link } from 'react-router';
import AdminDialogWrapper from './AdminDialogView';

import injectTapEventPlugin from 'react-tap-event-plugin';

try {
  injectTapEventPlugin();
} catch (err) {
  console.log(err);
}


const style = {
  margin: 12,
  color: '#8AA62F',
};


const AdminApplication = props => {
  const { pathname } = props.location;
  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <MuiThemeProvider>
            <div>
              <AdminDialogWrapper />
              <div>
                <RaisedButton
                  label={pathname.indexOf('course') >= 0 ? '> Courses <' : 'Courses'}
                  primary
                  icon={<Courses />}
                  style={style}
                  containerElement={<Link to={'/admin/course/'} />}
                />
                <RaisedButton
                  label={pathname.indexOf('about') >= 0 ? '> About <' : 'About'}
                  icon={<About />}
                  style={style}
                  backgroundColor="#197e50"
                  labelColor="#ffffff"
                  containerElement={<Link to={'/admin/about/'} />}
                />
                <RaisedButton
                  label="Tutors"
                  primary
                  icon={<Tutors />}
                  style={style}
                  disabled
                />
                <RaisedButton
                  label={pathname.indexOf('settings') >= 0 ? '> Settings <' : 'Settings'}
                  icon={<Settings />}
                  style={style}
                  backgroundColor="#1A237E"
                  labelColor="#ffffff"
                  containerElement={<Link to={'/admin/settings/'} />}
                />
              </div>
              <div>
                <Divider />
              </div>
            </div>
          </MuiThemeProvider>
        </div>
        <div className="row">
          {props.children || null}
        </div>
      </div>
    </div>);
};

AdminApplication.propTypes = {
  children: React.PropTypes.object,
  location: React.PropTypes.object.isRequired,
};

export default AdminApplication;

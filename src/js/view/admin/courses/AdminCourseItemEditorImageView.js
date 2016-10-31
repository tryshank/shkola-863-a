import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { store } from '../../../redux/Redux';
import * as ActionCreators from '../../../redux/actions/ActionCreators';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SelectField from 'material-ui/SelectField';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';

class AdminCourseItemEditorImageView extends Component {

  constructor(props) {
    super(props);
    const { activeCourseId, activeCourseImage, imagesFiles } = props;
    this.state = {
      activeCourseId,
      activeCourseImage,
      imagesFiles,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { activeCourseId, activeCourseImage, imagesFiles } = nextProps;
    this.state = {
      activeCourseId,
      activeCourseImage,
      imagesFiles,
    };
  }

  handleImageFileNameChanged = (event, index, filename) => {
    store.dispatch({ type: 'ACTION_IMAGE_CHANGE', payload: { filename } });
  };

  openFileDialog = () => {
    /*
     TODO: check this is best solution
     https://github.com/callemall/material-ui/issues/647
     */
    const fileUploadDom = ReactDOM.findDOMNode(this.refs.fileUpload);
    fileUploadDom.click();
  };

  uploadFileNameChange = (e) => {
    e.preventDefault();
    this.props.actions.imageUpload(e.target.files[0]);
  };

  render() {
    return (
      <MuiThemeProvider>
        <div className="row">
          <div className="col-sm-12 col-md-8">
            <div>
              <SelectField
                value={this.state.activeCourseId ? this.state.activeCourseImage : ''}
                onChange={this.handleImageFileNameChanged}
                maxHeight={200}
                floatingLabelText="Image file name"
                floatingLabelFixed
                fullWidth
              >
                {
                  this.state.imagesFiles.length ?
                    this.state.imagesFiles.map(item =>
                      <MenuItem
                        value={item}
                        key={item}
                        primaryText={item}
                      />)
                    : null
                }
              </SelectField>
            </div>
            <div>
              <FlatButton
                label="Upload image"
                onClick={this.openFileDialog}
                primary
              />
              <input
                ref="fileUpload"
                type="file"
                style={{ display: 'none' }}
                onChange={this.uploadFileNameChange}
              />
            </div>
          </div>
          <div className="col-sm-12 col-md-4">
            {this.state.activeCourseId && this.state.activeCourseImage ?
              <img
                src={this.state.activeCourseImage ?
                    `/image/${this.state.activeCourseImage}` : ''}
                style={{ height: '100px', display: 'inline-block',
                 float: 'none', overflow: 'hide',
                 position: 'relative', left: '-20px', top: '5px' }}
                alt="preview"
              /> : null
            }
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

AdminCourseItemEditorImageView.propTypes = {
  actions: React.PropTypes.shape({
    imageUpload: React.PropTypes.func.isRequired,
  }),
  activeCourseId: React.PropTypes.string,
  activeCourseImage: React.PropTypes.string,
  imagesFiles: React.PropTypes.array,
};

const mapStateToProps = (state, ownProps) => {
  const activeCourseId = ownProps.activeCourseId || state.activeCourseId;
  const activeCourseImage = state.activeCourseImage || ownProps.activeCourseImage;
  const newData = {
    activeCourseId,
    activeCourseImage,
    imagesFiles: state.imagesFiles,
  };
  return (newData);
};

const mapDispatchToProps = (dispatch) =>
  ({
    actions: {
      imageUpload: bindActionCreators(ActionCreators.imageUploadAction, dispatch),
    },
  });

const AdminCourseItemEditorImageWrapper =
  connect(mapStateToProps, mapDispatchToProps)(AdminCourseItemEditorImageView);

export default AdminCourseItemEditorImageWrapper;

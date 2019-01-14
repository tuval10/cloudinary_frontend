import React from "react"
import PropTypes from "prop-types"
import SubtitleLine from './SubtitleLine'
import axios from 'axios'

class SubtitleForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cloud_name: props.form.cloud_name,
      video_public_id: props.form.video_public_id,
      subtitles: [],
      results: '',
      loading: false,
      error: null
    };
    this.handleCloudNameChange = this.handleCloudNameChange.bind(this);
    this.handleVideoPublicIdChange = this.handleVideoPublicIdChange.bind(this);
    this.handleRemoveSubtitleLine = this.handleRemoveSubtitleLine.bind(this);
    this.handleAddSubtitleLine = this.handleAddSubtitleLine.bind(this);
    this.handleSubtitleLineChange = this.handleSubtitleLineChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleSubmitSuccess = this.handleSubmitSuccess.bind(this);
  }

  onSubmit(e){
    let removeKey = (subtitle) => {
      const { key, ...rest } = subtitle;
      return rest;
    };
    this.setState({ loading: true, results: "", error: null });
    axios({
      method: 'PATCH',
      url: '/subtitle_form',
      data: {subtitle_form: {
        cloud_name: this.state.cloud_name,
        video_public_id: this.state.video_public_id,
        subtitle_lines: this.state.subtitles.map(removeKey)
      }},
      headers: {
        'X-CSRF-Token': document.querySelector("meta[name=csrf-token]").content
      }
    })
      .then(this.handleSubmitSuccess)
      .catch(this.handleSubmitFailure)
  }

  handleSubmitSuccess({data: {status, message}}){
    this.setState({ loading: false, results: message});
  }

  handleSubmitFailure({data: {status, message}}){
    this.setState({ loading: false, error: message});
  }

  handleCloudNameChange(e) {
    this.setState({ cloud_name: e.target.value, error: null });
  }


  handleVideoPublicIdChange(e) {
    this.setState({ video_public_id: e.target.value, error: null });
  }

  getSubtitleLineIndex(key){
    return this.state.subtitles.findIndex(sub => sub.key === key);
  }

  handleRemoveSubtitleLine(key) {
    let newSubtitles = this.state.subtitles.filter(sub => sub.key !== key);
    this.setState({
      subtitles: newSubtitles,
      error: null
    });
  }

  handleSubtitleLineChange(e, key, changedProperty){
    let index = this.getSubtitleLineIndex(key);
    let updatedSubtitles = [...this.state.subtitles];
    updatedSubtitles[index][changedProperty] = e.target.value;
    this.setState({
      subtitles: updatedSubtitles,
      error: null
    });
  }


  handleAddSubtitleLine(e){
    this.setState({
      subtitles: [...this.state.subtitles, {start: "00:00.0", end: "00:00.0", text: '', key: Date.now()}],
      error: null
    });
  }


  render() {
    let subtitle_lines = this.state.subtitles.map((sub, index) =>
      <SubtitleLine
        key={sub.key}
        identifier={sub.key}
        {...sub}
        handleRemoveSubtitleLine={this.handleRemoveSubtitleLine}
        handleSubtitleLineChange={this.handleSubtitleLineChange}
      />
    );
    return (
      <div className="subtitle_form">
        <div className={this.state.error ? 'error' : 'error-hidden'}>
          {this.state.error}
        </div>
        <div className={this.state.loading ? 'loading' : 'loading-hidden'} >
          loading...
        </div>
        <div className="cloud-name-container">
        <label>Cloud Name</label>
        <input
          type="text"
          name="subtitle_form[cloud_name]"
          value={this.state.cloud_name}
          onChange={this.handleCloudNameChange}
        />
        </div>

        <label>Video Public Id</label>
        <input
          type="text"
          name="subtitle_form[video_public_id]"
          value={this.state.video_public_id}
          onChange={this.handleVideoPublicIdChange}
        />

        <div className="subtitles-container">
          {subtitle_lines}
        </div>
        <button type="button" onClick={this.handleAddSubtitleLine}>add line</button>

        <label>Results</label>
        <div id="results">{this.state.results}</div>

        <button type="button" onClick={this.onSubmit}>update</button>
      </div>
    );
  }
}

SubtitleForm.propTypes = {
  form: PropTypes.shape({
    cloud_name: PropTypes.string,
    video_public_id: PropTypes.string
  })
};
export default SubtitleForm

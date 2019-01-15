import React from "react"
import PropTypes from "prop-types"
class SubtitleLine extends React.PureComponent {
  render() {
    return (
      <div className="subtitle_line form-group row">
        <div className="col-sm-7">
          <input
            className="form-control"
            type="text"
            name="subtitle_form[subtitle_lines][]subtitle_line[text]"
            value={this.props.text}
            onChange={(e) => this.props.handleSubtitleLineChange(e, this.props.identifier, 'text')}
          />
        </div>

        <div className="col-sm-2">
          <input
            className="form-control"
            type="text"
            name="subtitle_form[subtitle_lines][]subtitle_line[start]"
            value={this.props.start}
            onChange={(e) => this.props.handleSubtitleLineChange(e, this.props.identifier, 'start')}
          />
        </div>

        <div className="col-sm-2">
          <input
            className="form-control"
            type="text"
            name="subtitle_form[subtitle_lines][]subtitle_line[end]"
            placeholder="00:00"
            value={this.props.end}
            onChange={(e) => this.props.handleSubtitleLineChange(e, this.props.identifier, 'end')}
          />
        </div>

        <div className="col-sm-1">
          <button className="btn btn-danger" type="button" onClick={() => this.props.handleRemoveSubtitleLine(this.props.identifier)}>X</button>
        </div>
      </div>
    );
  }
}

SubtitleLine.propTypes = {
  text: PropTypes.string,
  start: PropTypes.string,
  end: PropTypes.string,
  identifier: PropTypes.number,
  handleRemoveSubtitleLine: PropTypes.func,
  handleSubtitleLineChange: PropTypes.func
};

export default SubtitleLine

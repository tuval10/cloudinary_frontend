import React from "react"
import PropTypes from "prop-types"
class SubtitleLine extends React.PureComponent {
  render() {
    return (
      <div className="subtitle_line">
        <input
          type="text"
          name="subtitle_form[subtitle_lines][]subtitle_line[text]"
          value={this.props.text}
          onChange={(e) => this.props.handleSubtitleLineChange(e, this.props.identifier, 'text')}
        />

        <input
          type="text"
          name="subtitle_form[subtitle_lines][]subtitle_line[start]"
          value={this.props.start}
          onChange={(e) => this.props.handleSubtitleLineChange(e, this.props.identifier, 'start')}
        />

        <input
          type="text"
          name="subtitle_form[subtitle_lines][]subtitle_line[end]"
          placeholder="00:00"
          value={this.props.end}
          onChange={(e) => this.props.handleSubtitleLineChange(e, this.props.identifier, 'end')}
        />

        <button type="button" onClick={() => this.props.handleRemoveSubtitleLine(this.props.identifier)}>X</button>
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

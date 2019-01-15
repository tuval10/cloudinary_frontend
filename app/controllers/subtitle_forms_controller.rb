require 'cloudinary_subtitles_embedder'
class SubtitleFormsController < ApplicationController
  def index
    @subtitle_form = SubtitleForm.instance
  end

  def update
    @subtitle_form = SubtitleForm.instance
    @subtitle_form.update_attributes(update_params)
    subtitles = @subtitle_form.subtitle_lines.map(&:to_obj)
    message = CloudinarySubtitlesEmbedder.add_subtitles_to_video(
      @subtitle_form.video_public_id,
      {"subtitles" => subtitles},
      @subtitle_form.cloud_name
    )
    render json: { status: 'success', message: message}
  end

  def update_params
    params.require(:subtitle_form).permit(
      :video_public_id,
      :cloud_name,
      subtitle_lines: [
        :text, :start, :end
      ]
    )
  end
end

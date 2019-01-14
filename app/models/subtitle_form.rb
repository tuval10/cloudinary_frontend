require 'singleton'

class SubtitleForm < ClassWithValidation
  include Singleton

  attr_accessor :subtitle_lines, :cloud_name, :video_public_id
  def initialize
    self.subtitle_lines = []
    self.cloud_name = 'candidate-evaluation'
    self.video_public_id = 'The_Present.mp4'
  end

  def add_subtitle_line
    subtitle_lines << SubtitleLine.new(self)
  end

  def destroy_subtitle(subtitle)
    subtitle_lines.delete(subtitle)
  end

  def update_attributes(options)
    self.cloud_name = options[:cloud_name]
    self.video_public_id = options[:video_public_id]
    self.subtitle_lines = options[:subtitle_lines].map do |sub_opt|
      SubtitleLine.new(sub_opt, self)
    end
  end
end
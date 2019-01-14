class SubtitleLine < ClassWithValidation
  attr_accessor :start, :end, :text, :parent

  def initialize(options, parent)
    self.start = options[:start]
    self.end = options[:end]
    self.text = options[:text]
    self.parent = parent
  end

  def to_obj
    {
      'start-timing': start.to_s,
      'end-timing': self.end.to_s,
      'text': text
    }.stringify_keys
  end
end
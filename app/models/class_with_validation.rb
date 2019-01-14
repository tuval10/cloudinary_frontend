class ClassWithValidation

  attr_accessor :errors

  # Create an Errors object, which is required by validations and to use some view methods.
  def initialize(opts = {})
    @errors = []
  end

  extend ActiveModel::Naming
  include ActiveModel::Conversion
  def persisted?
    false
  end
end
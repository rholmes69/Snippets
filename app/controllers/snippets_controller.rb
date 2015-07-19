class SnippetsController < ApplicationController
  def index
  	@snippet = Snippet.all
  end
end

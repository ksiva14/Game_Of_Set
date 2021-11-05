require 'watir'
#setting site variable to index file
site = "file:///home/justin/PG3901-Project5_JavaScriptGameOfSet/index.html"
#choosing firefox for browser
browser = Watir::Browser.new:firefox
#opening site
browser.goto site
#press enter to get past window alert
browser.send_keys :enter
puts “open_index executes”
#close firefox
browser.close
require 'watir'
#setting site variable to index file
site = "file:///home/justin/PG3901-Project5_JavaScriptGameOfSet/index.html"
#choosing firefox for browser
browser = Watir::Browser.new:firefox
#opening site
browser.goto site
#press enter to get past window alert
browser.send_keys :enter
#check if the browser includes Hint 1, click if so, print if not
if browser.text.include? "Hint 1"
    browser.link(:class, "hints").click
else 
    puts "no button found"
end
puts "Test hint1 executed"

#close firefox
browser.close
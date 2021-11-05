require 'watir'
#setting site variable to index file
site = "file:///home/justin/PG3901-Project5_JavaScriptGameOfSet/index.html"
#choosing firefox for browser
browser = Watir::Browser.new:firefox
#opening site
browser.goto site
#press enter to get past window alert
browser.send_keys :enter

#click cards 1 2 and 3
browser.img(:id, 1).click
browser.img(:id, 2).click
browser.img(:id, 3).click
if browser.text.include? "Set is Found!"
    puts "set is found"
elsif "Not a set!"
    puts "no set here"
end

puts "Test no_set executed"

#close firefox
browser.close
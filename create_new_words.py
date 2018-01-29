import requests as rq
import win_unicode_console
win_unicode_console.enable()

# content = rq.get("www.ldoceonline.com/dictionary/dog")
new_words = []
vietnameses = []
with open("./tumoiunit5.txt", "r") as file:
    for line in file:
        new_word, vietnamese = line.split(":")[0], line.split(":")[1]
        new_words.append(new_word)
        vietnameses.append(vietnamese)
with open("./new_words.txt", "w") as file:
    for word in new_words:
        # print(word)
        file.write(word)
        file.write("\n")
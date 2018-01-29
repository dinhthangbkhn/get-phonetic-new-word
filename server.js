var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();


url = 'https://en.oxforddictionaries.com/definition/effort';
read_new_words_file = () => {
    return new Promise((resolve) => {
        fs.readFile("./new_words.txt", 'utf8', (err, data) => {
            resolve(data)
        })
    })

}

get_new_words_url = async () => {
    var data = await read_new_words_file()
    data = data.split("\r\n")
    for (i = 0; i < data.length; i++) {
        if (data[i] != '' && data[i] != null) {
            data[i] = 'https://en.oxforddictionaries.com/definition/' + data[i]
        }
    }
    return data
}

req_one_phonetic = (url) => {
    return new Promise((resolve) => {
        request(url, function (error, response, html) {
            if (!error) {
                var $ = cheerio.load(html);
                var object = {}
                object["phonetic"] = $('.phoneticspelling').text()
                object["word"] = $('.hw').text()
                resolve(object)
            }
        })
    })
}
request_phonetic = async (url) => {
    objects = []
    for (i = 0; i < url.length; i++) {
        object = await req_one_phonetic(url[i])
        objects.push(object)
        if (i > 2) 
            break
    }
    return objects
}
get_phonetic = async () => {
    url = await get_new_words_url()
    objects = []
    for (i = 0; i < url.length; i++) {
        request(url[i], function (error, response, html) {
            if (!error) {
                var $ = cheerio.load(html);
                var object = {}
                object["phonetic"] = $('.phoneticspelling').text()
                object["word"] = $('.hw').text()
                console.log(object.word + '\t\t' + object.phonetic)
            }
        })
    }
}
get_phonetic()

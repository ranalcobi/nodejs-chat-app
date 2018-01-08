var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message')

describe('generateMessage', () => {

    it('should generate correct message object', () => {
        var from = "ran";
        var text = 'Some Message';
        var message = generateMessage(from, text);

        expect(typeof message.createdAt).toBe("number");
        expect(message).toMatchObject({from,text})


    })

})

describe('generateLocationMessage', () => {

    it('should generate correct location object', () => {
        var from = "ran";
        var lat = 1;
        var long = 1;
        var url = 'https://www.google.com/maps?q=1,1';
        var message = generateLocationMessage(from, lat, long);

        expect(typeof message.createdAt).toBe("number");
        expect(message.url).toBe(url);
        expect(message).toMatchObject({from,url})


    })

})
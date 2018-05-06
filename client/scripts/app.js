// YOUR CODE HERE:

var notYourData = []
// console.log(notYourData)
var app = {
  init: function() {
    
  },
  server: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
  send: function(message) {
    console.log(JSON.stringify(message))
    $.ajax({
      url: this.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function(data) {
        app.renderMessage(data);
      }
    })
  },
  fetch: function(data) {
    $.ajax({
      url: this.server,
      data: {order: '-createdAt'},
      type: 'GET',
      // dataType: 'text',
      success: function(data) {
        console.log(data)
        // app.renderMessage((JSON.stringify(data)))
      }
    })
  },
  fetchMessage: function(data) {
    $.ajax({
      url: this.server,
      data: {order: '-createdAt'},
      type: 'GET',
      success: function(data) {
        // var results = "\"results\""
        // var parsedData = JSON.parse(data);
        // console.log(parsedData);
        // data[results].forEach(message => console.log(message));
        // app.getRoomName(JSON.stringify(data))
        // var results = JSON.parse(data)
        // notYourData.push(results)
        for (var i = 0; i < data.results.length; i++) {
          app.renderMessage(data.results[i]);
        }
      }
    })  
  },
  escapedText: function(input) {
    return input.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  },
  fetchRoom: function(data) {
    $.ajax({
      url: this.server,
      data: {order: '-createdAt'},
      type: 'GET',
      success: function(data) {
        // var results = "\"results\""
        // var parsedData = JSON.parse(data);
        // console.log(parsedData);
        for (var i = 0; i < data.results.length; i++) {
          // app.renderRoom(data.results[i]);
          // app.getRoomName(data.results[i]);
          notYourData.push(data.results[i].roomname)
        }
        app.renderRoom()
        // data[results].forEach(message => console.log(message));
        // app.getRoomName(JSON.stringify(data))
        // var results = JSON.parse(data)
        // notYourData.push(results)
      }
    })  
  },
  clearMessages: function() {
    $('#chats').children().remove();
  },
  renderMessage: function(message) {
    // var newMessage = JSON.parse(message);
    
    // message.username = window.location.search.slice(window.location.search.indexOf('=') + 1, window.location.search.length)
    var escapedUsername = app.escapedText(message.username + '')
    var escapedMessage = app.escapedText(message.text + '')
    $('#chats').append(`<div><span onclick ="app.handleUsernameClick()" class="username">${escapedUsername}</span>: ${escapedMessage}</div>`);
  },
  renderRoom: function(roomname) {
    var uniqueData = _.uniq(notYourData)
    uniqueData.forEach(item => $('#roomSelect').append(`<option>${item}</option>`));
  },
  handleUsernameClick: function() {
    // this.friends.push(users)
  },
  handleSubmit: function() {
    var msg = 
    console.log(msg)
    var messageObject = {
      username: window.location.search.slice(window.location.search.indexOf('=') + 1, window.location.search.length),
      text: $('#message').val(),
      roomname: $('#roomSelect').val()
    };
    // messageObject.username = window.location.search.slice(window.location.search.indexOf('=') + 1, window.location.search.length)
    // messageObject.message = JSON.stringify($('#message').val());
    // messageObject.roomname = JSON.stringify($('#roomSelect').val());
    // console.log('This is the messageObject:', messageObject)
    app.send(messageObject);
    app.renderMessage(messageObject);
    $('#message').val('Write your message here')
  }
  // getRoomName: function(message) { 
  //   // console.log('message', message)
  //   // var parsedMessage = JSON.parse(message);
  //   // console.log(parsedMessage);
  //   // console.log('parsedMessge', parsedMessage)
  //   // // results.forEach(item => console.log(item))
  //   // // for (var i = 0; i < results.length)
  //   var roomName = message.roomname
  //   notYourData.push(roomName)
  //   // console.log(roomName)
  //   // this.renderRoom(message.roomname);
  // }
};




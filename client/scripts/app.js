// YOUR CODE HERE:

var notYourData = []
console.log(notYourData)
var app = {
  init: function() {
    
  },
  server: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
  send: function(message) {
    console.log(JSON.stringify(message))
    $.ajax({
      url: this.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json'
    })
  },
  fetch: function(data) {
    $.ajax({
      url: this.server,
      type: 'GET',
      dataType: 'text',
      success: function(data) {
        console.log(JSON.stringify(data))
        // app.renderMessage((JSON.stringify(data)))
      }
    })
  },
  fetchRoom: function(data) {
    $.ajax({
      url: this.server,
      type: 'GET',
      dataType: 'text',
      success: function(data) {
        // var results = "\"results\""
        // data[results].forEach(message => console.log(message));
        // app.getRoomName(JSON.stringify(data))
        notYourData.push(data)
      }
    })  
  },
  clearMessages: function() {
    $('#chats').children().remove()
  },
  renderMessage: function(message) {
    var newMessage = JSON.parse(message);
    $('#chats').append(`<div><span onclick ="app.handleUsernameClick()" class="username">${newMessage.username}</span>: ${newMessage.text}</div>`);
  },
  renderRoom: function(roomname) {
    $('#main').find('#roomSelect').append(`<option>${roomname}</option>`);
  },
  handleUsernameClick: function() {
    // this.friends.push(users)
  },
  handleSubmit: function() {
    var messageObject = {};
    messageObject.username = window.location.search.slice(window.location.search.indexOf('=') + 1, window.location.search.length)
    messageObject.message = JSON.stringify($('#message').val());
    messageObject.roomname = JSON.stringify($('#roomSelect').val());
    console.log('This is the messageObject:', messageObject)
    //app.send(messageObject);
  },
  // getRoomName: function(message) { 
  //   // console.log('message', message)
  //   var parsedMessage = JSON.parse(message);
  //   console.log(parsedMessage)
  //   // console.log('parsedMessge', parsedMessage)
  //   // // results.forEach(item => console.log(item))
  //   // // for (var i = 0; i < results.length)
    
  //   // this.renderRoom(message.roomname);
  // }
};




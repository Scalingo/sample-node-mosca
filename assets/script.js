var socket = new WebSocket("ws://" + location.host );
socket.onopen = function() {
  console.log("Websocket opened")
}

socket.onmessage = function (doc) {
  var value = JSON.parse(doc.data)

  var dest = document.getElementById("messages")
  dest.insertAdjacentHTML('afterbegin', '<li class="collection-item"><p><span class="strong">Topic: '+value.topic+'</span><br/><span>Value: '+value.value+'</span></p></li>')
}

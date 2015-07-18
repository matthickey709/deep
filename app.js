function add_message(){
    var div_outer = document.createElement("div");
    var div_inner = document.createElement("div");
    div_inner.className = "bubble right";
    div_outer.appendChild(div_inner);

    var username  = document.createElement("h4");
    var usernameText   = document.createTextNode("Bob");
    username.appendChild(usernameText);
    div_inner.appendChild(username);

    var messageText = document.getElementsByName("message")[0].value;

    var message = document.createElement("div");
    var messageNode = document.createTextNode(messageText);
    message.appendChild(messageNode);
    div_inner.appendChild(message);

    var bubbles = document.getElementsByClassName("bubble");

    var oneBubble = bubbles[0];

    var parent = oneBubble.parentNode.parentNode;

    var messageBox = document.getElementsByName("message")[0].parentNode.parentNode.parentNode;

    //parent.appendChild(div_outer);
    parent.insertBefore(div_outer, messageBox);
    
}

window.onload = function(){
    document.getElementsByTagName('button')[0].onclick = add_message;
}

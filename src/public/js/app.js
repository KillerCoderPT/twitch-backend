const chatbox = document.querySelector(".chatbox-body");

const socket = io();

socket.on("connect", (sck) => {
  console.log(socket.id);
});

socket.on("sendMessage", (data) => {
  console.log(data);
  appendText(data);
});

function appendText(txtObj) {
  const wrapper = document.createElement("p");
  const spanBadges = document.createElement("span");
  const badge = document.createElement("img");
  badge.setAttribute("width", "18");
  badge.setAttribute("alt", "badge");

  const spanUser = document.createElement("span");
  spanUser.appendChild(document.createTextNode(`${txtObj.username}: `));

  const spanMessage = document.createElement("span");
  spanMessage.appendChild(document.createTextNode(`${txtObj.message}`));

  // Verify the user badges
  if (txtObj.badges !== null) {
    for (var x in txtObj.badges) {
      if (txtObj.badges.hasOwnProperty(x)) {
        badge.setAttribute("src", `/img/badges/users/${x}.png`);
        spanBadges.appendChild(badge);
      }
    }
    // txtObj.badges.map((item) => {
    //   badge.setAttribute("src", `/img/users/${item}.png`);
    //   spanBadges.appendChild(badge);
    // });
  }

  wrapper.appendChild(spanBadges);
  wrapper.appendChild(spanUser);
  wrapper.appendChild(spanMessage);

  chatbox.appendChild(wrapper);
}

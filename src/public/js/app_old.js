const chatbox = document.querySelector(".chatbox-body");

const socket = io();

socket.on("connect", (sck) => {
  console.log(socket.id);
});

socket.on("sendMessage", (data) => {
  // console.log(data);
  appendText(data);
});

function appendText(txtObj) {
  const wrapper = document.createElement("p");

  const spanEmotes = document.createElement("span");
  const emote = document.createElement("img");
  emote.setAttribute("art", "emote");

  const spanBadges = document.createElement("span");
  const badge = document.createElement("img");
  badge.setAttribute("width", "18");
  badge.setAttribute("alt", "badge");

  const spanUser = document.createElement("span");
  spanUser.appendChild(document.createTextNode(`${txtObj.username}: `));

  const spanMessage = document.createElement("span");

  // Verify the user badges
  if (txtObj.badges !== null) {
    for (var x in txtObj.badges) {
      if (txtObj.badges.hasOwnProperty(x)) {
        badge.setAttribute("src", `/img/badges/users/${x}.png`);
        spanBadges.appendChild(badge);
      }
    }
  }

  // Verify the emotes
  if (txtObj.emotes !== null) {
    for (var x in txtObj.emotes) {
      if (txtObj.emotes.hasOwnProperty(x)) {
        console.log(x);
        emote.setAttribute(
          "src",
          `https://static-cdn.jtvnw.net/emoticons/v1/${x}/1.0`
        );
        spanEmotes.appendChild(emote);
      }
    }
  } else {
    spanMessage.appendChild(document.createTextNode(`${txtObj.message}`));
  }

  wrapper.appendChild(spanBadges);
  wrapper.appendChild(spanUser);
  wrapper.appendChild(spanMessage);

  chatbox.appendChild(wrapper);
}

const getEmotes = (id) => {
  const img = `https://static-cdn.jtvnw.net/emoticons/v1/${id}/1.0`;
  const spanEmote = document.createElement("span");
  spanEmote.appendChild(img);
  return spanEmote;
};

const chatbox = document.querySelector(".chatbox-body");

const socket = io();

socket.on("connect", () => {
  console.log(socket.id);
});

socket.on("sendMessage", (data) => {
  appendText(data.userstate, formatEmotes(data.message, data.userstate.emotes));
});

const formatEmotes = (text, emotes) => {
  var splitText = text.split("");
  for (var i in emotes) {
    var e = emotes[i];
    for (var j in e) {
      var mote = e[j];
      if (typeof mote === "string") {
        mote = mote.split("-");
        mote = [parseInt(mote[0]), parseInt(mote[1])];
        var length = mote[1] - mote[0],
          empty = Array.apply(null, new Array(length + 1)).map(function () {
            return "";
          });
        splitText = splitText
          .slice(0, mote[0])
          .concat(empty)
          .concat(splitText.slice(mote[1] + 1, splitText.length));
        splitText.splice(
          mote[0],
          1,
          '<img class="emoticon" src="http://static-cdn.jtvnw.net/emoticons/v1/' +
            i +
            '/3.0">'
        );
      }
    }
  }

  return splitText.join("");
};

const appendText = (usrstate, txt) => {
  // Wrappes all the elements
  const wrapper = document.createElement("div");

  // Text with Emotes
  const pText = document.createElement("span");
  pText.innerHTML = txt;

  const pName = document.createElement("span");
  pName.appendChild(document.createTextNode(`${usrstate["display-name"]}`));

  getBadges(wrapper, usrstate.badges);
  wrapper.appendChild(pName);
  wrapper.appendChild(pText);

  //   p.appendChild(document.createNode(`${txt}`));
  chatbox.appendChild(wrapper);
};

const getBadges = (wrapper, usrBadges) => {
  const wspan = document.createElement("span");

  const badgeImg = document.createElement("img");
  badgeImg.setAttribute("width", "18px");

  fetch(`http://localhost:3000/twitch-badges`)
    .then((resp) => {
      return resp.blob();
    })
    .then((myBlob) => {
      console.log(myBlob);
    });
  // for (var badge in resp) {
  //   if (resp.hasOwnProperty(badge) && usrBadges.hasOwnProperty(badge)) {
  //     for (var vers in badge.versions) {
  //       if (badge.versions.hasOwnProperty(vers)) {
  //         badgeImg.setAttribute("src", vers.image_url_1x);
  //         badgeImg.setAttribute("alt", vers.description);
  //         return wrapper.appendChild(badgeImg);
  //       }
  //     }
  //   }
  // }
};

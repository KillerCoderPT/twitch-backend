/**
 * Function to get OAuth token from twitch
 *
 * @param axios Need the Axios to perform the POST request
 * @returns Returns a Promise
 */
async function getOAuthToken(axios) {
  const url = `https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&grant_type=client_credentials`;
  return await axios.post(url).then((res) => res.data);
}

/**
 * Get Twitch Status
 *
 * @param axios Need the Axios to perform the GET request
 * @param token This token is the OAuth token required by twitch
 */
async function twitchIsLive(axios, token, userId = undefined) {
  const id = userId !== undefined ? userId : process.env.TWITCH_USERNAME;
  const url = `https://api.twitch.tv/helix/search/channels?query=${id}`;
  return await axios
    .get(url, {
      headers: {
        "client-id": process.env.TWITCH_CLIENT_ID,
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
}

/**
 * EndPoint /twitch-status
 * This endpoint returns the Twitch Status
 *
 * @param axios Need the axios to pass throught the others functions
 */
const status = (axios) => (req, res) => {
  getOAuthToken(axios).then((data) => {
    twitchIsLive(axios, data.access_token).then((resp) => {
      // Find the User
      const obj = resp.data.find(
        (i) => i.display_name === process.env.TWITCH_USERNAME
      );

      // if the user was found, send the response
      obj !== undefined ? res.json(obj) : res.sendStatus(404);
    });
  });
};

/**
 * EndPoint /twitch-status/:id
 * This endpoint returns the Twitch Status from correspond ID
 *
 * @param axios Need the axios to pass throught the others functions
 */
const statusById = (axios) => (req, res) => {
  const { id } = req.params;

  getOAuthToken(axios).then((data) => {
    twitchIsLive(axios, data.access_token, id).then((resp) => {
      // Find the User
      const obj = resp.data.find((i) => i.display_name === id);

      // if the user was found, send the response
      obj !== undefined ? res.json(obj) : res.sendStatus(404);
    });
  });
};

module.exports = {
  status,
  statusById
};

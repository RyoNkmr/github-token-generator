const jsonwebtoken = require("jsonwebtoken");
const axios = require("axios");

const privateKey = process.env.GITHUB_APP_PRIVATE_KEY.replace(/\\n/g, "\n");
const iat = parseInt(Date.now() / 1000, 10);

const payload = {
  iat,
  exp: iat + 10 * 60,
  iss: parseInt(process.env.GITHUB_APP_APP_ID, 10)
};

const jwt = jsonwebtoken.sign(payload, privateKey, { algorithm: "RS256" });

module.exports = async () => {
  try {
    const { data } = await axios.post(
      `https://api.github.com/installations/${process.env.GITHUB_APP_INSTALLATION_ID}/access_tokens`,
      {},
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
          Accept: "application/vnd.github.machine-man-preview+json"
        }
      }
    );
    if (!data.token) {
      throw Error(`Received response ${data}, but could not get token`);
    }
    return data.token;
  } catch ({ name, message }) {
    throw Error(`${name}: ${message}`);
  }
};

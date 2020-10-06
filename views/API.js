/**
 * Client API for Color Carnival
 */
class API {
  constructor() {
    /**
     *
     * @param {Object} user
     * @param {String} user.userName
     * @param {String} user.pass
     * @returns {Promise} - {isAuthenticated: Boolean, userID: Number}
     */
    this.login = async ({ userName, pass }) => {
      try {
        let res = await fetch("/api/user/login", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "post",
          body: JSON.stringify({
            username: userName,
            userpass: pass,
          }),
        });

        let data = await res.json();

        return data;
      }
      catch (err) {
        throw new Error(err);
      }
    };

    /**
     * @param {Number} userID
     * @returns {Promise}- {isAuthenticated: Boolean, userID: Number}
     */
    this.logout = async (userID) => {
      try {
        let res = await fetch(`/api/user/logout/${userID}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "post",
        });

        // let data = await res.json();
        return res;
      }
      catch (err) {
        throw new Error(err);
      }
    };

    /**
     * @returns {Promise} - {nycDateFormat: String, sfoDateFormat: String}
     */
    this.getDate = async () => {
      try {
        let res = await fetch(`/api/date`, {
          method: "get",
        });

        let data = await res.json();
        return data;
      }
      catch (err) {
        throw new Error(err);
      }
    };
    /**
     * @returns {Promise} - {targetColor: Object, colors: Array}
     */
    this.getGameState = async () => {
      try {
        let res = await fetch(`/api/game/state`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "get",
        });

        let data = await res.json();
        return data;
      }
      catch (err) {
        throw new Error(err);
      }
    };

    /**
     *
     * @param {Number} userID
     * @param {Boolean} isCorrect
     * @returns {Promise} - {targetColor: Object, colors: Array}
     */
    this.postGameChoice = async (userID, isCorrect) => {
      try {
        let res = await fetch(`/api/game/state/${userID}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "post",
          body: JSON.stringify({
            success: isCorrect,
          })
        });

        let data = await res.json();
        return data;
      }
      catch (err) {
        throw new Error(err);
      }
    };

    /**
     * @param {Number} userID
     * @returns {Promise} - {userName: String, wins: Number, losses:Number}
     */
    this.getUser = async (userID) => {
      try {
        let res = await fetch(`/api/user/${userID}`, {
          method: "get",
        });

        let data = await res.json();
        return data;
      }
      catch (err) {
        throw new Error(err);
      }
    };
  }
}

export default API;

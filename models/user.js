var mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1 = require("uuid/v1");

var Schema = mongoose.Schema;
var userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    lastName: {
      type: String,
      maxlength: 32,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },

    userinfo: {
      type: String,
      trim: true,
    },

    encp_password: {
      type: String,
      required: true,
    },
    salt: String,

    role: {
      type: Number,
      default: 0,
    },
    purchases: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv1();
    this.encp_password = this.securePass(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.methods = {
  autheticate: function (plainPass) {
    return this.securePass(plainPass) === this.encp_password;
  },

  securePass: function (plainPass) {
    if (!plainPass) return "";

    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainPass)
        .digest("hex");
    } catch (error) {
      return "";
    }
  },
};

module.exports = mongoose.model("User", userSchema);

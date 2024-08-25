const whiteList = [
  "https://mysite.com",
  "http://localhost:3100",
  "http://127.0.0.1:3100",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by cors."));
    }
  },

  optionsSuccessStatus: 200,
};

module.exports = corsOptions;

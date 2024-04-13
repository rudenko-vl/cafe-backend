const allowedCors = [
  "https://cafe-visits-frontend.vercel.app/",
  "http://cafe-visits-frontend.vercel.app/",
  "http://localhost:5173",
];

const corsOption = (req, res, next) => {
  const { origin } = req.headers;
  const requestHeaders = req.headers["access-control-request-headers"];

  const DEFAULT_ALLOWED_METHODS = [
    "GET",
    "HEAD",
    "PUT",
    "PATCH",
    "POST",
    "DELETE",
  ];

  if (allowedCors.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Credentials", true);
  }

  if (req.method === "OPTIONS") {
    res.status(200);
    res.setheader("Access-Control-Allow-Methods", DEFAULT_ALLOWED_METHODS);
    res.setheader("Access-Control-Allow-Headers", requestHeaders);
    return res.end();
  }

  return next();
};

export default corsOption;

import winston from "winston";

// Create a new winston logger instance
const logger = winston.createLogger({
  level: "info", // Set default log level to 'info'
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(), // Output to console in development
    new winston.transports.File({ filename: "app.log" }), // Output to a log file
  ],
});

// Function to log all outgoing requests
const logRequest = (req: any, res: any, next: any) => {
  const { method, url, headers, body } = req;
  const requestDetails = {
    method,
    url,
    headers,
    body,
  };
  logger.info(`Request Details: ${JSON.stringify(requestDetails)}`);

  res.on("finish", () => {
    // Log the response status code after the request is processed
    logger.info(`Response Status: ${res.statusCode} for ${method} ${url}`);
  });

  next();
};

export { logger, logRequest };

import * as Sentry from "@sentry/node";
import express from "express";
import { nodeProfilingIntegration} from "@sentry/profiling-node"

Sentry.init({
  dsn: "https://6786737fa55b2bf8a0a637ccfb5e8afa@o4509073377394688.ingest.de.sentry.io/4509073380671568",
  profileSessionSampleRate: 1.0,
  integrations: [
    nodeProfilingIntegration(),
    Sentry.mongooseIntegration()
  ]
});

// All your controllers should live here
const app = express();

app.get("/", (req, res) => {
  res.send("Hello world!");
});

Sentry.profiler.startProfiler();

// The error handler must be registered before any other error middleware
Sentry.setupExpressErrorHandler(app);

app.use((err, req, res, next) => {
  res.status(500).send("Greška na serveru!");
});



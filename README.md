# Node.js Server Hanging After Many Requests

This repository demonstrates a bug where a Node.js server hangs after handling a large number of requests. The issue stems from unhandled promise rejections within a separate module that are not properly caught or logged.

## Bug Description

A Node.js HTTP server is created to handle incoming requests.  The server simulates a 5-second delay before sending a response.  When a high number of requests are sent concurrently, the server eventually stops responding. This is because unhandled promise rejections in a separate module (not shown here for brevity, but emulated by the setTimeout) accumulate until the process becomes unresponsive. 

## How to Reproduce

1. Clone this repository.
2. Run `node server.js`.
3. Send a large number of requests to `http://localhost:3000` concurrently using tools such as `wrk` or `ab`.

After a certain number of requests, you'll observe that the server stops responding to further requests.

## Solution

The solution involves implementing proper error handling using `process.on('unhandledRejection', ...)` to catch and log unhandled promise rejections.  This prevents the process from silently crashing and allows for more robust error handling.  See `serverSolution.js` for the fix.
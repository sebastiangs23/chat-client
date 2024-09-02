import axios from "axios";

export const apiClient = axios.create({
  baseURL: 'http://localhost:2337/server',
  headers: {
    "X-Parse-REST-API-Key": "YzhI06W5O7Vhf8iwIYBQCxs6hY8Fs2PQewNGjsl0",
    "X-Parse-Application-Id": "000",
    "X-Parse-Session-Token": "r:eac0751fbbf5a31717adbd986e13bcdf",
  },
});

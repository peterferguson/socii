import { willItFloat } from "./willItFloat";
import { camelCase } from "./camelCase";

export const cleanJsonResponse = (response) => {
  const keys = Object.keys(response);
  let cleaned = {};
  for (const key of keys) {
    cleaned[camelCase(key)] =
      response[key] === "None" ? null : willItFloat(response[key]);
  }
  return cleaned;
};

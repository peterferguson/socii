// - this stopped working for nested objects
// - as a workaround I am just going to stringify then parse the object
export const serializeObjectDateKeys = async (obj: object): Promise<object> => {
  for await (const key of Object.keys(obj)) {
    // - duck typing check for firebase date values
    if (typeof obj[key].toMillis === "function") {
      obj[key] = JSON.stringify(obj[key].toDate())
      continue
    }

    // // - check if the value is an object and if so, serialize it
    // if (typeof obj[key] === "object" && obj[key] !== null && !("seconds" in obj[key])) {
    //   return await serializeObjectDateKeys(obj[key])
    // }
  }
  return obj
}

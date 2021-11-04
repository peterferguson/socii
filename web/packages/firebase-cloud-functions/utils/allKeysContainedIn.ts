
export const allKeysContainedIn = (obj: object, other: object) => {
  let keys = null;

  switch (typeof obj) {
    case "object":
      if (Array.isArray(obj)) {
        keys = obj;
      } else {
        keys = Object.keys(obj);
      }
      break;
  }

  // Ensure that the object has all of the keys in `other`
  return keys.every((key: string) => key in other);
};


export function singleLineTemplateString(strings, ...values) {
  let output = "";
  for (let i = 0; i < values.length; i++) {
    output += strings[i] + values[i];
  }
  output += strings[values.length];

  // Split on newlines.
  let lines = output.split(/(?:\r\n|\n|\r)/);

  // Rip out the leading whitespace.
  return lines
    .map((line) => {
      return line.replace(/^\s+/gm, "");
    })
    .join(" ")
    .trim();
}

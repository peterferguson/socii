// - Helper for tailwind to replace template literals

export function tw(...classes: (false | null | undefined | string)[]): string {
  return classes.filter(Boolean).join(" ");
}

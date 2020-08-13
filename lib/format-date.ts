export function formatDate(fullDate: string) {
  let date = new Date(fullDate)
  // normalizes UTC with local timezone
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset())
  const dateOptions = {
    formatMatcher: "best fit",
    month: "long",
    year: "numeric",
    day: "numeric",
  }
  return date.toLocaleDateString("en-US", dateOptions)
}

export const YEARS = (() => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: currentYear - 1900 + 1 }, (_, i) => currentYear - i);
})();

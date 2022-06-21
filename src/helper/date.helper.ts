export const getCurrentUTCDate = () => {
  const today = new Date();
  const dd = String(today.getUTCDate()).padStart(2, '0');
  const mm = String(today.getUTCMonth() + 1).padStart(2, '0');
  const yyyy = today.getUTCFullYear();
  return `${yyyy}-${mm}-${dd}`;
};
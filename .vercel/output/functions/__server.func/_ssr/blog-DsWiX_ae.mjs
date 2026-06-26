const MONTHS_PT = [
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro"
];
const formatPostDate = (iso) => {
  try {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    const day = String(d.getDate()).padStart(2, "0");
    const month = MONTHS_PT[d.getMonth()] ?? "";
    return `${day} de ${month} de ${d.getFullYear()}`;
  } catch {
    return iso;
  }
};
export {
  formatPostDate as f
};

/**
 * Mengubah string tanggal (misal: "2025-09-15T17:00:00.000Z") 
 * menjadi format yang mudah dibaca (misal: "16 September 2025").
 * @param {string} dateString - String tanggal yang akan diformat.
 * @returns {string} Tanggal dalam format lokal Indonesia.
 */
export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('id-ID', options);
};

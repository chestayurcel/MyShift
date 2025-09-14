import { formatDate } from './dateFormatter';

describe('Helper: dateFormatter', () => {
  
  // 'it' atau 'test' adalah satu skenario pengujian
  it('seharusnya memformat string tanggal ISO menjadi format tanggal Indonesia', () => {
    // 1. Siapkan data input
    const inputDate = '2025-09-15T10:00:00.000Z';
    
    // 2. Tentukan output yang kita harapkan
    const expectedOutput = '15 September 2025';
    
    // 3. Jalankan fungsi yang akan diuji
    const result = formatDate(inputDate);
    
    // 4. Bandingkan hasilnya dengan yang diharapkan
    // 'expect(result).toBe(expectedOutput)' berarti "harapkan 'result' untuk menjadi 'expectedOutput'"
    expect(result).toBe(expectedOutput);
  });

  it('seharusnya menangani tanggal dengan benar untuk bulan yang berbeda', () => {
    const inputDate = '2024-02-29T10:00:00.000Z'; // Tahun kabisat
    const expectedOutput = '29 Februari 2024';
    const result = formatDate(inputDate);
    expect(result).toBe(expectedOutput);
  });

});
import React, { useState, useEffect, useCallback } from 'react';
import Layout from '../components/Layout';
import perizinanService from '../services/perizinanService';

const AjukanIzinPage = () => {
  const [jenisIzin, setJenisIzin] = useState('cuti');
  const [tanggalMulai, setTanggalMulai] = useState('');
  const [tanggalSelesai, setTanggalSelesai] = useState('');
  const [keterangan, setKeterangan] = useState('');
  const [fileSurat, setFileSurat] = useState(null); // State baru untuk file
  const [message, setMessage] = useState('');
  const [riwayat, setRiwayat] = useState([]);

  const fetchRiwayat = useCallback(() => {
    perizinanService.getRiwayatIzin()
      .then(res => setRiwayat(res.data))
      .catch(err => console.error("Gagal mengambil riwayat izin:", err));
  }, []);

  useEffect(() => {
    fetchRiwayat();
  }, [fetchRiwayat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    
    // Membuat objek FormData untuk mengirim file
    const formData = new FormData();
    formData.append('jenis_izin', jenisIzin);
    formData.append('tanggal_mulai', tanggalMulai);
    formData.append('tanggal_selesai', tanggalSelesai);
    formData.append('keterangan', keterangan);
    formData.append('file_surat', fileSurat); // Tambahkan file ke form data

    try {
      await perizinanService.ajukanIzin(formData);
      alert('Pengajuan izin berhasil dikirim.');
      
      // Reset form
      setJenisIzin('cuti');
      setTanggalMulai('');
      setTanggalSelesai('');
      setKeterangan('');
      setFileSurat(null);
      document.getElementById('file_surat').value = null; // Membersihkan input file

      fetchRiwayat(); // Refresh riwayat
    } catch (error) {
      const resMessage = (error.response?.data?.message) || 'Terjadi kesalahan.';
      setMessage(resMessage);
    }
  };

  return (
    <Layout>
      {/* Form Pengajuan Izin */}
      <div className="card shadow-sm mb-4">
        <div className="card-header"><h5 className="mb-0">Form Pengajuan Izin</h5></div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="jenis_izin" className="form-label">Jenis Izin</label>
              <select id="jenis_izin" className="form-select" value={jenisIzin} onChange={(e) => setJenisIzin(e.target.value)}>
                <option value="cuti">Cuti</option>
                <option value="sakit">Sakit</option>
              </select>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="tanggal_mulai" className="form-label">Tanggal Mulai</label>
                <input type="date" id="tanggal_mulai" className="form-control" value={tanggalMulai} onChange={(e) => setTanggalMulai(e.target.value)} required />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="tanggal_selesai" className="form-label">Tanggal Selesai</label>
                <input type="date" id="tanggal_selesai" className="form-control" value={tanggalSelesai} onChange={(e) => setTanggalSelesai(e.target.value)} required />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="keterangan" className="form-label">Keterangan</label>
              <textarea id="keterangan" className="form-control" rows="3" value={keterangan} onChange={(e) => setKeterangan(e.target.value)} required></textarea>
            </div>
            {/* Input File Baru */}
            <div className="mb-3">
              <label htmlFor="file_surat" className="form-label">Unggah Surat Izin (PDF/DOC/JPG/PNG)</label>
              <input type="file" id="file_surat" className="form-control" onChange={(e) => setFileSurat(e.target.files[0])} required />
            </div>
            <button type="submit" className="btn btn-primary">Ajukan</button>
            {message && <div className="alert alert-danger mt-3">{message}</div>}
          </form>
        </div>
      </div>

      {/* Tabel Riwayat Pengajuan */}
      <div className="card shadow-sm">
        <div className="card-header"><h5 className="mb-0">Riwayat Pengajuan Izin Anda</h5></div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="table-dark">
                <tr>
                  <th>Jenis Izin</th>
                  <th>Tanggal</th>
                  <th>Keterangan</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {riwayat.length > 0 ? (
                  riwayat.map(item => (
                    <tr key={item.id}>
                      <td>{item.jenis_izin}</td>
                      <td>{`${new Date(item.tanggal_mulai).toLocaleDateString('id-ID')} - ${new Date(item.tanggal_selesai).toLocaleDateString('id-ID')}`}</td>
                      <td>{item.keterangan}</td>
                      <td>
                        <span className={`badge bg-${item.status === 'diterima' ? 'success' : item.status === 'ditolak' ? 'danger' : 'warning'}`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="4" className="text-center">Belum ada riwayat pengajuan.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AjukanIzinPage;
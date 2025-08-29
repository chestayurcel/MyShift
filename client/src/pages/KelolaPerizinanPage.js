import React, { useState, useEffect, useCallback } from 'react';
import Layout from '../components/Layout';
import perizinanService from '../services/perizinanService';

const KelolaPerizinanPage = () => {
  const [semuaIzin, setSemuaIzin] = useState([]);
  const [filter, setFilter] = useState('semua'); // State untuk filter status

  const fetchSemuaIzin = useCallback(() => {
    perizinanService.getAllIzinForAdmin()
      .then(res => setSemuaIzin(res.data))
      .catch(err => console.error("Gagal mengambil data perizinan:", err));
  }, []);

  useEffect(() => {
    fetchSemuaIzin();
  }, [fetchSemuaIzin]);

  const handleUpdateStatus = async (id, status) => {
    const confirmationMessage = `Apakah Anda yakin ingin ${status === 'diterima' ? 'menerima' : 'menolak'} pengajuan ini?`;
    if (window.confirm(confirmationMessage)) {
      try {
        await perizinanService.updateStatusIzin(id, status);
        alert(`Pengajuan berhasil ${status}.`);
        fetchSemuaIzin(); // Refresh data
      } catch (error) {
        alert('Gagal memperbarui status pengajuan.');
        console.error(error);
      }
    }
  };

  // Logika untuk memfilter data yang ditampilkan
  const filteredIzin = semuaIzin.filter(item => {
    if (filter === 'semua') return true;
    return item.status === filter;
  });

  return (
    <Layout>
      <h1 className="mb-4">Kelola Pengajuan Perizinan</h1>

      {/* Tombol Filter */}
      <div className="mb-3">
        <button className={`btn btn-sm me-2 ${filter === 'semua' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setFilter('semua')}>Semua</button>
        <button className={`btn btn-sm me-2 ${filter === 'menunggu' ? 'btn-warning' : 'btn-outline-warning'}`} onClick={() => setFilter('menunggu')}>Menunggu</button>
        <button className={`btn btn-sm me-2 ${filter === 'diterima' ? 'btn-success' : 'btn-outline-success'}`} onClick={() => setFilter('diterima')}>Diterima</button>
        <button className={`btn btn-sm ${filter === 'ditolak' ? 'btn-danger' : 'btn-outline-danger'}`} onClick={() => setFilter('ditolak')}>Ditolak</button>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="table-dark">
                <tr>
                  <th>Nama Pegawai</th>
                  <th>Jenis Izin</th>
                  <th>Tanggal</th>
                  <th>Keterangan</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredIzin.length > 0 ? (
                  filteredIzin.map(item => (
                    <tr key={item.id}>
                      <td>{item.nama_lengkap}</td>
                      <td>{item.jenis_izin}</td>
                      <td>{`${new Date(item.tanggal_mulai).toLocaleDateString('id-ID')} - ${new Date(item.tanggal_selesai).toLocaleDateString('id-ID')}`}</td>
                      <td>{item.keterangan}</td>
                      <td>
                        <span className={`badge bg-${item.status === 'diterima' ? 'success' : item.status === 'ditolak' ? 'danger' : 'warning'}`}>
                          {item.status}
                        </span>
                      </td>
                      <td>
                        {item.status === 'menunggu' ? (
                          <>
                            <button onClick={() => handleUpdateStatus(item.id, 'diterima')} className="btn btn-sm btn-success me-2">Terima</button>
                            <button onClick={() => handleUpdateStatus(item.id, 'ditolak')} className="btn btn-sm btn-danger">Tolak</button>
                          </>
                        ) : (
                          <span>-</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">Tidak ada data pengajuan.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default KelolaPerizinanPage;
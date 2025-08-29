import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
import Layout from '../components/Layout';
import departemenService from '../services/departemenService';

const PresensiByDepartemenPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [presensi, setPresensi] = useState([]);
  const [departemenNama, setDepartemenNama] = useState('');

  const fetchData = useCallback(async () => {
    try {
      const [presensiRes, deptRes] = await Promise.all([
        departemenService.getPresensiInDepartemen(id),
        departemenService.getDetails(id)
      ]);
      setPresensi(presensiRes.data);
      setDepartemenNama(deptRes.data.nama_departemen);
    } catch (error) {
      console.error("Gagal memuat data:", error);
      navigate('/admin/departemen/daftar');
    }
  }, [id, navigate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Layout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">Riwayat Presensi: {departemenNama}</h1>
        <RouterLink to={`/admin/departemen/${id}`} className="btn btn-secondary">
          Kembali
        </RouterLink>
      </div>

      <div className="card shadow-sm">
        <div className="card-header">
          <h5 className="mb-0">Detail Kehadiran</h5>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="table-dark">
                <tr>
                  <th>Nama Pegawai</th>
                  <th>Tanggal</th>
                  <th>Jam Masuk</th>
                  <th>Jam Keluar</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {presensi.length > 0 ? (
                  presensi.map((item, index) => (
                    <tr key={index}>
                      <td>{item.nama_lengkap}</td>
                      <td>{new Date(item.tanggal).toLocaleDateString('id-ID')}</td>
                      <td>{item.jam_masuk}</td>
                      <td>{item.jam_keluar || '-'}</td>
                      <td>{item.status}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">Belum ada riwayat presensi di departemen ini.</td>
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

export default PresensiByDepartemenPage;
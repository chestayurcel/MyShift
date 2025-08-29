import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
import Layout from '../components/Layout';
import departemenService from '../services/departemenService';

const DepartemenDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [departemen, setDepartemen] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDepartemenDetail = useCallback(async () => {
    try {
      const response = await departemenService.getDetails(id);
      setDepartemen(response.data);
    } catch (error) {
      console.error("Gagal mengambil detail departemen:", error);
      navigate('/admin/departemen/daftar');
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    fetchDepartemenDetail();
  }, [fetchDepartemenDetail]);

  if (loading) {
    return <Layout><p>Loading...</p></Layout>;
  }

  return (
    <Layout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">Departemen: {departemen?.nama_departemen}</h1>
        <RouterLink to="/admin/departemen/daftar" className="btn btn-secondary">
          Kembali ke Daftar Departemen
        </RouterLink>
      </div>

      <div className="row">
        {/* Kotak untuk Manajemen Pegawai */}
        <div className="col-lg-6 mb-4">
          <div className="card shadow-sm h-100">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">Manajemen Pegawai</h5>
              <p className="card-text text-muted">Tambah, edit, atau hapus data pegawai yang terdaftar di departemen ini.</p>
              <RouterLink 
                to={`/admin/departemen/${id}/pegawai`} 
                className="btn btn-primary mt-auto"
              >
                Lihat Detail
              </RouterLink>
            </div>
          </div>
        </div>

        {/* Kotak untuk Riwayat Presensi */}
        <div className="col-lg-6 mb-4">
          <div className="card shadow-sm h-100">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">Riwayat Presensi</h5>
              <p className="card-text text-muted">Lihat semua catatan kehadiran dari para pegawai di departemen ini.</p>
              <RouterLink 
                to={`/admin/departemen/${id}/presensi`} 
                className="btn btn-info mt-auto"
              >
                Lihat Detail
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DepartemenDetailPage;
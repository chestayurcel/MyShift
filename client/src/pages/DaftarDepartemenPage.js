import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import departemenService from '../services/departemenService';
import Layout from '../components/Layout';

const DaftarDepartemenPage = () => {
  const [departemen, setDepartemen] = useState([]);
  const navigate = useNavigate();

  const fetchDepartemen = useCallback(() => {
    departemenService.getAll()
      .then(response => {
        setDepartemen(response.data);
      })
      .catch(error => {
        console.error("Gagal mengambil data departemen:", error);
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          navigate('/login');
        }
      });
  }, [navigate]);

  useEffect(() => {
    fetchDepartemen();
  }, [fetchDepartemen]);

  return (
    <Layout>
      <h1 className="mb-4">Daftar Departemen</h1>
      <div className="row">
        {departemen.length > 0 ? (
          departemen.map(dept => (
            <div className="col-md-4 mb-4" key={dept.id}>
              <div className="card shadow-sm h-100">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{dept.nama_departemen}</h5>
                  <p className="card-text text-muted">Kelola pegawai dan lihat presensi untuk departemen ini.</p>
                  <RouterLink 
                    to={`/admin/departemen/${dept.id}`} 
                    className="btn btn-primary mt-auto"
                  >
                    Lihat Detail
                  </RouterLink>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Belum ada departemen yang dibuat. Silakan tambahkan di halaman "Kelola Departemen".</p>
        )}
      </div>
    </Layout>
  );
};

export default DaftarDepartemenPage;
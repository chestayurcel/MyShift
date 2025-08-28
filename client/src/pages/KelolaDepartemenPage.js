import React, { useState, useEffect, useCallback } from 'react';
import Layout from '../components/Layout';
import departemenService from '../services/departemenService';

const KelolaDepartemenPage = () => {
  const [departemen, setDepartemen] = useState([]);
  const [namaDepartemen, setNamaDepartemen] = useState('');
  const [editingId, setEditingId] = useState(null); // Untuk melacak ID yang sedang diedit
  const [message, setMessage] = useState('');

  const fetchDepartemen = useCallback(async () => {
    try {
      const response = await departemenService.getAll();
      setDepartemen(response.data);
    } catch (error) {
      console.error("Gagal mengambil data departemen:", error);
    }
  }, []);

  useEffect(() => {
    fetchDepartemen();
  }, [fetchDepartemen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      if (editingId) {
        // Proses Update
        await departemenService.update(editingId, { nama_departemen: namaDepartemen });
        setMessage('Departemen berhasil diperbarui.');
      } else {
        // Proses Create
        await departemenService.create({ nama_departemen: namaDepartemen });
        setMessage('Departemen baru berhasil ditambahkan.');
      }
      setNamaDepartemen('');
      setEditingId(null);
      fetchDepartemen(); // Refresh data
    } catch (error) {
      setMessage(error.response?.data?.message || 'Terjadi kesalahan.');
    }
  };

  const handleEdit = (dept) => {
    setEditingId(dept.id);
    setNamaDepartemen(dept.nama_departemen);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus departemen ini? Ini akan mengatur departemen pegawai terkait menjadi kosong.')) {
      try {
        await departemenService.remove(id);
        setMessage('Departemen berhasil dihapus.');
        fetchDepartemen(); // Refresh data
      } catch (error) {
        setMessage('Gagal menghapus departemen.');
      }
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setNamaDepartemen('');
  };

  return (
    <Layout>
      <h1 className="mb-4">Kelola Departemen</h1>

      {/* Form untuk Tambah/Edit */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h5 className="card-title">{editingId ? 'Edit Departemen' : 'Tambah Departemen Baru'}</h5>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Nama Departemen"
                value={namaDepartemen}
                onChange={(e) => setNamaDepartemen(e.target.value)}
                required
              />
              <button className="btn btn-primary" type="submit">{editingId ? 'Update' : 'Simpan'}</button>
              {editingId && <button className="btn btn-secondary" type="button" onClick={cancelEdit}>Batal</button>}
            </div>
          </form>
          {message && <div className="alert alert-info mt-3">{message}</div>}
        </div>
      </div>

      {/* Tabel Daftar Departemen */}
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title">Daftar Departemen</h5>
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="table-dark">
                <tr>
                  <th>Nama Departemen</th>
                  <th style={{ width: '150px' }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {departemen.map((dept) => (
                  <tr key={dept.id}>
                    <td>{dept.nama_departemen}</td>
                    <td>
                      <button onClick={() => handleEdit(dept)} className="btn btn-sm btn-primary me-2">Edit</button>
                      <button onClick={() => handleDelete(dept.id)} className="btn btn-sm btn-danger">Hapus</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default KelolaDepartemenPage;
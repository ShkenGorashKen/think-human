import React, { useState, useEffect } from 'react';
import api from '../services/api';

function BeneficiariosScreen() {
  const [beneficiarios, setBeneficiarios] = useState([]);
  const [formData, setFormData] = useState({
    nome: '',
    idade: '',
    email: '',
    telefone: '',
    tipoDeAjuda: '',
    situacaoSocial: '',
  });
  const [editandoId, setEditandoId] = useState(null);

  useEffect(() => {
    carregarBeneficiarios();
  }, []);

  const carregarBeneficiarios = async () => {
    try {
      const res = await api.get('/beneficiarios');
      setBeneficiarios(res.data);
    } catch (err) {
      alert('Erro ao carregar beneficiários');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editandoId) {
        await api.put(`/beneficiarios/${editandoId}`, formData);
        setEditandoId(null);
      } else {
        await api.post('/beneficiarios', formData);
      }
      setFormData({
        nome: '',
        idade: '',
        email: '',
        telefone: '',
        tipoDeAjuda: '',
        situacaoSocial: '',
      });
      carregarBeneficiarios();
    } catch (err) {
      alert('Erro ao salvar beneficiário');
    }
  };

  const handleEditar = (b) => {
    setFormData(b);
    setEditandoId(b.id);
  };

  const handleExcluir = async (id) => {
    if (window.confirm('Deseja realmente excluir este beneficiário?')) {
      await api.delete(`/beneficiarios/${id}`);
      carregarBeneficiarios();
    }
  };

  return (
    <div style={styles.container}>
      <h2>Gerenciar Beneficiários</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input name="nome" placeholder="Nome" value={formData.nome} onChange={handleChange} style={styles.input} />
        <input name="idade" placeholder="Idade" value={formData.idade} onChange={handleChange} style={styles.input} />
        <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} style={styles.input} />
        <input name="telefone" placeholder="Telefone" value={formData.telefone} onChange={handleChange} style={styles.input} />
        <input name="tipoDeAjuda" placeholder="Tipo de Ajuda" value={formData.tipoDeAjuda} onChange={handleChange} style={styles.input} />
        <input name="situacaoSocial" placeholder="Situação Social" value={formData.situacaoSocial} onChange={handleChange} style={styles.input} />

        <button type="submit" style={styles.button}>
          {editandoId ? 'Salvar Alterações' : 'Cadastrar'}
        </button>
      </form>

      <h3>Lista de Beneficiários</h3>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Idade</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Ajuda</th>
            <th>Situação</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {beneficiarios.map((b) => (
            <tr key={b.id}>
              <td>{b.nome}</td>
              <td>{b.idade}</td>
              <td>{b.email}</td>
              <td>{b.telefone}</td>
              <td>{b.tipoDeAjuda}</td>
              <td>{b.situacaoSocial}</td>
              <td>
                <button onClick={() => handleEditar(b)} style={styles.actionButton}>✏️</button>
                <button onClick={() => handleExcluir(b.id)} style={styles.actionButton}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1000px',
    margin: '20px auto',
    padding: '20px',
    textAlign: 'center',
  },
  form: {
    marginBottom: '30px',
    display: 'grid',
    gap: '10px',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  },
  input: {
    padding: '10px',
    fontSize: '14px',
  },
  button: {
    gridColumn: 'span 2',
    padding: '10px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  actionButton: {
    margin: '0 5px',
    cursor: 'pointer',
  },
};

export default BeneficiariosScreen;

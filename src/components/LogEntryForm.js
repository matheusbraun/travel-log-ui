import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { createLogEntry } from '../services/api';

const LogEntryForm = ({ latitude, longitude, onSubmitCallback }) => {
  const { register, handleSubmit } = useForm();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = async data => {
    setLoading(true);
    try {
      const response = await createLogEntry({ ...data, latitude, longitude });

      if (onSubmitCallback) onSubmitCallback(response);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <form className="log-entry-form" onSubmit={handleSubmit(onSubmit)}>
      {error && <h4>{error}</h4>}
      <label htmlFor="title">Título</label>
      <input name="title" required ref={register} disabled={loading} />
      <label htmlFor="description">Descrição</label>
      <textarea name="description" rows={3} ref={register} disabled={loading} />
      <label htmlFor="comments">Comentário</label>
      <textarea name="comments" rows={3} ref={register} disabled={loading} />
      <label htmlFor="image">Link da imagem</label>
      <input name="image" ref={register} disabled={loading} />
      <label htmlFor="visitDate">Data da Visita</label>
      <input
        name="visitDate"
        type="date"
        required
        ref={register}
        disabled={loading}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Carregando...' : 'Salvar'}
      </button>
    </form>
  );
};

export default LogEntryForm;

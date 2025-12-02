import React, { useState } from 'react';
import { Lock, Download, Mail, Calendar, MapPin, AlertCircle, Loader2, CheckCircle2 } from 'lucide-react';

const AdminWaitlist = () => {
  const [token, setToken] = useState('');
  const [emails, setEmails] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [authenticated, setAuthenticated] = useState(false);

  const handleLoadWaitlist = async () => {
    // Validación básica
    if (!token.trim()) {
      setError('Por favor, introduce el token de administrador');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/waitlist', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 401) {
        setError('Token incorrecto. Verifica tus credenciales.');
        setAuthenticated(false);
        setEmails([]);
        setTotal(0);
        return;
      }

      if (response.status === 500) {
        setError('Error del servidor. Inténtalo de nuevo más tarde.');
        return;
      }

      if (!response.ok) {
        setError(`Error ${response.status}: No se pudo cargar la lista.`);
        return;
      }

      const data = await response.json();

      if (data.success) {
        setEmails(data.emails || []);
        setTotal(data.total || 0);
        setAuthenticated(true);
        setError('');
      } else {
        setError('Respuesta inesperada del servidor.');
      }
    } catch (err) {
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        setError('Error de conexión. Verifica tu red e inténtalo de nuevo.');
      } else {
        setError('Error inesperado: ' + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleExportCSV = () => {
    if (emails.length === 0) {
      setError('No hay datos para exportar.');
      return;
    }

    // Crear contenido CSV
    const headers = ['email', 'timestamp', 'ip'];
    const rows = emails.map(item => [
      item.email,
      item.timestamp,
      item.ip || ''
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    // Crear blob y descargar
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', 'ponsiv-waitlist.csv');
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    try {
      return new Date(timestamp).toLocaleString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    } catch {
      return timestamp;
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#02010A',
      color: '#FFFFFF',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      padding: '40px 20px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '48px'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '16px'
          }}>
            <Lock size={32} color="#E3C393" />
            <h1 style={{
              fontSize: '36px',
              fontWeight: '700',
              margin: '0',
              letterSpacing: '-0.02em'
            }}>
              Admin Waitlist
            </h1>
          </div>
          <p style={{
            fontSize: '16px',
            color: '#9CA3AF',
            margin: '0'
          }}>
            Panel de administración de Ponsiv
          </p>
        </div>

        {/* Authentication Card */}
        {!authenticated && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            padding: '32px',
            marginBottom: '32px',
            backdropFilter: 'blur(10px)'
          }}>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '600',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <Lock size={20} />
              Autenticación requerida
            </h2>

            <div style={{ marginBottom: '16px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                marginBottom: '8px',
                color: '#D1D5DB'
              }}>
                Token de administrador
              </label>
              <input
                type="password"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLoadWaitlist()}
                placeholder="Introduce tu token aquí"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  color: '#FFFFFF',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'all 0.2s',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <button
              onClick={handleLoadWaitlist}
              disabled={loading}
              style={{
                width: '100%',
                padding: '12px 24px',
                background: loading ? '#6B7280' : '#E3C393',
                color: '#02010A',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.2s'
              }}
            >
              {loading ? (
                <>
                  <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} />
                  Cargando...
                </>
              ) : (
                'Cargar lista'
              )}
            </button>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <AlertCircle size={20} color="#EF4444" />
            <span style={{ color: '#FCA5A5', fontSize: '14px' }}>{error}</span>
          </div>
        )}

        {/* Success State */}
        {authenticated && emails.length > 0 && (
          <>
            {/* Stats & Export */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px',
              flexWrap: 'wrap',
              gap: '16px'
            }}>
              <div style={{
                display: 'flex',
                gap: '24px',
                alignItems: 'center'
              }}>
                <div>
                  <div style={{ fontSize: '14px', color: '#9CA3AF', marginBottom: '4px' }}>
                    Total registros
                  </div>
                  <div style={{ fontSize: '28px', fontWeight: '700', color: '#E3C393' }}>
                    {total}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '14px', color: '#9CA3AF', marginBottom: '4px' }}>
                    Mostrando
                  </div>
                  <div style={{ fontSize: '28px', fontWeight: '700' }}>
                    {emails.length}
                  </div>
                </div>
              </div>

              <button
                onClick={handleExportCSV}
                style={{
                  padding: '12px 24px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  color: '#FFFFFF',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                }}
              >
                <Download size={18} />
                Exportar CSV
              </button>
            </div>

            {/* Table */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              overflow: 'hidden'
            }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{
                  width: '100%',
                  borderCollapse: 'collapse'
                }}>
                  <thead>
                    <tr style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                    }}>
                      <th style={{
                        padding: '16px 24px',
                        textAlign: 'left',
                        fontSize: '12px',
                        fontWeight: '600',
                        color: '#9CA3AF',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Mail size={16} />
                          Email
                        </div>
                      </th>
                      <th style={{
                        padding: '16px 24px',
                        textAlign: 'left',
                        fontSize: '12px',
                        fontWeight: '600',
                        color: '#9CA3AF',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Calendar size={16} />
                          Fecha
                        </div>
                      </th>
                      <th style={{
                        padding: '16px 24px',
                        textAlign: 'left',
                        fontSize: '12px',
                        fontWeight: '600',
                        color: '#9CA3AF',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <MapPin size={16} />
                          IP
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {emails.map((item, index) => (
                      <tr
                        key={index}
                        style={{
                          borderBottom: index < emails.length - 1 ? '1px solid rgba(255, 255, 255, 0.05)' : 'none',
                          transition: 'background 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent';
                        }}
                      >
                        <td style={{
                          padding: '16px 24px',
                          fontSize: '14px',
                          fontWeight: '500'
                        }}>
                          {item.email}
                        </td>
                        <td style={{
                          padding: '16px 24px',
                          fontSize: '14px',
                          color: '#D1D5DB'
                        }}>
                          {formatDate(item.timestamp)}
                        </td>
                        <td style={{
                          padding: '16px 24px',
                          fontSize: '14px',
                          color: '#9CA3AF',
                          fontFamily: 'monospace'
                        }}>
                          {item.ip || 'N/A'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* Empty State (authenticated but no data) */}
        {authenticated && emails.length === 0 && !loading && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            padding: '64px 32px',
            textAlign: 'center'
          }}>
            <CheckCircle2 size={48} color="#10B981" style={{ margin: '0 auto 16px' }} />
            <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px' }}>
              Autenticado correctamente
            </h3>
            <p style={{ color: '#9CA3AF', fontSize: '14px' }}>
              No hay registros en la waitlist todavía.
            </p>
          </div>
        )}
      </div>

      {/* Inline keyframes for spinner */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default AdminWaitlist;

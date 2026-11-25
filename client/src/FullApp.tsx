import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { ApiHttpError } from './api.js';
import { createTask, deleteTask, getMe, listTasks, login, register, updateTask } from './task-api.js';
import type { PaginationMeta, Task, TaskListQuery, User } from './types.js';

const TOKEN_KEY = 'task-api.access-token';
const INITIAL_QUERY: TaskListQuery = { page: 1, limit: 5, status: '', search: '', sortBy: 'createdAt', order: 'desc' };

const messageFrom = (error: unknown): string => error instanceof ApiHttpError
  ? `${error.message}${error.requestId ? ` Referencia: ${error.requestId}.` : ''}`
  : 'No fue posible comunicarse con la API.';

export default function FullApp() {
  const [token, setToken] = useState<string | null>(() => sessionStorage.getItem(TOKEN_KEY));
  const [user, setUser] = useState<User | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [query, setQuery] = useState<TaskListQuery>(INITIAL_QUERY);
  const [message, setMessage] = useState('Inicia sesión o crea una cuenta.');
  const [busy, setBusy] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('');

  const clearSession = useCallback(() => {
    sessionStorage.removeItem(TOKEN_KEY); setToken(null); setUser(null); setTasks([]); setMeta(null);
  }, []);

  const run = useCallback(async (operation: () => Promise<void>) => {
    setBusy(true);
    try { await operation(); }
    catch (error: unknown) {
      if (error instanceof ApiHttpError && error.status === 401) clearSession();
      setMessage(messageFrom(error));
    } finally { setBusy(false); }
  }, [clearSession]);

  const loadTasks = useCallback(async (accessToken: string, selectedQuery: TaskListQuery) => {
    const response = await listTasks(selectedQuery, accessToken);
    setTasks(response.data); setMeta(response.meta);
    setMessage(`Se muestran ${response.data.length} de ${response.meta.total} tareas.`);
  }, []);

  useEffect(() => {
    if (!token) return;
    void run(async () => {
      const me = await getMe(token); setUser(me.data.user); await loadTasks(token, INITIAL_QUERY);
    });
  }, [token, loadTasks, run]);

  const saveToken = (accessToken: string) => { sessionStorage.setItem(TOKEN_KEY, accessToken); setToken(accessToken); };

  const handleAuth = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await run(async () => {
      if (authMode === 'register') await register(name.trim(), email, password);
      const response = await login(email, password);
      saveToken(response.data.accessToken); setPassword('');
      setMessage(authMode === 'register' ? 'Cuenta creada y sesión iniciada.' : 'Sesión iniciada correctamente.');
    });
  };

  const refresh = async (selectedQuery = query) => { if (token) await run(() => loadTasks(token, selectedQuery)); };
  const handleCreate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); const normalized = title.trim(); if (!token || !normalized) return;
    await run(async () => { await createTask({ title: normalized }, token); const first = { ...query, page: 1 }; setQuery(first); await loadTasks(token, first); setTitle(''); setMessage('La tarea se creó correctamente.'); });
  };
  const rename = async (task: Task, nextTitle: string) => { if (!token) return; await run(async () => { await updateTask(task.id, { title: nextTitle }, token); await loadTasks(token, query); setMessage('Título actualizado.'); }); };
  const toggle = async (task: Task) => { if (!token) return; await run(async () => { await updateTask(task.id, { status: task.status === 'pending' ? 'completed' : 'pending' }, token); await loadTasks(token, query); setMessage('Estado actualizado.'); }); };
  const remove = async (task: Task) => { if (!token || !window.confirm(`¿Eliminar la tarea “${task.title}”?`)) return; await run(async () => { await deleteTask(task.id, token); await loadTasks(token, query); setMessage('Tarea eliminada.'); }); };
  const changeQuery = (patch: Partial<TaskListQuery>) => setQuery((current) => ({ ...current, page: 1, ...patch }));

  return <main className="page-shell"><header className="page-header"><div><p className="eyebrow">EC3 F3 A12</p><h1>Task API Client</h1><p>Cliente CRUD integrado con la API de producción.</p></div>{user && <button onClick={() => { clearSession(); setMessage('Sesión cerrada.'); }}>Cerrar sesión</button>}</header>
    {!token ? <section className="panel auth-panel"><div className="tab-list"><button className={authMode === 'login' ? 'active' : 'secondary'} onClick={() => setAuthMode('login')}>Iniciar sesión</button><button className={authMode === 'register' ? 'active' : 'secondary'} onClick={() => setAuthMode('register')}>Crear cuenta</button></div><h2>{authMode === 'login' ? 'Acceso' : 'Registro'}</h2><form onSubmit={(event) => void handleAuth(event)}>{authMode === 'register' && <><label htmlFor="name">Nombre</label><input id="name" value={name} onChange={(event) => setName(event.target.value)} required /></>}<label htmlFor="email">Correo electrónico</label><input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /><label htmlFor="password">Contraseña</label><input id="password" type="password" minLength={15} value={password} onChange={(event) => setPassword(event.target.value)} required /><button disabled={busy}>{busy ? 'Procesando...' : authMode === 'login' ? 'Ingresar' : 'Registrarme'}</button></form></section> : <section aria-busy={busy}>
      <article className="panel identity-panel"><div><h2>{user ? `Hola, ${user.name}` : 'Validando tu sesión...'}</h2>{user && <p>{user.email} · rol <strong>{user.role}</strong></p>}</div><button className="secondary" onClick={() => void refresh()} disabled={busy}>Actualizar</button></article>
      <article className="panel"><h2>Gestionar tareas</h2><form className="inline-form" onSubmit={(event) => void handleCreate(event)}><div className="grow-field"><label htmlFor="new-title">Nueva tarea</label><input id="new-title" value={title} onChange={(event) => setTitle(event.target.value)} maxLength={120} required /></div><button disabled={busy}>Crear</button></form><hr />
        <form className="filter-grid" onSubmit={(event) => { event.preventDefault(); void refresh(); }}><div><label htmlFor="search">Buscar</label><input id="search" value={query.search} onChange={(event) => changeQuery({ search: event.target.value })} maxLength={80} /></div><div><label htmlFor="status">Estado</label><select id="status" value={query.status} onChange={(event) => changeQuery({ status: event.target.value as TaskListQuery['status'] })}><option value="">Todos</option><option value="pending">Pendientes</option><option value="completed">Completadas</option></select></div><div><label htmlFor="sortBy">Ordenar</label><select id="sortBy" value={query.sortBy} onChange={(event) => changeQuery({ sortBy: event.target.value as TaskListQuery['sortBy'] })}><option value="createdAt">Creación</option><option value="updatedAt">Actualización</option><option value="title">Título</option><option value="status">Estado</option></select></div><div><label htmlFor="order">Dirección</label><select id="order" value={query.order} onChange={(event) => changeQuery({ order: event.target.value as TaskListQuery['order'] })}><option value="asc">Ascendente</option><option value="desc">Descendente</option></select></div><button disabled={busy}>Aplicar</button></form>
        {tasks.length === 0 ? <p>No hay tareas que coincidan.</p> : <ul className="task-list">{tasks.map((task) => <li className="task-card" key={task.id}><div className="task-title-field"><label htmlFor={`task-${task.id}`}>Título</label><input id={`task-${task.id}`} defaultValue={task.title} onBlur={(event) => { const next = event.target.value.trim(); if (next && next !== task.title) void rename(task, next); }} maxLength={120} /></div><span className={`badge ${task.status}`}>{task.status}</span><div className="task-actions"><button className="secondary" type="button" disabled={busy} onClick={() => void toggle(task)}>{task.status === 'pending' ? 'Completar' : 'Reabrir'}</button>{user?.role === 'admin' && <button className="danger" type="button" disabled={busy} onClick={() => void remove(task)}>Eliminar</button>}</div></li>)}</ul>}
        {meta && <nav className="pagination"><button className="secondary" disabled={busy || !meta.hasPreviousPage} onClick={() => { const next = { ...query, page: meta.page - 1 }; setQuery(next); void refresh(next); }}>Anterior</button><span>Página {meta.page} de {Math.max(meta.totalPages, 1)}</span><button className="secondary" disabled={busy || !meta.hasNextPage} onClick={() => { const next = { ...query, page: meta.page + 1 }; setQuery(next); void refresh(next); }}>Siguiente</button></nav>}
      </article></section>}<p className="status-message" role="status" aria-live="polite">{message}</p></main>;
}

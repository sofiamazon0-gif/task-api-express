import { afterEach, describe, expect, it, vi } from 'vitest';
import { ApiHttpError, apiRequest } from '../src/api.js';
import { deleteTask, listTasks } from '../src/task-api.js';
import type { TaskListQuery, TaskListResponse } from '../src/types.js';

const query: TaskListQuery = { page: 2, limit: 5, status: 'pending', search: 'documentar', sortBy: 'createdAt', order: 'desc' };
const listResponse: TaskListResponse = { data: [], meta: { page: 2, limit: 5, total: 0, totalPages: 0, hasNextPage: false, hasPreviousPage: false } };

afterEach(() => vi.unstubAllGlobals());

describe('cliente HTTP de tareas', () => {
  it('construye la consulta y envía el token Bearer', async () => {
    const fetchMock = vi.fn().mockResolvedValueOnce(new Response(JSON.stringify(listResponse), { status: 200, headers: { 'Content-Type': 'application/json' } }));
    vi.stubGlobal('fetch', fetchMock);
    await expect(listTasks(query, 'token-de-prueba')).resolves.toEqual(listResponse);
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toContain('/api/tasks?page=2&limit=5');
    expect(url).toContain('status=pending');
    expect(url).toContain('search=documentar');
    expect(new Headers(init.headers).get('Authorization')).toBe('Bearer token-de-prueba');
  });

  it('acepta una eliminación 204 sin analizar JSON', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValueOnce(new Response(null, { status: 204 })));
    await expect(deleteTask('67112bfe47963b2be12c43b1', 'token')).resolves.toBeUndefined();
  });

  it('convierte el contrato de error', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValueOnce(new Response(JSON.stringify({ error: { code: 'FORBIDDEN', message: 'No tienes permisos.', requestId: 'req-123' } }), { status: 403, headers: { 'Content-Type': 'application/json' } })));
    await expect(apiRequest('/api/tasks/id', { method: 'DELETE' }, 'token')).rejects.toMatchObject<ApiHttpError>({ status: 403, code: 'FORBIDDEN', requestId: 'req-123' });
  });
});

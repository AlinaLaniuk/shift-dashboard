import type { ShiftData, UpdateShiftRequest } from '@apiTypes/shift';
import { http, HttpResponse } from 'msw';

export const mockHandlers = [
  http.get('/shift', () => {
    try {
      const mock = localStorage.getItem('shift');
      if (!mock) throw new Error('No data in LS');

      const data: ShiftData = JSON.parse(mock);
      return HttpResponse.json(data);
    } catch (err) {
      console.error('MSW error', err);
      return HttpResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
  }),

  http.patch('/shift', async ({ request }) => {
    try {
      const body = (await request.json()) as UpdateShiftRequest;
      const { id, comment } = body;
      const mock = localStorage.getItem('shift');
      if (!mock) throw new Error('No data in LS');
      const data: ShiftData = JSON.parse(mock);
      const event = data.events.find((event) => event.id === id);
      if (event) {
        event.comment = comment;
      }

      localStorage.setItem('shift', JSON.stringify(data));

      return HttpResponse.json(data);
    } catch (err) {
      console.error('MSW error', err);
      return HttpResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
  }),
];

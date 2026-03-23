import { http, HttpResponse } from 'msw';

export const mockHandlers = [
  http.get('/shift', () => {
    try {
      const mock = localStorage.getItem('shift');
      if (!mock) throw new Error('No data in LS');

      const data = JSON.parse(mock);
      return HttpResponse.json(data);
    } catch (err) {
      console.error('MSW error', err);
      return HttpResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
  }),

  http.patch('/shift', async ({ request }) => {
    const { id, comment } = await request.json();

    const shiftData = JSON.parse(localStorage.getItem('shift') || JSON.stringify(shiftMock));

    const event = shiftData.events.find((e: any) => e.id === id);
    if (event) {
      event.comment = comment;
    }

    localStorage.setItem('shift', JSON.stringify(shiftData));

    return HttpResponse.json(event);
  }),
];

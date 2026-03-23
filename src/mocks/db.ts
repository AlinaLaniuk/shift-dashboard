import { shiftMock } from "./mocks";

export function initMock() {
  const mock = localStorage.getItem('shift');
  if (!mock) {
    localStorage.setItem('shift', JSON.stringify(shiftMock));
  }
}

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export const BACK_URL = 'http://localhost:4000';

export const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const fixPromise = (res) => (
  res.ok ? res.json()
    : Promise.reject(`Произошла ошибка ${res.status}: ${res.statusText}`)
);

export const payments = (CardNumber, ExpDate, Cvv, Amount) => fetch(`${BACK_URL}/payments`, {
  method: 'POST',
  headers,
  body: JSON.stringify({
    CardNumber, ExpDate, Cvv, Amount
  }),
}).then((res) => fixPromise(res));
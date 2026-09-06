import { createError, defineEventHandler, readBody } from 'h3';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const response = await fetch('https://stg-service-satu.telkomuniversity.ac.id/framework-console/api/mockapi/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw createError({
      statusCode: response.status,
      statusMessage: response.statusText,
      data: errorData
    });
  }

  return await response.json();
});

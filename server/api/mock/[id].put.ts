import { createError, defineEventHandler, getRouterParam, readBody } from 'h3';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const body = await readBody(event);
  const response = await fetch(`https://stg-service-satu.telkomuniversity.ac.id/framework-console/api/mockapi/update/${id}`, {
    method: 'PUT',
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

import { createError, defineEventHandler, getRouterParam } from 'h3';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const response = await fetch(`https://stg-service-satu.telkomuniversity.ac.id/framework-console/api/mockapi/delete/${id}`, {
    method: 'DELETE'
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

/**
 * Envoie une requête HTTP
 */

async function apiRequest(
  endpoint,

  method = "GET",

  data = null,

  token = null,
) {
  const options = {
    method,

    headers: {
      "Content-Type": "application/json",
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  if (token) {
    options.headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(
    CONFIG.API_BASE_URL + endpoint,

    options,
  );

  const result = await response.json();

  return {
    ok: response.ok,

    status: response.status,

    data: result
  };
}

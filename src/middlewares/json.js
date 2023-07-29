// Middlewares são funções que intermediam uma requisição.
// algo como um Proxy e são facilmente reconhecidos por usar req e res.

export async function json(req, res) {
  const buffers = []

  for await (const chunk of req) {
    buffers.push(chunk);
  }

  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString());
  } catch (error) {
    req.body = null;
  }

  res.setHeader('Content-type', 'application/json');
}
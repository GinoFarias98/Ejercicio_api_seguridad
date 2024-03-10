const errorHaandler = (err, req, res, next) => {
  //verifica si el error tien un codigo asingado y de no ser asi le asigna el error predeterminado(500)
  const statusCode = err.statusCode || 500;

  const errorResponse = {
    //se construye un objeto de respuesta de error
    error: {
      message: err.message || "Error en el servidor",
      code: err.code || "Internal error",
    },
  };
  res.status(statusCode).json({ errorResponse });
};

module.exports = errorHaandler;

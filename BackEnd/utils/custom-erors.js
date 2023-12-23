// UnauthorizedError hata sınıfı
function UnauthorizedError(message) {
    this.name = 'UnauthorizedError';
    this.statusCode = 401;
    this.message = message;
}

// NotFoundError hata sınıfı
function NotFoundError(message) {
    this.name = 'NotFoundError';
    this.statusCode = 404;
    this.message = message;
}

// Hata sınıflarını export et
module.exports = {
    UnauthorizedError,
    NotFoundError
};

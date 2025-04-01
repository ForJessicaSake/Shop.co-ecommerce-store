export class ErrorBoundary extends Error {
  constructor(message, status = 500) {
    super(message, status);
    this.message = message;
    this.status = status;
  }
}

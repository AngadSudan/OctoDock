class ApiResponse {
  status: number;
  message: string;
  data: any;
  error: any;
  success: boolean;

  /**
   * Creates an instance of ApiResponse.
   * @param {number} status - The HTTP status code.
   * @param {string} message - The response message.
   * @param {any} [data=null] - Optional data to include in the response.
   */
  constructor(status: number, message: string, data: any = null) {
    this.status = status;
    this.message = message;
    if (data == null) {
      this.success = false;
    } else {
      this.data = data;
      this.success = true;
    }
  }
}

export default ApiResponse;

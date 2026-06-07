import { IResponse } from "./response.interface";

class Response<T = any> implements IResponse<T> {
	public success: boolean;
	public message: string;
	public data?: T;
	constructor(success: boolean, message: string, data?: T) {
		this.success = success;
		this.message = message;
		this.data = data;
	}
}

export class SuccessResponse<T = any> extends Response<T> {
	constructor(data?: T) {
		super(true, "ok", data);
	}
}

export class ErrorResponse extends Response {
	constructor(message: string) {
		super(false, message);
	}
}

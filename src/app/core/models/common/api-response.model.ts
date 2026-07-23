export interface ApiResponse<T> {

  status: {

    status: number;

    message: string;

  };

  data: T;

}
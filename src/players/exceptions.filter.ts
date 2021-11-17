import { Catch, ExceptionFilter } from "@nestjs/common";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, response: any) {
    console.log(exception);
    response.status(500).json({
      statusCode: 500,
      message: "Internal Server Error",
      error: exception.message,
    });
  }
}
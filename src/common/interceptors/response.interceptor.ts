/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Prisma } from '@prisma/client';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      // ✅ Respuesta exitosa
      map((data) => ({
        data,
        message: 'éxito',
        status: HttpStatus.OK,
      })),

      // ❌ Manejo de errores global
      catchError((err) => {
        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Ocurrió un error inesperado, inténtalo nuevamente.';

        // 🟢 Si es HttpException lanzada desde el servicio/controlador
        if (err instanceof HttpException) {
          status = err.getStatus();
          const response = err.getResponse();

          if (typeof response === 'string') {
            message = response;
          } else if (typeof response === 'object') {
            message = (response as any).message || message;
          }
        }

        // 🔵 Errores conocidos de Prisma
        else if (err instanceof Prisma.PrismaClientKnownRequestError) {
          switch (err.code) {
            case 'P2002': // Unique constraint
              status = HttpStatus.CONFLICT;
              message =
                'Ya existe un registro con este valor único. Verifica los datos enviados.';
              break;
            case 'P2003': // Foreign key constraint
              status = HttpStatus.BAD_REQUEST;
              message =
                'Alguno de los IDs relacionados no existe. Revisa tus datos.';
              break;
            case 'P2025': // Registro no encontrado
              status = HttpStatus.NOT_FOUND;
              message = 'El registro solicitado no existe o ya fue eliminado.';
              break;
            default:
              message =
                'Error en la base de datos. Contacta con soporte si persiste.';
          }
        }

        // 🟠 Errores de validación de Prisma (datos enviados mal)
        else if (err instanceof Prisma.PrismaClientValidationError) {
          status = HttpStatus.BAD_REQUEST;
          message =
            'Los datos enviados no cumplen con los requisitos esperados.';
        }

        // 🔴 Otros errores genéricos
        else if (err instanceof Error) {
          message = err.message || message;
        }

        // 🎯 Siempre devolver en el mismo formato
        return throwError(
          () =>
            new HttpException(
              {
                data: null,
                message,
                status,
              },
              status,
            ),
        );
      }),
    );
  }
}

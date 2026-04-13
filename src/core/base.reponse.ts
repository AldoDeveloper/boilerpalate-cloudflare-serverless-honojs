import { HttpStatusMap } from "./http.error.code";


export type TBaseResponse = {
  success ?: boolean,
  message ?: string;
  data : Record<string, any> | Record<string, any>[] | null | string;
}

export type TErrorResponse = Omit<TBaseResponse, 'data'> & {
    errors?: Array<any>
}

export const baseResponse  = (option: TBaseResponse) : TBaseResponse => {

    return{
        success: option.success ?? true,
        message: option.message ?? HttpStatusMap[200],
        data: option.data
    }
}

export const baseErrorResponse = (option: Omit<TErrorResponse, 'success'>) : TErrorResponse => {
    
    return {
        success: false,
        message: option.message ?? HttpStatusMap[400],
        errors: option.errors
    }
}
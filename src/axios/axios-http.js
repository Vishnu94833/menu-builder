import http from './axios-interceptor';

export function getRecords(url){
    return http.get(url).then(response=>{
        if (response.statusText === "OK") {
            return response.data.records
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    }
    , error=>{
        var errmess = new Error(error.message);
        throw errmess;
    }
    ).catch(error=>{
        return error.message;
    }
    )
}

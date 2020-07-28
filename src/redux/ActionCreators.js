import * as ActionTypes from './ActionTypes';
import http from '../axios/axios-interceptor';

export const addComment = (comment)=>({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});
export const postComment = (dishId,rating,author,comment)=>(dispatch)=>{

    const newComment = {
        "dishId__c": dishId,
        "rating__c": rating,
        "author__c": author,
        "comment__c": comment,
        "date__c": new Date().toISOString()
    };
    return http.post('/sobjects/Comment__c', newComment).then(response=>{
        if (response.statusText === "Created") {
            dispatch(addComment(response))
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    }
    , error=>{
        throw error;
    }
    ).catch(error=>{
        console.log('post comments', error.message);
        alert('Your comment could not be posted\nError: ' + error.message);
    }
    );
}
;
export const fetchDishes = ()=>(dispatch)=>{
    dispatch(dishesLoading(true));
    return http.get('/query/?q=SELECT+Id,id__c,Name__c,image__c,category__c,label__c,price__c,featured__c,description__c+from+dishes__c').then(response=>{
        if (response.statusText === "OK") {
            let list = [];
            response.data.records.forEach(element=>{
                list.push({
                  "Id":element.Id,
                    "id": element.id__c,
                    "name": element.Name__c,
                    "image": element.image__c,
                    "category": element.category__c,
                    "label": element.label__c,
                    "price": element.price__c,
                    "featured": element.featured__c,
                    "description": element.description__c
                })
            }
            );
            dispatch(addDishes(list))
            return list;
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
        dispatch(dishesFailed(error.message))
    }
    );
}

export const dishesLoading = ()=>({
    type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errmess)=>({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess
});

export const addDishes = (dishes)=>({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});

export const fetchComments = ()=>(dispatch)=>{
    return http.get('/query/?q=SELECT+id__c,dishId__c,rating__c,author__c,comment__c,date__c+from+Comment__c').then(response=>{
        if (response.statusText === "OK") {
            let list = [];
            response.data.records.forEach(element=>{
                list.push({
                    "id": element.id__c,
                    "dishId": element.dishId__c,
                    "rating": element.rating__c,
                    "author": element.author__c,
                    "comment": element.comment__c,
                    "date": element.date__c
                })
            }
            );
            dispatch(addComments(list))
            return list;
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
    ).catch(error=>dispatch(commentsFailed(error.message)));
}
;

export const commentsFailed = (errmess)=>({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments)=>({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const fetchPromos = ()=>(dispatch)=>{
    dispatch(promosLoading(true));
    return http.get('/query/?q=SELECT+id__c,Name__c,Label__c,Price__c,Image__c,Featured__c,Description__c+from+Promotion__c').then(response=>{
        if (response.statusText === "OK") {
            let list = [];
            response.data.records.forEach(element=>{
                list.push({
                    "id": element.id__c,
                    "name": element.Name__c,
                    "image": element.Image__c,
                    "label": element.Label__c,
                    "price": element.Price__c,
                    "featured": element.Featured__c,
                    "description": element.Description__c
                })
            }
            );
            dispatch(addPromos(list))
            return list;
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
    ).catch(error=>dispatch(promosFailed(error.message)));
}

export const promosLoading = ()=>({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess)=>({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
});

export const addPromos = (promos)=>({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});

export const fetchLeaders = ()=>(dispatch)=>{
    dispatch(leadersLoading(true));
    return http.get('/query/?q=SELECT+id__c,Name__c,Image__c,Designation__c,Abbr__c,Featured__c,Description__c+from+Leader__c').then(response=>{
        if (response.statusText === "OK") {
            let list = [];
            response.data.records.forEach(element=>{
                list.push({
                    "id": element.id__c,
                    "name": element.Name__c,
                    "image": element.Image__c,
                    "designation": element.Designation__c,
                    "abbr": element.Abbr__c,
                    "featured": element.Featured__c,
                    "description": element.Description__c
                })
            }
            );
            dispatch(addleaders(list))
            return list;
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
        dispatch(leadersFailed(error.message))
    }
    );
}

export const leadersLoading = ()=>({
    type: ActionTypes.LEADERS_LOADING
});

export const leadersFailed = (errmess)=>({
    type: ActionTypes.LEADERS_FAILED,
    payload: errmess
});

export const addleaders = (promos)=>({
    type: ActionTypes.ADD_LEADERS,
    payload: promos
});
export const addFeedback = (feedback)=>({
    type: ActionTypes.ADD_FEEDBACK,
    payload: feedback
});
export const feedbackFailed = (errmess)=>({
    type: ActionTypes.FEEDBACK_FAILED,
    payload: errmess
});
export const postFeedback = (firstname,lastname,telnum,email,agree,contactType,message)=>(dispatch)=>{
    const feedBackBody = `
    Firstname : ${firstname}
    Lastname : ${lastname}
    Tel No : ${telnum}
    Email : ${email}
    Agree : ${agree}
    Contact Type : ${contactType}
    Message : ${message}

    Regards,
    ${firstname}
    `

    const emailTemplate = {
        "inputs": [{
            "emailAddresses": "vishnukuppan1796@gmail.com",
            "emailSubject": message,
            "emailBody": feedBackBody,
            "senderAddress": email
        }]
    }
    return http.post('/actions/standard/emailSimple', emailTemplate).then(response=>{
         
        if (response.statusText === "OK") {
          dispatch(addFeedback({message:"Feedback Sent Successfully",isTrue:true,class:"success"}))
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    }
    , error=>{
        throw error;
    }
    ).catch(error=>{
         ;
        dispatch(feedbackFailed({message:error.message,isTrue:true,class:"danger"}));
        // console.log('post Feedback', error.message);
        // alert('Your feedback could not be posted\nError: ' + error.message);
    }
    );
}

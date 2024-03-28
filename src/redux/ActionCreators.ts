import * as ActionTypes from "./ActionTypes";
import http from "../axios/axios-interceptor";
import { getRecords } from "../axios/axios-http";
import { DataService } from "./service/dataService";
import { Dish } from "../core/model/dish.model";

export const addComment = (comment: any) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: comment,
});
export const postComment =
  (dishId: any, rating: any, author: any, comment: any) =>
  async (dispatch: any) => {
    const newComment = {
      dishId__c: dishId,
      rating__c: rating,
      author__c: author,
      comment__c: comment,
      date__c: new Date().toISOString(),
    };
    const response = await new DataService().postComment(newComment);
    if ((<any>response).statusText === "Created") {
      dispatch(addComment(response));
      return response;
    }
  };

export const fetchDishes = () => async (dispatch: any) => {
  dispatch(dishesLoading());
  try {
    dispatch(addDishes(await new DataService().fetchDishes() as Dish[]));
  } catch (error: any) {
    dispatch(dishesFailed(error.message));
  }
};

export const dishesLoading = () => ({
  type: ActionTypes.DISHES_LOADING,
});

export const dishesFailed = (errmess: any) => ({
  type: ActionTypes.DISHES_FAILED,
  payload: errmess,
});

export const addDishes = (dishes: Dish[]) => ({
  type: ActionTypes.ADD_DISHES,
  payload: dishes,
});

export const fetchComments = () => (dispatch: any) => {
  getRecords(
    "/query/?q=SELECT+id__c,dishId__c,rating__c,author__c,comment__c,date__c+from+Comment__c"
  )
    .then((res) => {
      let list: any = [];
      res.forEach((element: any) => {
        list.push({
          id: element.id__c,
          dishId: element.dishId__c,
          rating: element.rating__c,
          author: element.author__c,
          comment: element.comment__c,
          date: element.date__c,
        });
      });
      dispatch(addComments(list));
    })
    .catch((err) => {
      dispatch(commentsFailed(err.message));
    });
};

export const commentsFailed = (errmess: any) => ({
  type: ActionTypes.COMMENTS_FAILED,
  payload: errmess,
});

export const addComments = (comments: any) => ({
  type: ActionTypes.ADD_COMMENTS,
  payload: comments,
});

export const fetchPromos = () => (dispatch: any) => {
  dispatch(promosLoading());
  getRecords(
    "/query/?q=SELECT+id__c,Name__c,Label__c,Price__c,Image__c,Featured__c,Description__c+from+Promotion__c"
  )
    .then((res) => {
      let list: any = [];
      res.forEach((element: any) => {
        list.push({
          id: element.id__c,
          name: element.Name__c,
          image: element.Image__c,
          label: element.Label__c,
          price: element.Price__c,
          featured: element.Featured__c,
          description: element.Description__c,
        });
      });
      dispatch(addPromos(list));
    })
    .catch((err) => {
      dispatch(promosFailed(err.message));
    });
};

export const promosLoading = () => ({
  type: ActionTypes.PROMOS_LOADING,
});

export const promosFailed = (errmess: any) => ({
  type: ActionTypes.PROMOS_FAILED,
  payload: errmess,
});

export const addPromos = (promos: any) => ({
  type: ActionTypes.ADD_PROMOS,
  payload: promos,
});

export const fetchLeaders = () => (dispatch: any) => {
  dispatch(leadersLoading());
  getRecords(
    "/query/?q=SELECT+id__c,Name__c,Image__c,Designation__c,Abbr__c,Featured__c,Description__c+from+Leader__c"
  )
    .then((res) => {
      let list: any = [];
      res.forEach((element: any) => {
        list.push({
          id: element.id__c,
          name: element.Name__c,
          image: element.Image__c,
          designation: element.Designation__c,
          abbr: element.Abbr__c,
          featured: element.Featured__c,
          description: element.Description__c,
        });
      });
      dispatch(addleaders(list));
    })
    .catch((err) => {
      dispatch(leadersFailed(err.message));
    });
};

export const leadersLoading = () => ({
  type: ActionTypes.LEADERS_LOADING,
});

export const leadersFailed = (errmess: any) => ({
  type: ActionTypes.LEADERS_FAILED,
  payload: errmess,
});

export const addleaders = (promos: any) => ({
  type: ActionTypes.ADD_LEADERS,
  payload: promos,
});
export const addFeedback = (feedback: any) => ({
  type: ActionTypes.ADD_FEEDBACK,
  payload: feedback,
});
export const feedbackFailed = (errmess: any) => ({
  type: ActionTypes.FEEDBACK_FAILED,
  payload: errmess,
});
export const postFeedback =
  (
    firstname: any,
    lastname: any,
    telnum: any,
    email: any,
    agree: any,
    contactType: any,
    message: any
  ) =>
  (dispatch: any) => {
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
    `;

    const emailTemplate = {
      inputs: [
        {
          emailAddresses: "vishnukuppan1796@gmail.com",
          emailSubject: message,
          emailBody: feedBackBody,
          senderAddress: email,
        },
      ],
    };
    return http
      .post("/actions/standard/emailSimple", emailTemplate)
      .then(
        (response) => {
          if (response.statusText === "OK") {
            dispatch(
              addFeedback({
                message: "Feedback Sent Successfully",
                isTrue: true,
                class: "success",
              })
            );
            return response;
          } else {
            var error = new Error(
              "Error " + response.status + ": " + response.statusText
            );
            throw error;
          }
        },
        (error) => {
          throw error;
        }
      )
      .catch((error) => {
        dispatch(
          feedbackFailed({
            message: error.message,
            isTrue: true,
            class: "danger",
          })
        );
      });
  };

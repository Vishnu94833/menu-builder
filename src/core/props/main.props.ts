export interface MainProps {
  dishes: any;
  promotions: any;
  leaders: any;
  comments: any;

  feedBack: any;
  postComment: any;
  postFeedback: any;
  resetFeedbackForm: any;

  fetchDishes: Function;
  fetchComments: Function;
  fetchPromos: Function;
  fetchLeaders: Function;
}

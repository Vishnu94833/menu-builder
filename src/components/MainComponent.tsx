import { Component } from "react";
import { connect } from "react-redux";
import { Route, Routes } from "react-router";
import { MainProps } from "../core/props/main.props";
import {
  fetchComments,
  fetchDishes,
  fetchLeaders,
  fetchPromos,
  postComment,
  postFeedback,
} from "../redux/ActionCreators";
import { LEADERS } from "../shared/leaders";
import About from "./AboutComponent";
import Contact from "./ContactComponent";
import DishDetail from "./DishdetailComponent";
import Footer from "./FooterComponent";
import Header from "./HeaderComponent";
import Home from "./HomeComponent";
import Menu from "./MenuComponent";

const mapStateToProps = (state: any) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
    feedBack: state.feedBack,
  };
};
const mapDispatchToProps = (dispatch: any) => ({
  postComment: (dishId: any, rating: any, author: any, comment: any) =>
    dispatch(postComment(dishId, rating, author, comment)),
  postFeedback: (
    firstname: any,
    lastname: any,
    telnum: any,
    email: any,
    agree: any,
    contactType: any,
    message: any
  ) =>
    dispatch(
      postFeedback(
        firstname,
        lastname,
        telnum,
        email,
        agree,
        contactType,
        message
      )
    ),
  fetchDishes: () => {
    dispatch(fetchDishes());
  },
  resetFeedbackForm: (actions: any) => {
    dispatch(actions.reset("feedback"));
  },
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
});
class Main extends Component<MainProps> {
  constructor(props: any) {
    super(props);
    // this.state = {
    //   dishes: DISHES,
    //   comments: COMMENTS,
    //   promotions: PROMOTIONS,
    //   leaders: LEADERS,
    // };
  }
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }

  render() {
    const HomePage = () => {
      return (
        <Home
          dish={
            this.props.dishes.dishes.filter((dish: any) => {
              return dish.featured;
            })[0]
          }
          dishesLoading={this.props.dishes.isLoading}
          dishErrMess={this.props.dishes.errMess}
          promotion={
            this.props.promotions.promotions.filter(
              (promo: any) => promo.featured
            )[0]
          }
          promoLoading={this.props.promotions.isLoading}
          promoErrMess={this.props.promotions.errMess}
          leader={
            this.props.leaders.leaders.filter((leader: any) => {
              return leader.featured;
            })[0]
          }
          leadersLoading={this.props.leaders.isLoading}
          leaderErrMess={this.props.leaders.errMess}
        />
      );
    };

    const DishWithId = ({ match }: any) => {
      return (
        <DishDetail
          dish={
            this.props.dishes.dishes.filter((dish: any) => {
              return dish.id === match.params.dishId;
            })[0]
          }
          isLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.errMess}
          comments={this.props.comments.comments.filter(
            (comment: any) =>
              comment.dishId === parseInt(match.params.dishId, 10)
          )}
          postComment={this.props.postComment}
        />
      );
    };

    return (
      <>
        <Header />
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/aboutus" element={<About leaders={LEADERS} />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/menu/:dishId" element={<DishWithId />} />
          <Route
            path="/contactus"
            element={
              <Contact
                postFeedback={this.props.postFeedback}
                success={this.props.feedBack.feedback.message}
                isTrue={this.props.feedBack.feedback.isTrue}
                color={this.props.feedBack.feedback.class}
              />
            }
          />
        </Routes>
        <Footer />
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);

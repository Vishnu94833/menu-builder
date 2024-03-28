import React, { Component } from "react";
// import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Home from "./HomeComponent";
import { COMMENTS } from "../shared/comments";
import { DISHES } from "../shared/dishes";
import { LEADERS } from "../shared/leaders";
import { PROMOTIONS } from "../shared/promotions";
import About from "./AboutComponent";
import Menu from "./MenuComponent";
import { Route, Routes } from "react-router";

// import Menu from "./MenuComponent";
// import Footer from "./FooterComponent";
// import { DISHES } from "../shared/dishes";
// import { COMMENTS } from "../shared/comments";
// import { PROMOTIONS } from "../shared/promotions";
// import { LEADERS } from "../shared/leaders";
// import Home from "./HomeComponent";
// import Header from "./HeaderComponent";
// import About from "./AboutComponent";
// import DishDetail from "./DishdetailComponent";
// import Contact from "./ContactComponent";
// import { postComment, postFeedback, fetchLeaders, fetchDishes, fetchComments, fetchPromos } from '../redux/ActionCreators';
// import { TransitionGroup, CSSTransition } from 'react-transition-group';

// const mapStateToProps = state => {
//   return {
//     dishes: state.dishes,
//     comments: state.comments,
//     promotions: state.promotions,
//     leaders: state.leaders,
//     feedBack : state.feedBack
//   }
// }
// const mapDispatchToProps = dispatch => ({
//   postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
//   postFeedback: (firstname, lastname, telnum, email,agree,contactType,message) => dispatch(postFeedback(firstname, lastname, telnum, email,agree,contactType,message)),
//   fetchDishes: () => { dispatch(fetchDishes())},
//   // resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
//   fetchComments: () => dispatch(fetchComments()),
//   fetchPromos: () => dispatch(fetchPromos()),
//   fetchLeaders: () => dispatch(fetchLeaders())
// });
class Main extends Component {
  constructor(props: {}) {
    super(props);
    // this.state = {
    //   dishes: DISHES,
    //   comments: COMMENTS,
    //   promotions: PROMOTIONS,
    //   leaders: LEADERS,
    // };
  }
  componentDidMount() {
    // this.props.fetchDishes();
    // this.props.fetchComments();
    // this.props.fetchPromos();
    // this.props.fetchLeaders();
  }

  render() {
    const HomePage = () => {
      return (
        <Home
          // dish={this.props.dishes.dishes.filter((dish) => {return dish.featured})[0]}
          dish={
            DISHES.filter((dish) => {
              return dish.featured;
            })[0]
          }
          // dishesLoading={this.props.dishes.isLoading}
          // dishErrMess={this.props.dishes.errMess}
          // promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}

          promotion={PROMOTIONS.filter((promo) => promo.featured)[0]}
          // promoLoading={this.props.promotions.isLoading}
          // promoErrMess={this.props.promotions.errMess}
          // leader={this.props.leaders.leaders.filter((leader) => {return leader.featured})[0]}

          leader={
            LEADERS.filter((leader) => {
              return leader.featured;
            })[0]
          }

          // leadersLoading={this.props.leaders.isLoading}
          // leaderErrMess={this.props.leaders.errMess}
        />
      );
    };

    const DishWithId = ({ match }:any) => {
      return (
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, eum natus rerum maxime facilis asperiores sapiente vel dolorum, ex ratione qui ad a quam libero deserunt error nobis earum illum.</p>
        // <DishDetail dish={this.props.dishes.dishes.filter((dish) => {return (dish.id === match.params.dishId)})[0]}
        // isLoading={this.props.dishes.isLoading}
        // errMess={this.props.dishes.errMess}
        // comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
        // commentsErrMess={this.props.comments.errMess}
        // postComment={this.props.postComment}
      // />
      );
    };

    return (
      <>
        <Header />
        {/* <TransitionGroup> */}
        {/* <CSSTransition key={this.props.location.key} classNames="page" timeout={300}> */}
        {/* <Switch location={this.props.location}>
                  <Route path='/home' component={HomePage} />
                  <Route exact path='/aboutus' component={() => <About leaders={this.props.leaders.leaders} />} />
                  <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
                  <Route path='/menu/:dishId' component={DishWithId} />
                  <Route exact path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} 
                  postFeedback={this.props.postFeedback} 
                  success={this.props.feedBack.feedback.message} 
                  isTrue={this.props.feedBack.feedback.isTrue}
                  color={this.props.feedBack.feedback.class}/>} />
                  <Redirect to="/home" />
              </Switch> */}
        {/* </CSSTransition> */}
        {/* </TransitionGroup> */}

        {/* TODO: Below should be moved to router confi */}
        {/* <HomePage/> */}
        {/* <About leaders={LEADERS} /> */}
        {/* <Menu/> */}
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path='/aboutus' element={<About leaders={LEADERS} />} />
          <Route path='/menu' element={<Menu />} />
          <Route path='/menu/:dishId' element={<DishWithId/>} />
          
        </Routes>
        <Footer />
      </>
    );
  }
}

export default Main; //connect(mapStateToProps, mapDispatchToProps)(Main);

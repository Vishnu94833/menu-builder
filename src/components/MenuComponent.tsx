import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Loading } from "./LoadingComponent";


class Menu extends Component {
  constructor(props:any) {
    super(props);

    this.state = {
      selectedDish: null,
    };
  }
  componentDidMount(){
  }

  onDishSelect(dish:any) {
    this.setState({ selectedDish: dish });
  }

  render() {
    function RenderMenuItem ({dish, onClick}:any) {
      return (
          <Card onClick={onClick}>
              <Link to={`/menu/${dish.id}`} >
                  <CardImg width="100%" src={dish.image} alt={dish.name} />
                  <CardImgOverlay>
                      <CardTitle>{dish.name}</CardTitle>
                  </CardImgOverlay>
              </Link>
          </Card>
      );
  }
    // const menu = this.props.dishes.dishes.map((dish:any) => {
    //   if (this.props.dishes.isLoading) {
    //     return(
    //         <div className="container">
    //             <div className="row">            
    //                 <Loading />
    //             </div>
    //         </div>
    //     );
    // }
    // else if (this.props.dishes.errMess) {
    //     return(
    //         <div className="container">
    //             <div className="row"> 
    //                 <div className="col-12">
    //                     <h4>{this.props.dishes.errMess}</h4>
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // }
    // else
    //   return (
    //     <div className="col-12 col-md-5 m-2" key={dish.id}>
    //      <RenderMenuItem dish={dish}></RenderMenuItem>
    //     </div>
    //   );
    // });

    return (
      <div className="container">
      <div className="row">
          <Breadcrumb>
              <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
              <BreadcrumbItem active>Menu</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
              <h3>Menu</h3>
              <hr />
          </div>                
      </div>
      <div className="row py-4">
          {/* {menu} */}
      </div>
  </div>
    );
  }
}

export default Menu;

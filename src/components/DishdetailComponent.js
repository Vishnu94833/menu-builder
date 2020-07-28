import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Label,
  Col,
} from "reactstrap";
import { Link } from "react-router-dom";
import { LocalForm, Control, Errors } from "react-redux-form";
import { Loading } from "./LoadingComponent";
import { FadeTransform, Fade, Stagger } from "react-animation-components";

function RenderComments({ comments, postComment, dishId }) {
  if (comments !== null) {
    return (
      <div className="col-md-7 col-12">
        <h4>Comments</h4>
        <Stagger in>
          {comments.map((comment) => {
            return (
              <Fade in>
                <Card body key={comment.id} className="my-2">
                  <CardTitle>{comment.comment}</CardTitle>
                  <CardText>
                    {comment.author},{" "}
                    {new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                    }).format(new Date(Date.parse(comment.date)))}</CardText>
                </Card>
              </Fade>
            );
          })}
        </Stagger>
        <CommentForm dishId={dishId} postComment={postComment} />
      </div>
    );
  } else if (comments === undefined) {
    return (
      <>
        <CommentForm dishId={dishId} postComment={postComment} />
      </>
    );
  } else {
    return <div></div>;
  }
}

function RenderDish({ dish }) {
  if (dish != null)
    return (
      <FadeTransform
        in
        transformProps={{
          exitTransform: "scale(0.5) translateY(-50%)",
        }}
      >
        <Card>
          <CardImg top src={dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      </FadeTransform>
    );
  else
    return (
      <div>
        <h1>Not Found</h1>
      </div>
    );
}
export default class DishDetail extends Component {
  render() {
    if (this.props.isLoading) {
      return(
          <div className="container">
              <div className="row">
                  <Loading />
              </div>
          </div>
      );
  }
  else if (this.props.errMess) {
      return(
          <div className="container">
              <div className="row">
                  <h4>{this.props.errMess}</h4>
              </div>
          </div>
      );
  }
  else if (this.props.dish != null) {
    return (
      <>
        <div className="container">
          <div className="row">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/">Home</Link>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <Link to="/menu">Menu</Link>
              </BreadcrumbItem>

              <BreadcrumbItem active>{JSON.parse(JSON.stringify(this.props.dish.name))}</BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
              <h3>{JSON.parse(JSON.stringify(this.props.dish.name))}</h3>
              <hr />
            </div>
          </div>
          <div className="container">
            <div className="row py-4">
              <div className="col-12 col-md-5 col-sm-12 col-xs-12 ">
                <RenderDish dish={this.props.dish} />
              </div>
              <RenderComments
                comments={this.props.comments}
                postComment={this.props.postComment}
                dishId={this.props.dish.id}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
  }
}

class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isNavOpen: false,
      isModalOpen: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(values) {
    this.props.postComment(
      this.props.dishId,
      values.rating,
      values.author,
      values.comment
    );
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }
  render() {
    const required = (val) => val && val.length;
    const maxLength = (len) => (val) => !val || val.length <= len;
    const minLength = (len) => (val) => val && val.length >= len;

    return (
      <>
        <Button outline onClick={this.toggleModal}>
          <span className="fa fa-sign-in fa-lg"></span> Submit Comment
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <Row className="form-group">
                <Label htmlFor="firstname" md={2}>
                  Rating
                </Label>
                <Col md={12}>
                  <Control.select
                    model=".rating"
                    className="form-control"
                    id=".rating"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </Control.select>
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="lastname" md={4}>
                  Author
                </Label>
                <Col md={12}>
                  <Control.text
                    model=".author"
                    id="author"
                    name="author"
                    placeholder="Author Name"
                    className="form-control"
                    validators={{
                      required,
                      minLength: minLength(3),
                      maxLength: maxLength(15),
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".author"
                    show="touched"
                    messages={{
                      required: "Required",
                      minLength: "Must be greater than 2 characters",
                      maxLength: "Must be 15 characters or less",
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="message" md={4}>
                  Comment
                </Label>
                <Col md={12}>
                  <Control.textarea
                    model=".comment"
                    id="comment"
                    name="comment"
                    rows="6"
                    className="form-control"
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Col>
                  <Button type="submit" color="primary">
                    Submit
                  </Button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </>
    );
    }
}

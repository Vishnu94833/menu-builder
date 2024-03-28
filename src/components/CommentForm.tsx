import { Component } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader
} from "reactstrap";
import { CommentProps } from "../core/props/comment.props";
import { CommentState } from "../core/state/comment.state";
// import { LocalForm, Control, Errors } from "react-redux-form";

class CommentForm extends Component<CommentProps, CommentState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      isNavOpen: false,
      isModalOpen: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(values:any) {
    console.log("Current State is: " + JSON.stringify(values));
    alert("Current State is: " + JSON.stringify(values));
    // event.preventDefault();
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }
  render() {
    const required = (val:any) => val && val.length;
    const maxLength = (len:any) => (val:any) => !val || val.length <= len;
    const minLength = (len:any) => (val:any) => val && val.length >= len;
    return (
      <>
        <Button outline onClick={this.toggleModal}>
          <span className="fa fa-sign-in fa-lg"></span> Submit Comment
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            {/* <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <Row className="form-group">
                <Label htmlFor="firstname" md={2}>
                  Rating
                </Label>
                <Col md={12}>
                  <Control.select model=".rating" className="form-control" id=".rating">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
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
                        required, minLength: minLength(3), maxLength: maxLength(15)
                    }}
                  />
                  <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
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
            </LocalForm> */}
          </ModalBody>
        </Modal>
      </>
    );
  }
}

export default CommentForm;

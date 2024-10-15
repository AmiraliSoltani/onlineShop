import React, { useState, useEffect, Fragment, useRef, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./../../../css/comment.css";
import { getStars } from "../../common/functionsOfProducts";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import APIProduct from "../../../services/api-product";
import loginContext from "../../contexts/loginContext";
import { debounce } from "lodash";
import { toast } from "react-toastify";


function Comment({ memberName, product }) {
  const [hoveredStar, setHoveredStar] = useState(0); // Track hovered star
const [clickedStar, setClickedStar] = useState(0); // Track clicked star
  const [finalAverage, setFinalAverage] = useState(0);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showWriteModal, setShowWriteModal] = useState(false);
  const [showSuccessfullModal, setShowSuccessfullModal] = useState(false);

  const [vote, setVote] = useState(["withoutVote", 0]);
  const [personalVote, setPersonalVote] = useState(0);
  const [picError, setPicError] = useState(false);
  const [finalStar, setFinalStar] = useState([]);
  const [max, SetMax] = useState();
  const [pics, setPics] = useState([]);
  const [submit, setSubmit] = useState(false);
  const { loginState, loginDispatch }  = useContext(loginContext);

  const percentRefs = useRef({});
  const progressRefs = useRef({});
  const writeReviewFlag = useRef(false); // Flag to prevent double dispatch

  const schema = z.object({
    title: z.string().min(2,"Your title should be at least 2 charecter"),
    body: z.string().min(10,"Your main review should be at least 10 charecter").max(250 , "Sorry! the maximum charecter is 250"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const openLogin = () => {
    setShowMessageModal(false);
    setShowLoginModal(true);
  };

  console.log("loginState",loginState)

  let login = loginState.authenticated; // Set this to false when user is not logged in

  const populate = () => {
    let comments = product.comments;
    let sum = 0;
    let numbers = comments.length;
    let excellent = 0,
      great = 0,
      good = 0,
      bad = 0,
      disaster = 0;
    if (comments !== undefined) {
      comments.forEach((c) => {
        sum += c.vote;
        if (c.vote == 5) excellent += 1;
        if (c.vote == 4) great += 1;
        if (c.vote == 3) good += 1;
        if (c.vote == 2) bad += 1;
        if (c.vote == 1) disaster += 1;
      });

      setFinalStar([
        ["Excellent", excellent],
        ["Great", great],
        ["Good", good],
        ["Bad", bad],
        ["Disaster", disaster],
      ]);
    }

    let use = (sum / numbers).toFixed(1);
    setFinalAverage(use);
    let showStar = [0, 0, 0, 0, 0];
    for (let index = 0; index < showStar.length; index++) {
      showStar[index] = use;
      use -= 1;
    }
    let allVote = [excellent, great, good, bad, disaster];
    SetMax(Math.max(...allVote));

    let pic = ["src1", "src2", "src3"];
    setPics(pic);
    setVote([
      ["Disaster", 1],
      ["Bad", 2],
      ["Average", 3],
      ["Good", 4],
      ["Excellent", 5],
    ]);
  };

  useEffect(() => {
    populate();
  }, []);

  const convertToArray = (sources) => {
    let arrayOfSources = [];
    for (let key in sources) {
      if (sources[key].length > 0) arrayOfSources.push(sources[key]);
    }
    return arrayOfSources;
  };

  const toggleModal = () => {
    setShowLoginModal(!showLoginModal);
    setShowRegisterModal(!showRegisterModal);
    setShowWriteModal(false);
  };

  const progress = (id, number, max) => {
    if (!percentRefs.current[id] || !progressRefs.current[id + 1]) {
      console.error(`Element with id ${id} or ${id + 1} not found`);
      return;
    }


  // Prevent progress animation if number or max is zero
  if (number === 0 || max === 0) {
    percentRefs.current[id].textContent = 0; // Set to 0 explicitly
    progressRefs.current[id + 1].style.width = '0px'; // Ensure the width is zero
    return;
  }

    const maxProgressWidth = 200;
    const targetWidth = (number / max) * maxProgressWidth;
    const duration = 2000;
    const stepTime = duration / number;
    let currentWidth = 0;
    let count = 0;

    const animate = () => {
      if (!progressRefs.current[id + 1] || !percentRefs.current[id]) {
        console.error(`Element with id ${id + 1} or ${id} became null during animation`);
        return;
      }

      if (currentWidth >= targetWidth) return;

      currentWidth += (targetWidth / duration) * stepTime;
      count += 1;

      const ctrans = `translate(${currentWidth}px, 0px)`;
      progressRefs.current[id + 1].style.width = `${currentWidth}px`;
      percentRefs.current[id].style.transform = ctrans;
      percentRefs.current[id].textContent = count;

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  };

  useEffect(() => {
    finalStar.forEach(([key]) => {
      percentRefs.current[key] = document.getElementById(key);
      progressRefs.current[key + 1] = document.getElementById(key + 1);
      progress(key, finalStar.find((star) => star[0] === key)[1], max);
    });
  }, [finalStar, max]);

  const resetModal = () => {
    setShowLoginModal(false);
    setShowRegisterModal(false);
    setShowWriteModal(false);
    setSubmit(false);
    setShowSuccessfullModal(false)
  };


  const writeReview = () => {
    if (loginState.authenticated) {
      console.log("Authenticated user, opening write modal");
      setShowWriteModal(true);
    } else {
      // console.log("Unauthenticated user, dispatching openLogin");
      // loginDispatch({ type: "openLogin" });
      toast.error('You need to sign up first', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          direction: 'ltr', // Inline style for text direction
          // fontSize: '16px',  // Custom font size
          // color: 'red',      // Custom text color
          // backgroundColor: '#f2f2f2', // Custom background color
        }
      });

    }
  };
  // const writeReview = () => {
  //   // Prevent further clicks by checking the flag
  //   if (writeReviewFlag.current) return;

  //   console.log("viewwwwwww");

  //   if (loginState.authenticated) {
  //     setShowWriteModal(true);
  //   } else {
  //     // Set the flag to true to prevent multiple calls
  //     writeReviewFlag.current = true;
  //     loginDispatch({ type: "openLogin" });

  //     // Reset the flag after a short delay to allow future clicks
  //     setTimeout(() => {
  //       writeReviewFlag.current = false;
  //     }, 1000); // You can adjust this delay as necessary
  //   }
  // };

  const getClassName = (index) => {
    let className = "without__color";
    if (index <= hoveredStar || index <= clickedStar) {
      className += " positive";
    }
    return className;
  };

  const onSubmit = (data) => {
    if (personalVote === 0) {
      setPersonalVote(-1);
      return; // Prevent submission if no star is selected
    }
  
    let comment = {
      vote: personalVote,
      data: data,
      memberName: loginState.user.name,
      srcOfAvatar: Math.floor(Math.random() * 10),
    };
  console.log("hhhhhhhhhhhhh",product)
    const productAPI = new APIProduct("/product");
    productAPI.patchProduct(product.id, comment);
    reset();
    setPersonalVote(0);
    setClickedStar(0); // Reset clicked star after submit
    setSubmit(true);
    setShowSuccessfullModal(true)
  };
  

  return (
    <div className="content">
      <div className="comment">
        <div className="top__comment">
          <div className="result">
            {finalAverage > 0 && <span className="text">Average</span>}
            {isNaN(finalAverage) && (
              <span className="without__review">No reviews</span>
            )}
            {finalAverage > 0 && (
              <span className="number">{finalAverage}</span>
            )}

            <span className="icon">
              <ul>
                {getStars(product.comments).map((star, index) => {
                  if (star >= 1) {
                    return (
                      <li className="star__icon" key={index}>
                        <svg
                          className="without__color positive "
                          viewBox="0 -10 511.98685 511"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="m510.652344 185.902344c-3.351563-10.367188-12.546875-17.730469-23.425782-18.710938l-147.773437-13.417968-58.433594-136.769532c-4.308593-10.023437-14.121093-16.511718-25.023437-16.511718s-20.714844 6.488281-25.023438 16.535156l-58.433594 136.746094-147.796874 13.417968c-10.859376 1.003906-20.03125 8.34375-23.402344 18.710938-3.371094 10.367187-.257813 21.738281 7.957031 28.90625l111.699219 97.960937-32.9375 145.089844c-2.410156 10.667969 1.730468 21.695313 10.582031 28.09375 4.757813 3.4375 10.324219 5.1875 15.9375 5.1875 4.839844 0 9.640625-1.304687 13.949219-3.882813l127.46875-76.183593 127.421875 76.183593c9.324219 5.609376 21.078125 5.097657 29.910156-1.304687 8.855469-6.417969 12.992187-17.449219 10.582031-28.09375l-32.9375-145.089844 111.699219-97.941406c8.214844-7.1875 11.351563-18.539063 7.980469-28.925781zm0 0" />
                        </svg>
                      </li>
                    );
                  }
                  if (star > 0 && star < 1) {
                    return (
                      <li className="star__icon" key={index}>
                        <svg
                          className="without__color positive"
                          viewBox="0 -10 511.98685 511"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="m510.652344 185.902344c-3.351563-10.367188-12.546875-17.730469-23.425782-18.710938l-147.773437-13.417968-58.433594-136.769532c-4.308593-10.023437-14.121093-16.511718-25.023437-16.511718s-20.714844 6.488281-25.023438 16.535156l-58.433594 136.746094-147.796874 13.417968c-10.859376 1.003906-20.03125 8.34375-23.402344 18.710938-3.371094 10.367187-.257813 21.738281 7.957031 28.90625l111.699219 97.960937-32.9375 145.089844c-2.410156 10.667969 1.730468 21.695313 10.582031 28.09375 4.757813 3.4375 10.324219 5.1875 15.9375 5.1875 4.839844 0 9.640625-1.304687 13.949219-3.882813l127.46875-76.183593 127.421875 76.183593c9.324219 5.609376 21.078125 5.097657 29.910156-1.304687 8.855469-6.417969 12.992187-17.449219 10.582031-28.09375l-32.9375-145.089844 111.699219-97.941406c8.214844-7.1875 11.351563-18.539063 7.980469-28.925781zm0 0"
                            fill="gray"
                          />
                          <path
                            d="m510.652344 185.902344c-3.351563-10.367188-12.546875-17.730469-23.425782-18.710938l-147.773437-13.417968-58.433594-136.769532c-4.308593-10.023437-14.121093-16.511718-25.023437-16.511718s-20.714844 6.488281-25.023438 16.535156l-58.433594 136.746094-147.796874 13.417968c-10.859376 1.003906-20.03125 8.34375-23.402344 18.710938-3.371094 10.367187-.257813 21.738281 7.957031 28.90625l111.699219 97.960937-32.9375 145.089844c-2.410156 10.667969 1.730468 21.695313 10.582031 28.09375 4.757813 3.4375 10.324219 5.1875 15.9375 5.1875 4.839844 0 9.640625-1.304687 13.949219-3.882813l127.46875-76.183593 127.421875 76.183593c9.324219 5.609376 21.078125 5.097657 29.910156-1.304687 8.855469-6.417969 12.992187-17.449219 10.582031-28.09375l-32.9375-145.089844 111.699219-97.941406c8.214844-7.1875 11.351563-18.539063 7.980469-28.925781zm0 0"
                            fill="#feca57"
                            clipPath="polygon(0 0, 50% 0, 50% 100%, 0% 100%)"
                          />
                        </svg>
                      </li>
                    );
                  }

                  if (star <= 0) {
                    return (
                      <li className="star__icon" key={index}>
                        <svg
                          className="without__color "
                          viewBox="0 -10 511.98685 511"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="m510.652344 185.902344c-3.351563-10.367188-12.546875-17.730469-23.425782-18.710938l-147.773437-13.417968-58.433594-136.769532c-4.308593-10.023437-14.121093-16.511718-25.023437-16.511718s-20.714844 6.488281-25.023438 16.535156l-58.433594 136.746094-147.796874 13.417968c-10.859376 1.003906-20.03125 8.34375-23.402344 18.710938-3.371094 10.367187-.257813 21.738281 7.957031 28.90625l111.699219 97.960937-32.9375 145.089844c-2.410156 10.667969 1.730468 21.695313 10.582031 28.09375 4.757813 3.4375 10.324219 5.1875 15.9375 5.1875 4.839844 0 9.640625-1.304687 13.949219-3.882813l127.46875-76.183593 127.421875 76.183593c9.324219 5.609376 21.078125 5.097657 29.910156-1.304687 8.855469-6.417969 12.992187-17.449219 10.582031-28.09375l-32.9375-145.089844 111.699219-97.941406c8.214844-7.1875 11.351563-18.539063 7.980469-28.925781zm0 0" />
                        </svg>
                      </li>
                    );
                  }
                })}
              </ul>
            </span>
            {finalAverage > 0 && (
              <span className="text2">{`${product.comments.length} reviews`}</span>
            )}
              <div className="write button yellow appear" onClick={writeReview}>
            <img
              className="icon"
              src={require("./../../../assets/icons/pencil.png")}
              alt=""
            />
            <span>Write your review</span>
          </div>
            <div className="write2 button yellow-striped" onClick={writeReview}>
              <img
                className="icon"
                src={require("./../../../assets/icons/pencil.png")}
                alt=""
              />
              <span>Write your review</span>
            </div>
          </div>

          <div className="custom__chart">
            {finalStar.map((c, index) => (
              <Fragment key={index}>
                <div className="rank">
                  <span className="title">{c[0]}</span>
                  <div className="diagram">
                    <div
                      id={c[0]}
                      className="custom__percent"
                      ref={(el) => (percentRefs.current[c[0]] = el)}
                    >
                      0
                    </div>
                    <div className="custom__progress__bar">
                      <div
                        id={c[0] + 1}
                        className="custom__progress yellow-striped"
                        ref={(el) => (progressRefs.current[c[0] + 1] = el)}
                      ></div>
                    </div>
                  </div>
                </div>
              </Fragment>
            ))}
          </div>
          <div className="write button yellow disappear" onClick={writeReview}>
            <img
              className="icon"
              src={require("./../../../assets/icons/pencil.png")}
              alt=""
            />
            <span>Write your review</span>
          </div>
        </div>
      </div>
    
     {product.comments.length>0 && <div className="line orange-striped"></div>} 

      <div className="buttom__comment">
        {product.comments.length > 0 &&
          product.comments.map((comment, index) => (
            <div className="one__comment" key={index}>
              <div className="right__comment">
                <div className="avatar">
                  <img
                    className="icon"
                    src={require(`./../../../assets/man'sAvatar/${comment.srcOfAvatar}.png`)}
                    alt=""
                  />
                </div>
                <div className="name">
                  <span>{comment.memberName}</span>
                </div>
                <div className="date">
                  <span>
                    {`Written on ${comment.date.day} ${comment.date.month} ${comment.date.year}`}
                  </span>
                </div>
              </div>
              <div className="left__comment">
                <div className="top__left__comment">
                  <div className="title">
                    <span>{comment.data.title}</span>
                  </div>
                  <div className="stars">
                    <ul>
                      {getStars([comment]).map((star, index) => {
                        if (star >= 1) {
                          return (
                            <li className="star__icon" key={index}>
                              <svg
                                className="without__color positive "
                                viewBox="0 -10 511.98685 511"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="m510.652344 185.902344c-3.351563-10.367188-12.546875-17.730469-23.425782-18.710938l-147.773437-13.417968-58.433594-136.769532c-4.308593-10.023437-14.121093-16.511718-25.023437-16.511718s-20.714844 6.488281-25.023438 16.535156l-58.433594 136.746094-147.796874 13.417968c-10.859376 1.003906-20.03125 8.34375-23.402344 18.710938-3.371094 10.367187-.257813 21.738281 7.957031 28.90625l111.699219 97.960937-32.9375 145.089844c-2.410156 10.667969 1.730468 21.695313 10.582031 28.09375 4.757813 3.4375 10.324219 5.1875 15.9375 5.1875 4.839844 0 9.640625-1.304687 13.949219-3.882813l127.46875-76.183593 127.421875 76.183593c9.324219 5.609376 21.078125 5.097657 29.910156-1.304687 8.855469-6.417969 12.992187-17.449219 10.582031-28.09375l-32.9375-145.089844 111.699219-97.941406c8.214844-7.1875 11.351563-18.539063 7.980469-28.925781zm0 0" />
                              </svg>
                            </li>
                          );
                        }

                        if (star <= 0) {
                          return (
                            <li className="star__icon" key={index}>
                              <svg
                                className="without__color "
                                viewBox="0 -10 511.98685 511"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="m510.652344 185.902344c-3.351563-10.367188-12.546875-17.730469-23.425782-18.710938l-147.773437-13.417968-58.433594-136.769532c-4.308593-10.023437-14.121093-16.511718-25.023437-16.511718s-20.714844 6.488281-25.023438 16.535156l-58.433594 136.746094-147.796874 13.417968c-10.859376 1.003906-20.03125 8.34375-23.402344 18.710938-3.371094 10.367187-.257813 21.738281 7.957031 28.90625l111.699219 97.960937-32.9375 145.089844c-2.410156 10.667969 1.730468 21.695313 10.582031 28.09375 4.757813 3.4375 10.324219 5.1875 15.9375 5.1875 4.839844 0 9.640625-1.304687 13.949219-3.882813l127.46875-76.183593 127.421875 76.183593c9.324219 5.609376 21.078125 5.097657 29.910156-1.304687 8.855469-6.417969 12.992187-17.449219 10.582031-28.09375l-32.9375-145.089844 111.699219-97.941406c8.214844-7.1875 11.351563-18.539063 7.980469-28.925781zm0 0" />
                              </svg>
                            </li>
                          );
                        }
                      })}
                    </ul>
                  </div>
                </div>
                <div className="buttom__left__comment">
                  <span>{comment.data.body}</span>
                </div>
              </div>
              {comment.sourceOfImages?.src1 !== undefined && (
                <div className="images">
                  {convertToArray(comment.sourceOfImages).map((pic, index) => (
                    <img src={pic} alt="logo" key={index} />
                  ))}
                </div>
              )}
            </div>
          ))}
      </div>

      <Modal
        className="write__review__modal"
        show={showMessageModal}
        onHide={() => setShowMessageModal(false)}
        animation={true}
      >
        <div className="success__write">
          <Modal.Header closeButton>
            <Modal.Title>You must be a member</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <span>
              To post a review on the site, you must be a member of our family
            </span>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={openLogin} className="button" style={{height:"35px"}}>
              Got it!
            </Button>
          </Modal.Footer>
        </div>
      </Modal>

      <Modal
        className="write__review__modal"
        show={showWriteModal}
        onHide={() => setShowWriteModal(false)}
        animation={true}
      >
        {!submit && (
          <div className="write">
            <Modal.Header closeButton>
              <Modal.Title>Write your review</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                  <input
                    {...register("title")}
                    type="text"
                    placeholder="Enter your title"
                    className="form-control mt-3 mb-3"
                    id="comment__title"
                  />
                  {errors.title && (
                    <div className="w-100 bg-danger text-center text-warning p-2 mt-2 rounded">
                      {errors.title.message}
                    </div>
                  )}
                </Form.Group>
                <div className="icon">
                  <span>Rate it!</span>
                  <ul>
  {vote.map((v, index) => (
    <li
      key={index}
      className="star__icon"
      onMouseEnter={() => setHoveredStar(v[1])}
      onMouseLeave={() => setHoveredStar(0)} // Reset on mouse out
      onClick={() => {
        setPersonalVote(v[1]);
        setClickedStar(v[1]); // Store clicked star
      }}
    >
      <svg className={getClassName(v[1])} viewBox="0 -10 511.98685 511">
        <path d="m510.652344 185.902344c-3.351563-10.367188-12.546875-17.730469-23.425782-18.710938l-147.773437-13.417968-58.433594-136.769532c-4.308593-10.023437-14.121093-16.511718-25.023437-16.511718s-20.714844 6.488281-25.023438 16.535156l-58.433594 136.746094-147.796874 13.417968c-10.859376 1.003906-20.03125 8.34375-23.402344 18.710938-3.371094 10.367187-.257813 21.738281 7.957031 28.90625l111.699219 97.960937-32.9375 145.089844c-2.410156 10.667969 1.730468 21.695313 10.582031 28.09375 4.757813 3.4375 10.324219 5.1875 15.9375 5.1875 4.839844 0 9.640625-1.304687 13.949219-3.882813l127.46875-76.183593 127.421875 76.183593c9.324219 5.609376 21.078125 5.097657 29.910156-1.304687 8.855469-6.417969 12.992187-17.449219 10.582031-28.09375l-32.9375-145.089844 111.699219-97.941406c8.214844-7.1875 11.351563-18.539063 7.980469-28.925781zm0 0" />
      </svg>
    </li>
  ))}
</ul>

                  {vote[1] > 0 && (
                    <span
                      style={{
                        marginRight: "10px",
                        fontSize: "20px",
                        color: "#ff7675",
                        fontWeight: "500",
                      }}
                    >
                      {vote[0]}
                    </span>
                  )}
                </div>
                {personalVote === -1 && (
                  <div className="w-100 bg-danger text-center text-warning p-2 mt-2 mb-4 rounded">
                    You have to vote
                  </div>
                )}

                <Form.Group>
                  <textarea
                    {...register("body")}
                    type="text"
                    placeholder="Enter your main review"
                    className="form-control mt-3 mb-3 text-area-height"
                    style={{height:"90px !important"}}
                  />
                  {errors.body && (
                    <div className="w-100 bg-danger text-center text-warning p-2 mt-2 rounded">
                      {errors.body.message}
                    </div>
                  )}
                </Form.Group>
              </form>
            </Modal.Body>
            <Modal.Footer style={{  justifyContent:"flex-start" }}>

              <Button className="button" variant="primary" onClick={handleSubmit(onSubmit)}   style={{ padding: "5px" }}
              >
                Submit
              </Button>
              {/* <Button
                style={{ padding: "5px" }}

              className="button"
                variant="secondary"
                onClick={() => setShowWriteModal(false)}
              >
                Cancel
              </Button> */}
            </Modal.Footer>
          </div>
        )}
      </Modal>


        {submit && (
<Modal
     className="write__review__modal"
     show={showSuccessfullModal}
     onHide={() => resetModal()}
>
          <div className="success__write">
            <Modal.Header closeButton>
              <Modal.Title>Successfully Submitted</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div style={{marginBottom:"30px"}}>{`Dear ${loginState.user.name} `}</div>
              <div>
                We have received your review. 
              </div>
              <span>
                After a quick check, we will post
                it on the site.
              </span>
              
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={resetModal}>
                Got it!
              </Button>
            </Modal.Footer>
          </div>
      </Modal>
        )}
    </div>
  );
}

export default Comment;




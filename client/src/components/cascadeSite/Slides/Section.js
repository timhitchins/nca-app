import React, { useEffect, useRef, useState, Component } from "react";
import { useIsVisible } from "./useIsVisible";
// import React, { Component } from "react";
import { connect } from "react-redux";
import ReactPlayer from "react-player";
import ReactCompareImage from "react-compare-image";
import PropTypes from "prop-types";
import {
  createSectionRefAction,
  handleSetContentAction,
} from "../../../actions/slides";
import { imageConfig } from "../../../config/imgConfig";
import "./Slides.scss";

const Section = ({
  slide,
  children,
  dispatch,
  className,
  scrollToContent,
  index,
}) => {
  const [count] = useState(index);
  const sectionRef = useRef(null);
  //is visible hook testing
  const visible = useIsVisible({ element: sectionRef });

  useEffect(() => {
    // console.log(sectionRef.current.offsetTop);
    //create the array in the store that includes these refs for scrolling
    dispatch(createSectionRefAction(sectionRef));
  }, [dispatch]);
  return (
    <section className="content-section" ref={sectionRef}>
      <div className="container">
        {/* <div>Section in view: {visible !== null && visible.toString()}</div> */}
        {slide.heading && (
          <h1>
            <span>{slide.heading}</span>
          </h1>
        )}
        <div className={className}>
          {slide.body && (
            <div>
              <div
                className="content"
                dangerouslySetInnerHTML={{ __html: slide.body }}
              />
              {slide.videoURI && (
                <div>
                  {/* {console.log("section ref", sectionRef)} */}
                  <ReactPlayer
                    // className="video-player"
                    // style={{ maxWidth: "100%", width: "none", height: "none" }}
                    url={slide.videoURI}
                    // playing
                    // playing={false}
                    controls={true}
                    // playIcon={true}
                    // light={true}
                  />
                </div>
              )}
              {slide.compareImageURIs && (
                <div className="compare-images">
                  <ReactCompareImage
                    leftImage={slide.compareImageURIs[0]}
                    rightImage={slide.compareImageURIs[1]}
                  />
                </div>
              )}
            </div>
          )}
          {slide.innerImageURI && (
            <img src={slide.innerImageURI} alt={slide.innerAltText}></img>
          )}
        </div>
      </div>
      <div
        className="scroll-down"
        onClick={() => {
          if (count < 14) {
            scrollToContent(count + 1);
            dispatch(handleSetContentAction(count + 1, imageConfig[count + 1]));
          }
        }}
      >
        &#x2913; Scroll down to continue
      </div>
    </section>
  );
};

Section.propTypes = {
  slide: PropTypes.object.isRequired,
  className: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

function mapStateToProps({ slides }) {
  return { slides };
}
export default connect(mapStateToProps)(Section);

/////TESTING BELOW
// Section.propTypes = {
//   slide: PropTypes.object.isRequired,
// };

// const Section = ({ slide, children, dispatch, className, slides }) => {
//   const sectionRef = useRef(null);
//   useEffect(() => {
//     console.log(sectionRef.current.offsetTop);
//     //create the array in the store that includes these refs for scrolling
//     dispatch(createSectionRefAction(sectionRef));
//   }, [dispatch]);

//   return (
//     <section className="content-section" ref={sectionRef}>
//       {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque egestas
//       sagittis lorem et fringilla. Class aptent taciti sociosqu ad litora
//       torquent per conubia nostra, per inceptos himenaeos. Nullam a felis ut
//       lorem fringilla egestas in quis ligula. Nam pulvinar sapien at iaculis
//       gravida. Sed laoreet sollicitudin suscipit. Ut erat velit, posuere a
//       laoreet in, dapibus sit amet sem. Fusce tempus posuere sapien, vitae porta
//       magna. Etiam aliquam augue a mi consequat, id pretium quam euismod. Sed
//       vulputate nibh neque, eget tincidunt lorem ullamcorper ac. Nullam lobortis
//       non lorem ut vulputate. Aliquam semper vulputate rhoncus. Maecenas sit
//       amet diam a mauris dapibus molestie et ac enim. Ut tincidunt id nisi sit
//       amet facilisis. Vivamus volutpat dapibus nisl, ac eleifend mi tincidunt
//       quis. Nam in elit et nunc iaculis sodales. Duis tempus consequat dictum.{" "} */}
//       <div className="container">
//         {slide.heading && (
//           <h1>
//             <span>{slide.heading}</span>
//           </h1>
//         )}
//         <div className={className}>
//           {slide.body && (
//             <div dangerouslySetInnerHTML={{ __html: slide.body }} />
//           )}
//           {slide.innerImageURI && (
//             <img src={slide.innerImageURI} alt={slide.innerAltText}></img>
//           )}
//         </div>
//       </div>
//       <div
//         className="scroll-down"
//         // onClick={() => {
//         //   dispatch(
//         //     handleSetContentAction(
//         //       slides.sectionNo + 1,
//         //       imageConfig[slides.sectionNo + 1]
//         //     )
//         //   );
//         // }}
//       >
//         &#x2913; Scroll down to continue
//       </div>
//     </section>
//   );
// };

///////
/* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque egestas
      sagittis lorem et fringilla. Class aptent taciti sociosqu ad litora
      torquent per conubia nostra, per inceptos himenaeos. Nullam a felis ut
      lorem fringilla egestas in quis ligula. Nam pulvinar sapien at iaculis
      gravida. Sed laoreet sollicitudin suscipit. Ut erat velit, posuere a
      laoreet in, dapibus sit amet sem. Fusce tempus posuere sapien, vitae porta
      magna. Etiam aliquam augue a mi consequat, id pretium quam euismod. Sed
      vulputate nibh neque, eget tincidunt lorem ullamcorper ac. Nullam lobortis
      non lorem ut vulputate. Aliquam semper vulputate rhoncus. Maecenas sit
      amet diam a mauris dapibus molestie et ac enim. Ut tincidunt id nisi sit
      amet facilisis. Vivamus volutpat dapibus nisl, ac eleifend mi tincidunt
      quis. Nam in elit et nunc iaculis sodales. Duis tempus consequat dictum.{" "} */

// class Section extends Component {
//   static propTypes = {
//     slide: PropTypes.object.isRequired,
//     className: PropTypes.string.isRequired,
//     slides: PropTypes.object.isRequired,
//   };

//   _sectionRef = React.createRef();
//   conmponentDidMount() {
//     console.log(this._sectionRef);
//     this.props.dispatch(createSectionRefAction(this._sectionRef));
//   }

//   render() {
//     const { slide, className, sectionNo } = this.props;
//     // debugger;
//     // this.props.dispatch(createSectionRefAction(this._sectionRef));
//     return (
//       <section className="content-section" ref={this._sectionRef}>
//         <div className="container">
//           {slide.heading && (
//             <h1>
//               <span>{slide.heading}</span>
//             </h1>
//           )}
//           <div className={className}>
//             {slide.body && (
//               <div dangerouslySetInnerHTML={{ __html: slide.body }} />
//             )}
//             {slide.innerImageURI && (
//               <img src={slide.innerImageURI} alt={slide.innerAltText}></img>
//             )}
//           </div>
//         </div>
//         <div
//           className="scroll-down"
//           onClick={() => {
//             // this.props.dispatch(
//             //   handleSetContentAction(
//             //     sectionNo + 1,
//             //     imageConfig[sectionNo + 1]
//             //   )
//             // );
//           }}
//         >
//           &#x2913; Scroll down to continue
//         </div>
//       </section>
//     );
//   }
// }

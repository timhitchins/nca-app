// import React, { useEffect, useRef, useState, Component } from "react";
// import { useIsVisible } from "./useIsVisible";
import React, { Component } from "react";
import { connect } from "react-redux";
import ReactPlayer from "react-player";
import ReactCompareImage from "react-compare-image";
import PropTypes from "prop-types";
import {
  createSectionRefAction,
  handleSetContentAction,
} from "../../../actions/slides";
import { MAX_SECTION_NO, imageConfig } from "../../../config/config";
import "./Slides.scss";

class Section extends Component {
  static propTypes = {
    slide: PropTypes.object.isRequired,
    className: PropTypes.string.isRequired,
    scrollToContent: PropTypes.func.isRequired,
  };

  sectionRef = React.createRef();

  componentDidMount() {
    this.props.dispatch(createSectionRefAction(this.sectionRef));
  }

  render() {
    const { sectionNo } = this.props.slides;
    const { className, slide, scrollToContent } = this.props;
    return (
      <section className="content-section" ref={this.sectionRef}>
        <div className="container">
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
                    {slide.videoName === "our-air" && (
                      <ReactPlayer
                        style={{
                          maxWidth: "100%",
                          maxHeight: "100%",
                        }}
                        width={null} // override
                        height={null} // override
                        url={slide.videoURI}
                        controls={true}
                        playing={sectionNo === 3 ? true : false}
                      />
                    )}
                    {slide.videoName === "we-are-with-earth" && (
                      <ReactPlayer
                        style={{
                          maxWidth: "100%",
                          maxHeight: "100%",
                        }}
                        width={null} // override
                        height={null} // override
                        url={slide.videoURI}
                        controls={true}
                        playing={sectionNo === 9 ? true : false}
                      />
                    )}
                  </div>
                )}
              </div>
            )}
            {slide.innerImageURI && (
              <img
                className="inner-image"
                src={slide.innerImageURI}
                alt={slide.innerAltText}
              ></img>
            )}
            {slide.details && (
              <details open={window.matchMedia("(min-width: 600px)").matches}>
                <summary>{slide.summary}</summary>
                <div dangerouslySetInnerHTML={{ __html: slide.details }}></div>
              </details>
            )}
            {slide.compareImageURIs && (
              <div className="compare-image-container">
                <ReactCompareImage
                  leftImage={slide.compareImageURIs[0]}
                  rightImage={slide.compareImageURIs[1]}
                />
              </div>
            )}
          </div>
        </div>
        {sectionNo < MAX_SECTION_NO ? (
          <div className="bottom-container">
            <div
              className="scroll-down"
              onClick={() => {
                if (sectionNo < MAX_SECTION_NO) {
                  scrollToContent(sectionNo + 1);
                  this.props.dispatch(
                    handleSetContentAction(
                      sectionNo + 1,
                      imageConfig[sectionNo + 1]
                    )
                  );
                }
              }}
            >
              &#x2913; Scroll down to continue
            </div>

            <div className="nca-logo">
              <img
                src="https://nca-toolkit.s3-us-west-2.amazonaws.com/NCA_logo_only_WHITE.png"
                alt="NCA logo"
              ></img>
            </div>
          </div>
        ) : null}
        {slide.footer && (
          <footer className="footer">
          <div>	&copy; 2020 | NEIGHBORS FOR CLEAN AIR</div>
          <div></div>
          <div>A project by</div>
          <div className="nca-logo">
              <a href="http://www.whatsinourair.org/" target="_blank" rel="noopener noreferrer">
                <img
                  src="https://nca-toolkit.s3-us-west-2.amazonaws.com/NCA_logo_only_WHITE.png"
                  alt="NCA logo"
                ></img>
              </a>
            </div>
          <div>in partnership with</div>
            <div>
              <a href="https://mappingaction.org/" target="_blank" rel="noopener noreferrer">
                <img
                  src="https://nca-toolkit.s3-us-west-2.amazonaws.com/MAC_Logo_horizontal-02.png"
                  alt="MAC logo"
                ></img>
              </a>
            </div>
          </footer>
        )}
      </section>
    );
  }
}

function mapStateToProps({ slides }) {
  return { slides };
}
export default connect(mapStateToProps)(Section);

// const Section = ({
//   slide,
//   children,
//   dispatch,
//   className,
//   scrollToContent,
//   index,
// }) => {
//   const [count] = useState(index);
//   const sectionRef = useRef(null);
//   //is visible hook testing
//   const visible = useIsVisible({ element: sectionRef });

//   useEffect(() => {
//     // console.log(sectionRef.current.offsetTop);
//     //create the array in the store that includes these refs for scrolling
//     dispatch(createSectionRefAction(sectionRef));
//   }, [dispatch]);
//   return (
//     <section className="content-section" ref={sectionRef}>
//       <div className="container">
//         {/* <div>Section in view: {visible !== null && visible.toString()}</div> */}
//         {slide.heading && (
//           <h1>
//             <span>{slide.heading}</span>
//           </h1>
//         )}
//         <div className={className}>
//           {slide.body && (
//             <div>
//               <div
//                 className="content"
//                 dangerouslySetInnerHTML={{ __html: slide.body }}
//               />
//               {slide.videoURI && (
//                 <div>
//                   <ReactPlayer
//                     style={{
//                       maxWidth: "100%",
//                       maxHeight: "100%",
//                     }}
//                     width={null} // override
//                     height={null} // override
//                     url={slide.videoURI}
//                     controls={true}
//                   />
//                 </div>
//               )}
//             </div>
//           )}
//           {slide.innerImageURI && (
//             <img
//               className="inner-image"
//               src={slide.innerImageURI}
//               alt={slide.innerAltText}
//             ></img>
//           )}
//           {slide.compareImageURIs && (
//             <div className="compare-image-container">
//               <ReactCompareImage
//                 leftImage={slide.compareImageURIs[0]}
//                 rightImage={slide.compareImageURIs[1]}
//               />
//             </div>
//           )}
//         </div>
//       </div>
//       {count < 12 && (
//         <div
//           className="scroll-down"
//           onClick={() => {
//             if (count < 14) {
//               scrollToContent(count + 1);
//               dispatch(
//                 handleSetContentAction(count + 1, imageConfig[count + 1])
//               );
//             }
//           }}
//         >
//           &#x2913; Scroll down to continue
//         </div>
//       )}
//     </section>
//   );
// };

// Section.propTypes = {
//   slide: PropTypes.object.isRequired,
//   className: PropTypes.string.isRequired,
//   index: PropTypes.number.isRequired,
// };

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

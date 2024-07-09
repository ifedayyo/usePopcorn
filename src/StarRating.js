/* eslint-disable no-lone-blocks */
import { useState } from "react";
import PropTypes from "prop-types";

const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const starContainerStyle = {
  display: "flex",
  gap: "4px",
};

StarRating.propTypes = {
  maxRating: PropTypes.number,
  defaultRating: PropTypes.number,
  color: PropTypes.string,
  size: PropTypes.number,
  messages: PropTypes.string,
  className: PropTypes.string,
  onSetRating: PropTypes.func,
};
// eslint-disable-next-line no-lone-blocks
{
  /*
  In the below, maxRating has a default value of  5 just 
  incase someone using our starRating component wants to only 
  use the starRating without setting a value. This is highly 
  valuable
  */
}

export default function StarRating({
  maxRating = 5,
  color = "#fcc419",
  size = 48,
  className = "",
  messages = [],
  defaultRating = 0,
  onSetRating,
}) {
  {
    /*we are creating a state to help us do stuffs with our star, such as, hover over them, click on them, and the changes that will come with each*/
  }
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);

  function handleRating(rating) {
    setRating(rating);
    onSetRating(rating);
  }

  const textStyle = {
    lineHeight: "1",
    margin: "0",
    color,
    fontSize: `${size / 1.5}px`,
  };

  return (
    <div style={containerStyle} className={className}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
            onRate={() => handleRating(i + 1)}
            onHoverIn={() => setTempRating(i + 1)}
            onHoverOut={() => setTempRating(0)}
            color={color}
            size={size}
          />
        ))}
      </div>

      <p style={textStyle}>
        {messages.length === maxRating
          ? messages[tempRating ? tempRating - 1 : rating - 1]
          : tempRating || rating || ""}
      </p>
    </div>
  );
}

function Star({ onRate, full, onHoverIn, onHoverOut, color, size }) {
  const starStyle = {
    width: `${size}px`,
    height: `${size}px`,
    cursor: "pointer",
  };

  return (
    <span
      role="button"
      style={starStyle}
      onClick={onRate}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
    >
      {full ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={color}
          stroke={color}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke={color}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      )}
    </span>
  );
}

// eslint-disable-next-line no-lone-blocks
{
  /**
   * We want to make our star responsive, and to change the 
    state we should use our useState. what we will start with
    first is the onclick side of things. because of cuase the use is 
    goin gto click the star thingy first. so onRate will be 
    inside the star component (<Star/>) in the starRating (ie parent, plus it also owns the state),
     we will then create
    a function that will calculate the user's clicking (i.e. 
    how much star rating they give a movie). this function (from our useState)
     is an arrow function and you can see it inside the <Star/> stuff-y.
    
     Now we have to listen for any event via our jsx/html file for our function to
     work. and guess where we are going to call our onClick (so as to listen for event)??
     of course it is going to be on the star itself, becuase that is what our sweet user
     will click on. and inside the Star (child function itself), it will inherit the prop (ie the function ie onRate)
     from the starRating parent. and onRating will be equals to onClick

     we can do the above (ie create a function for our onClick event) like the below:
     1. create an handler function in the component that owns the state.
     2. use it in the parent component
     3. pass it down to the child component that needs it

     TASK 2::
     Our stars are pretty and responsive, but we want to refine them even further. 
     we want our stars to be empty when we dont click on them, and filled/colored 
     when we do click on them. and here is how we can go about it. of course there are
     going to be two different designs for the two different states that we want.
    
     we are going to use conditional statement (ie the ? or :) with a new function we created.
     so this function will be named, "full". afterwards, we are going to write a function for it  
     inside the parent component. hmm, what we are writing for "full" is not
     a function persay. but it is a condition that says if the rating is greater
     than or equals to (i + 1), then the condition, "full" is true, which will cause our
     star to be colored. However, there is an hedgecase, this hedgecase is that once we start rating a movie
     (by clicking on a star), the very first start cannot be unclicked.

     TASK 3::
     How to hover over the stars, and temporarily store the state of the stars while
     hovering over the stars. re-renderinggg.

     1. create a new state on StarRating
     2. we will handle the hover the same place we are handling the click event, ie
     in the Star component.
     3. there is no hover event, so will we use the onMouseEnter
     4. now we pass in an handler function in the parent component jsut like we did for "onRate"
     5. afterwards, we pass the handler function down to the child component where we need it.
     6. our stars are starring now, but there is one thing remaining. our stars are not colored when
     we hover on them. to fix that we will go back to our "full" conditional statement thingy in the parent component.
     7. inside full, we were able to include the tempRating in the condition thus allowing us to have colored stars
     as we hover over them
     8. however, there is an hedgecase, when we hover the stars and eventually click on a certain amount, it doesnot reflect
     in our numbers at all. to fix taht, we just have to go to our <p>{tempRating...}</p> and make sure
     to include the rating state.

     **COMPONENT CREATOR & COMPONENT CONSUMER

     DEFINING A GOOD PUBLIC API

     ?the concept of props and passing things down
     */
}

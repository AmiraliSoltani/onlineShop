
import React from "react";

const Not__found = () => {
  const containerStyle = {
    display: "flex",
    justifyContent: "center", // Horizontally center the image
    alignItems: "center", // Vertically center the image
    height: "100vh", // Adjust the container's height as needed
  };

  const imageStyle = {
    maxWidth: "100%", // Ensure the image doesn't exceed the container's width
    maxHeight: "100%", // Ensure the image doesn't exceed the container's height
  };

  return (
    <div style={containerStyle}>
      <img
        src={require("./../../assets/banners/not.jpg")}
        alt="404"
        style={imageStyle}
      />
    </div>
  );
};

export default Not__found;


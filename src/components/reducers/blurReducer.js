const blurReducer = (state, action) => {
    switch (action.type) {
      case "activeBlur":
        return {
        blur:true
        };
    
  
      case "disactiveBlur":
        return {
            blur:false

        };
  
      
    }
  };
  
  export default blurReducer;
  
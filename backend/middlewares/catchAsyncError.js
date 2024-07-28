//this function is a higher order function that wraps another function with error handling

export const catchAsyncError=(theFunction)=>{

    //return a function that takes express request response and next middleware as parameter

    return (req,res,next)=>{

//call thefunction with the given parameters (request , response and next)
//wrap it in Promise.resolve() to ensure it is always treated as a promise
 
       Promise.resolve(theFunction(req,res,next))
       //if thefunction resolves successfully do nothing (promise chain continue)
       //if theFunction encounters an error catch it
       .catch(next)
    }
}








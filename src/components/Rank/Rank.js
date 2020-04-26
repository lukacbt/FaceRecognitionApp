import React from "react"

const Rank = ({ entries, username, route }) => {
  if(route === "guest"){ 
    return(
      <div>
        <div className="white f3">
          {"Hello Guest! Try Our Face Recognition App!"}
        </div>
      </div>
  )}else {  
  return (
    <div>
      <div className="white f3">
        {`${username}, your current number of entries is...`}
      </div>
      <div className="white f1">
        {entries}
      </div>
    </div>
  )}
}

export default Rank
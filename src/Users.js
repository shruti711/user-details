import React, { Fragment, useEffect, useState } from "react";

const UserInfo = () => {
  const [userData, setUserData] = useState(null);

  const apiUrl = "https://randomuser.me/api";

  const fetchUserData = async () => {
    try {
        // fetch the url
      const response = await fetch(apiUrl);
      const Json = await response.json();
    //   Destruct  firstName and lastName from name
      const { firstName, lastName } = Json.results[0].name;
      const email = Json.results[0].email;
    //   set user data into setUserData
      setUserData({ name: `${firstName} ${lastName}`, email });

    //   store data into localStorage
      localStorage.setItem(
        "userData",
        JSON.stringify({ name: `${firstName} ${lastName}`, email })
      );
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    const savedData = localStorage.getItem("userData");
    if (savedData) {
      setUserData(JSON.parse(savedData));
    } else {
      fetchUserData();
    }
  }, []);

//   Add functionality for refresh button
  const handleRefresh = () => {
    localStorage.removeItem("userData");
    fetchUserData();
  };

  return(
    <Fragment>
     {userData ? 
     <div>
        <h2>{userData.name}</h2> 
        <p>{userData.email}</p>
        <button onClick={handleRefresh}> Refresh </button>
    </div> : <p>No Data Found</p>}
    </Fragment>
  )
};
export default UserInfo;

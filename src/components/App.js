// This is the top-level component
// so we'll keep application state at this level.
// 👉 1- Import the state hook!
import React, { useState } from 'react'
import FriendsList from './FriendsList'
import Search from './Search'
// 👉 2- Import the dummy data that will power the application.
// (Tomorrow we'll fetch the data from an API instead.)
import friendsData from "../dummy-data/friends";

export default function App() {
  // 👉 3- Initialize a slice of state to keep track of the data
  // using the dummy data as the initial value of the slice of state
  const [friends, setFriends] = useState(friendsData);
  // 👉 4- Initialize a slice to keep track of the value of the search box
  // using an empty string as the initial value of the slice
  const [searchTerm, setSearchTerm] = useState("")

  // 👉 5- Build a `changeStatus` function that takes an id and
  // changes the `married` from true to false and viceversa
  const changeStatus = (id) => {
    const updatedFriends = friends.map(friend => {
      if (friend.id === id) {
        return { ...friend, married: !friend.married};
      } else {
        return friend;
      }
    })
    // return friend.id === id ? { ...friend, married: !friend.married } : friend;
    setFriends(updatedFriends);
  }
  // STRETCH - Make a helper function that returns
  // a filtered array of friends data (filtering by search term)
  const getFilteredFriends = () => {
    // Sanitize / normalize the data!
    const termNormalized = searchTerm.trim().toLowerCase();
    if (!termNormalized) return friends;
    return friends.filter(friend => {
      return friend.name.toLowerCase().includes(termNormalized);
    })
  }

  return (
    <div className='app-friends container'>
      {/* 👉 6- Render the Search component */}
      {/* STRETCH - Changes to the input should update the search term */}
      <Search setSearchTerm={setSearchTerm} />
      {/* 👉 7- Render the FriendsList component */}
      {/* What prop/props does FriendsList need? */}
      <FriendsList friends={getFilteredFriends()} changeStatus={changeStatus} />
    </div>
  )
}

/**
 * const props = {
 *    friends: friends,
 *    changeStatus: changeStatus
 * }
 * 
 * FriendsList(props);
 */

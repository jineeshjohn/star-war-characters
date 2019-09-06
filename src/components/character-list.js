import React, { useState, useEffect } from "react";
import Character from "./../components/character";
const SW_API = "https://swapi.co/api/";

const List = props => {
  const [data, setData] = useState([]);
  const [prevPage, setPrevPage] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadContent = newPage => {
    const action = newPage ? newPage : props.url;
    var requestUrl = SW_API + action;
    setLoading({ loading: true });
    setData([]);
    fetch(requestUrl)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setData(data.results);
        setPrevPage(data.previous);
        setNextPage(data.next);
        setLoading(false);
      })
      .catch(err => {
        console.log("There has been an error fetching data from API", err);
      });
  };

  const getPreviousPage = () => {
    loadContent(prevPage.replace(SW_API, ""));
  };

  const getNextPage = () => {
    loadContent(nextPage.replace(SW_API, ""));
  };

  useEffect(() => {
    loadContent(null);
  }, [props.url]);

  let characters = "";
  if (data) {
    characters = data.map(function(title, i) {
      return (
        <Character
          key={title.name}
          name={title.name}
          height={title.height}
          mass={title.mass}
          hair_color={title.hair_color}
          skin_color={title.skin_color}
          eye_color={title.eye_color}
          birth_year={title.birth_year}
          gender={title.gender}
        />
      );
    });
  }
  return (
    <div className="TitleList">
      <div className="Title">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Height</th>
              <th>Mass</th>
              <th>Hair Colour</th>
              <th>Skin Colour</th>
              <th>Eye Colour</th>
              <th>Birth Year</th>
              <th>Gender</th>
            </tr>
          </thead>
          <tbody>
          {loading ? <tr><td colSpan="8" className="loading">Loading...</td></tr> : characters}
          </tbody>
        </table>
        <div className="button-row">
          {prevPage !== null && (
            <button onClick={getPreviousPage}>Previous</button>
          )}
          {nextPage !== null && <button onClick={getNextPage}>Next</button>}
        </div>
      </div>
    </div>
  );
};

export default List;

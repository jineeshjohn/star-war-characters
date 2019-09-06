import React, { useState } from "react";
import CharacterData from "./character";

const Charactor = props => {
  const { name, gender, hair_color } = props.people;
  return (
    <tr>
      <td>{name}</td>
      <td>{gender}</td>
      <td>{hair_color}</td>
    </tr>
  );
};
const CharactersTable = () => {
  const [searchName, setSearchName] = useState("");
  const searchFn = (item, searchKey) => {
    return item.name.includes(searchKey);
  };
  const data = CharacterData.results.filter(item => searchFn(item, searchName));
  return (
    <div>
      <label htmlFor="searchKey">
        Search character:
        <input
          type="text"
          name="searchKey"
          value={searchName}
          onChange={e => setSearchName(e.target.value)}
        />
      </label>
      <table>
        <tbody>
          {data.map((people, index) => (
            <Charactor people={people} key={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CharactersTable;

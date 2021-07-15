import React from 'react'
import './search-bar.css';
import searchIcon from './search-icon.svg'


interface IProps {
    query: string;
    onQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function SearchBar(props: IProps) {

    return (
        <div className="search-bar">
            <input type="search" name="course-search" id="search-input" placeholder="Search here" onChange={props.onQueryChange} />
            <img id="search-icon" src={searchIcon} alt="search" />
        </div>
    );
}
export default SearchBar;
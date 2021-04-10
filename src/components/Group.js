import React, {useState} from "react";
import SelectFilter from './SelectFilter';
import RangeFilter from './RangeFilter';

function Group(props) {
    const [isOpen, toggleOpen] = useState(true);

    const searchRef = props.getSearchRef();


    /*
    * False for Close,
    * Name of Filter for Open
    *
    * */
    function setFocus(value) {
        props.setOpenFilter(value);
    }

    function renderFilters() {
        return props.item.filters.map((item) => {
            switch (item.type) {
                case 'select':
                    return <SelectFilter key={item.name}
                                         item={item}
                                         searchRef={searchRef}
                                         setFocus={setFocus}
                                         isFocus={props.openFilterId === item.name} />
                case 'range':
                    return <RangeFilter  key={item.name}
                                         item={item}
                                         searchRef={searchRef}
                                         setFocus={setFocus}
                                         isFocus={props.openFilterId === item.name} />
                default:
                    return null;
            }


        });
    }

    return (
        <div>
            <div className="search-group">
                <div className="search-group__title" onClick={() => toggleOpen(!isOpen)}>{props.item.title}</div>
                <div className={"search-group__body " + (!isOpen ? 'search-group__body_closed' : '')}>
                    {renderFilters()}
                </div>
            </div>
        </div>
    );
}

export default Group;

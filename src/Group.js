import React, {useEffect, useRef, useState} from "react";
import InputRange from 'react-input-range';
import SelectFilter from './SelectFilter';
import RangeFilter from './RangeFilter';
import Filter from './Filter';

function Group(props) {
    const [isOpen, toggleOpen] = useState(true);
    // const [openFilter, setOpenFilter] = useState(false);

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
        return props.item.filters.map((item, index) => {

            switch (item.type) {
                case 'select':
                    return <SelectFilter key={item.name}
                                         item={item}
                                         searchRef={searchRef}
                                         setFocus={setFocus}
                                         isFocus={props.openFilterId === item.name} />
                    break;
                case 'range':
                    return <RangeFilter  key={item.name}
                                         item={item}
                                         searchRef={searchRef}
                                         setFocus={setFocus}
                                         isFocus={props.openFilterId === item.name} />
                    break;
            }


        });
    }
    const item = props.item.filters[0];
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





function Range(props) {
    return (
        <div className='range'>
            <div className='range__input-wrap'>
                <input type='number' onFocus={props.handleFocus} className='filter__input' value={props.inputValue.min}/>
            </div>
            <div className='range__between'>-</div>
            <div className='range__input-wrap'>
                <input type='number' onFocus={props.handleFocus} className='filter__input' value={props.inputValue.max} />
            </div>
        </div>
    );
}

function RangeModal(props) {
    //const [rangeValue, setRangeValue] = useState({ min: 1800, max: 2021 });

    function changeStartInput(value) {
       // setRangeValue(value);
        props.changeInputValue(value);
    }

    function renderOptions() {
        if (props.item.options.length > 0) {
            const optionsHtml = props.item.options.map(item => {
                return <div className='range-modal__option-item' key={item.name}>{item.title}</div>
            });
            return <div className='range-modal__options'>{optionsHtml}</div>
        } else {
            return null;
        }

    }

    return (
        <div className='range-modal'>
            <div className="range-modal__range-slider">
                <InputRange
                    maxValue={props.item.max}
                    minValue={props.item.min}
                    value={props.inputValue}
                    allowSameValues={true}
                    onChange={value => changeStartInput(value)}
                />
            </div>
            {renderOptions()}
            <div className="range-modal__show-btn">Показать!</div>
        </div>
    );
}






export default Group;

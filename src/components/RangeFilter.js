import React, {useState} from "react";
import Filter, {Modal} from "../common/Filter";
import {CSSTransition} from "react-transition-group";
import InputRange from "react-input-range";

function RangeFilter(props) {

    const [defaultValue, setDefaultValue] = useState({min : '', max: ''});
    const [inputValue, setInputValue] = useState({min : '', max: ''});
    const [rangeValue, setRangeValue] = useState({min : props.item.min, max: props.item.max});

    function resetValue() {
        setInputValue(defaultValue);
        let minRange = (defaultValue.min && defaultValue.min > props.item.min) ? defaultValue.min : props.item.min;
        let maxRange = (defaultValue.max && defaultValue.max < props.item.max) ? defaultValue.max : props.item.max;
        setRangeValue({min : minRange, max:maxRange});
    }

    function correctRangeValue(value, type) {
        let minValue = value.min, maxValue = value.max;
        if (type === 'min') {
            if (value.min < props.item.min) minValue = props.item.min;
            if (value.min > value.max) minValue = value.max;
        }

        if (type === 'max') {
            if (value.max > props.item.max) maxValue = props.item.max;
            if (value.max < value.min) maxValue = value.min;
        }

        return {min : minValue, max:maxValue};
    }

    function changeInputValue(value, type) {
        setInputValue(value);
        setRangeValue(correctRangeValue(value, type));
    }

    function handleBlur(type) {
        if (props.isFocus) setInputValue(correctRangeValue(rangeValue, type));
    }

    function applyNewValue(callback) {
        setDefaultValue(inputValue);
        callback(false);
    }

    function changeInput(type, e) {
        let value = parseInt(e.target.value);
        switch (type) {
            case 'min':
                changeInputValue({min:value, max:rangeValue.max}, type);
                break;
            case 'max':
                changeInputValue({min:rangeValue.min, max:value}, type);
                break;
        }
    }


    return <Filter {...props} resetValue={resetValue}>
        {
            params => (<>
                <div className='range'>
                    <div className='range__input-wrap'>
                        <input type='number'
                               onFocus={params.handleFocus}
                               className='filter__input'
                               value={inputValue.min}
                               onChange={changeInput.bind(null, 'min')}
                               onBlur={handleBlur.bind(null, 'min')}

                        />
                    </div>
                    <div className='range__between'>-</div>
                    <div className='range__input-wrap'>
                        <input
                            type='number'
                            onFocus={params.handleFocus}
                            className='filter__input'
                            value={inputValue.max}
                            onChange={changeInput.bind(null, 'max')}
                            onBlur={handleBlur.bind(null, 'max')}
                        />
                    </div>
                </div>
                <RangeModal
                    inputValue={inputValue}
                    rangeValue={rangeValue}
                    changeInputValue={changeInputValue}
                    applyNewValue={applyNewValue}
                    resetValue={resetValue}
                    {...params}
                    {...props}/>
            </>)
        }


    </Filter>
}


function RangeModal(props) {

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
        <CSSTransition
            in={props.isFocus}
            timeout={300}
            classNames='alert'
            mountOnEnter
            unmountOnExit
        >
            <Modal searchRef={props.searchRef}
                   filterRef={props.filterEl}
                   title={props.item.title}
                   options={props.item.options}
                   offset={props.offset}
                   scrollHandler={props.scrollHandler}
                   resetValue={props.resetValue}
                   closeModal={props.closeModal}
            >
                <div className='range-modal'>
                    <div className="range-modal__range-slider">
                        <InputRange
                            maxValue={props.item.max}
                            minValue={props.item.min}
                            value={props.rangeValue}
                            allowSameValues={true}
                            onChange={value => props.changeInputValue(value)}
                        />
                    </div>
                    {renderOptions()}
                    <div className="range-modal__show-btn" onClick={props.applyNewValue.bind(null, props.closeModal)}>Показать!</div>
                </div>
            </Modal>
        </CSSTransition>);
}

export default RangeFilter;

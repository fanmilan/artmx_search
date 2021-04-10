import React, {useState} from "react";
import Filter, {Modal} from "../common/Filter";
import {CSSTransition} from "react-transition-group";

function SelectFilter(props) {

    const [options, setOptions] = useState(props.item.options);
    const [inputValue, setInputValue] = useState('');
    const [defaultValue, setDefaultValue] = useState('Все');

    function handleChange(e) {
        let regex = new RegExp(`^${e.target.value}`);
        setOptions(props.item.options.filter((v) => {
            return regex.test(v.name);
        }));
        setInputValue(e.target.value);
    }


    function setNewValue(value, callback) {
        setInputValue(value);
        setDefaultValue(value);
        callback();
    }

    function resetValue() {
        setInputValue('');
        setOptions(props.item.options);
    }

    return <Filter {...props} resetValue={resetValue}>
        {
            params => (<>
                <input type='text'
                       placeholder={defaultValue}
                       className='filter__input'
                       onFocus={params.handleFocus}
                       onChange={handleChange}
                       value={inputValue}
                />
                <SelectModal
                    options={options}
                    setValue={setNewValue}
                    resetValue={resetValue}
                    {...params}
                    {...props}

                />
            </>)
        }


    </Filter>
}


function SelectModal(props) {
    let body = [];
    if (props.options.length > 0) {
        props.options.forEach(v => {
            body.push(<div className='select__item' onClick={props.setValue.bind(null, v.name, props.closeModal)}>
                <div className='select__name'>{v.name}</div>
                <div className='select__count'>{v.count}</div>
            </div>)
        });
    } else {
        body.push(<div className='select__empty'>Ничего не найдено.</div>);
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
                   options={props.options}
                   offset={props.offset}
                   scrollHandler={props.scrollHandler}
                   closeModal={props.closeModal}
            >
                <div className='select'>
                    <div className='select__top'>
                        <div className="select__item select__item_all" onClick={props.setValue.bind(null, 'Все', props.closeModal)}>
                            <div className='select__name'>Все</div>
                            <div className='select__count'>200</div>
                        </div>
                    </div>
                    <div className='select__body'>
                        {body}
                    </div>
                </div>
            </Modal>
        </CSSTransition>);
}

export default SelectFilter;

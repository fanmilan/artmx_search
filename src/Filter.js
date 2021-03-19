import React, {useRef, useState} from "react";
import {CSSTransition} from "react-transition-group";
import ReactDOM from "react-dom";
import SelectFilter from "./SelectFilter";



function Filter(props) {

    // Объявляем новую переменную состояния "count"
    //const [isFocus, setFocus] = useState(false);
    const [offset, setOffset] = useState(0);


    const filterEl = useRef(null);

    function handleFocus(e) {
        let clientRect = filterEl.current.getBoundingClientRect();
        setOffset(clientRect.top);
        props.setFocus(props.item.name);
    }


    function scrollHandler() {
        let clientRect = filterEl.current.getBoundingClientRect();
        setOffset(clientRect.top);
    }

    function closeModal(reset = true) {
        if (reset) props.resetValue();
        props.setFocus(false);
    }

   /* function changeInputValue(value) {
        setInputValue(value);
    }*/

    return (
        <div className={"filter " + (props.isFocus ? 'filter_focus' : '')} ref={filterEl}>
            <label className='filter__label'>{props.item.title}</label>
            <div className='filter__input-wrap'>
                {props.children({
                    handleFocus,
                    offset,
                    scrollHandler,
                    closeModal,
                    filterEl
                })}
                {/*React.cloneElement(props.children, { onFocus : handleFocus})*/}
            </div>
        </div>
    );
}

export class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.modalRef = React.createRef();
        this.handleClick = this.handleClick.bind(this);
    }


    componentDidMount() {
        // Элемент портала добавляется в DOM-дерево после того, как
        // потомки компонента Modal будут смонтированы, это значит,
        // что потомки будут монтироваться на неприсоединённом DOM-узле.
        // Если дочерний компонент должен быть присоединён к DOM-дереву
        // сразу при подключении, например, для замеров DOM-узла,
        // или вызова в потомке 'autoFocus', добавьте в компонент Modal
        // состояние и рендерите потомков только тогда, когда
        // компонент Modal уже вставлен в DOM-дерево.
        // modalRoot.appendChild(this.el);
        document.addEventListener("mousedown", this.handleClick);
        //this.props.searchRef.current.addEventListener('scroll', this.props.scrollHandler);
    }

    componentWillUnmount() {
        // modalRoot.removeChild(this.el);
        document.removeEventListener("mousedown", this.handleClick);
        //this.props.searchRef.current.removeEventListener('scroll', this.props.scrollHandler);
    }


    /*
    * Close modal if click outside of window and filter
    *
    * */

    handleClick(e) {
        if (this.modalRef && !this.modalRef.current.contains(e.target) && !this.props.filterRef.current.contains(e.target)) {
            this.props.closeModal();
        }
    }



    calculateArrowPosition() {
        const ARROW_HEIGHT = 60;
        const FILTER_HEIGHT = 40;
        return this.props.offset - ARROW_HEIGHT / 2 + FILTER_HEIGHT / 2;
    }

    calculatePosition() {
        /*
        *  Set MIN_OFFSET if height of select window more then height of browser window
        *  Otherwise if it possible SET select window in the middle of filter field
        *  ELSE set MIN OR MAX offset.
        * */
        const FIXED_OPTIONS_HEIGHT = 80;
        const SELECT_ITEM_HEIGHT = 40;
        const MIN_OFFSET = 10;
        const browserHeight = document.documentElement.clientHeight;
        let heightOfSelectBody = ((this.props.options.length > 0) ? SELECT_ITEM_HEIGHT * this.props.options.length : SELECT_ITEM_HEIGHT) + FIXED_OPTIONS_HEIGHT;
        const MAX_OFFSET = browserHeight - heightOfSelectBody - MIN_OFFSET;
        let middleOffset = (this.props.offset - heightOfSelectBody / 2)
        let offset = (middleOffset > MAX_OFFSET) ? MAX_OFFSET : ((middleOffset < MIN_OFFSET) ? MIN_OFFSET : middleOffset);
        return (browserHeight > heightOfSelectBody) ? offset : MIN_OFFSET;
    }

    render() {
        const modalStyle = {
            top: this.calculatePosition()
        };

        const arrowStyle = {
            top: this.calculateArrowPosition()
        }

        return ReactDOM.createPortal(
            <div ref={this.modalRef} className='modal' id='modal' style={modalStyle}>
                <div className="modal__header">
                    <div className="modal__title">{this.props.title}</div>
                    <div className="modal__close-btn" onClick={this.props.closeModal}/>
                </div>
                <div className="modal__body">
                    {this.props.children}
                </div>
                <div className="modal__arrow" style={arrowStyle}/>
            </div>,
            document.body
        );
    }
}

export default Filter;

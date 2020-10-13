/**
 * @Description: 详情页面
 * @author: forguo
 * @date: 2020/8/27
 */
import React, {Component} from "react";
import LazyLoad from 'react-lazyload';

import './_Index.scss';

const Spinner = () => (
    <div className="placeholder">
        <div className="spinner">
            <div className="rect1"></div>
            <div className="rect2"></div>
            <div className="rect3"></div>
            <div className="rect4"></div>
            <div className="rect5"></div>
        </div>
    </div>
);

class Detail extends Component {

    componentDidMount() {
        const {
            visible
        } = this.props;
        const element = document.getElementById('detail');
        try {
            element.addEventListener('transitionend', handle, false);
        } catch (e) {
            console.log(e);
        }
        function handle() {
            if (visible) {
                document.getElementById('index').style.position = 'fixed';
                document.getElementById('index').style.overflow = 'hidden';
            } else {
                document.getElementById('index').style.position = 'static';
                document.getElementById('index').style.overflow = 'auto';
            }
        }
    }

    render() {
        const {
            detail,
            visible
        } = this.props;
        let style = {
            transform: visible ? 'translate3d(0, 0, 0)' : 'translate3d(100%, 0, 0)',
            transition: 'ease-in-out transform 300ms'
        };
        return (
            <div className='page detail' style={style} id='detail'>
                {
                    visible &&
                    <div className="detail-inner">
                        <LazyLoad
                            placeholder={<Spinner />}
                            debounce={100}
                        >
                            <img src={detail} alt="详情" className='detail-img'/>
                        </LazyLoad>
                    </div>
                }
                <span onClick={this.props.onCloseDetail.bind(this)} className="back-btn">返回上级</span>
            </div>
        );
    }
}

export default Detail;

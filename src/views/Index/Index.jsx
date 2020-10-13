/**
 * @Description: 列表页面
 * @author: forguo
 * @date: 2020/8/27
 */
import React, {Component} from "react";
import {connect} from "react-redux";
import LazyLoad from 'react-lazyload';
import {Modal} from "antd-mobile";
const alert = Modal.alert;
import Detail from "../Detail/Index";
import './_Index.scss';
import {dispatchSetSeriel, dispatchGetList} from "../../store/actions";

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

let scrollTop = 0;

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: '',
            visible: false,
            navBar: [
                {
                    text: '大科学类',
                    active: true,
                    seriel: '1'
                },
                {
                    text: '医学类',
                    active: false,
                    seriel: '3'
                },
                {
                    text: '物理科学',
                    active: false,
                    seriel: '4'
                }
            ]
        };
    }

    componentWillMount() {
        this.props.dispatchGetList();
    }

    onNavClick(current) {
        let {
            navBar
        } = this.state;
        navBar.map((item, index) => {
            item.active = index === current;
            return item;
        });
        let seriel = navBar[current].text;
        this.setState({
            navBar,
        });
        this.props.dispatchSetSeriel(seriel);
    }

    onCloseDetail = () => {
        this.setState({
            visible: false,
        });
        document.documentElement.scrollTop = scrollTop;
    };

    onNavDetail = (detail) => {
        if (!detail) {
            alert('提示', '暂无详情图！', [
                {text: '我知道了'},
            ]);
            return false;
        }
        this.setState({
            visible: true,
            detail
        });
        scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    };

    renderList() {
        let {
            list,
        } = this.props;
        let { seriel } = this.props;
        let product = [];
        list.map(pro => {
            if (pro.seriel === seriel) {
                product.push(pro);
            }
            return pro;
        });
        if (product.length > 0) {
            return product.map((item, index) => {
                return (
                    <div key={index} onClick={this.onNavDetail.bind(this, item.detailPictureUrl)}>
                        {
                            seriel === item.seriel &&
                            <div className='product-item'>
                                <p className='product-name'>
                                    {item.firstLabel}
                                </p>
                                <p className='product-style'>
                                    {item.secondLabel}
                                </p>
                                <p className='product-type'>
                                    {item.figure}
                                </p>
                                <div className='product-img-inner'>
                                    <LazyLoad
                                        key={index}
                                        offset={[200, 200]}
                                        placeholder={<Spinner />}
                                        debounce={100}
                                    >
                                        <img className='product-img' src={item.headPictureUrl} alt=""/>
                                    </LazyLoad>
                                </div>
                            </div>
                        }
                    </div>
                );
            });
        } else {
            return (<div className="no-data">
                {'- 暂无数据 -'}
            </div>);
        }
    }

    render() {
        const {
            navBar,
            detail,
            visible
        } = this.state;
        let {
            list,
            loading
        } = this.props;

        return (
            <div className='page index' id='index'>
                <div className="nav-bar">
                    {
                        navBar.map((item, index) => {
                            return (
                                <div className={item.active ? 'nav-bar-item-active' : 'nav-bar-item'} key={index}
                                    onClick={this.onNavClick.bind(this, index)}>
                                    {item.text}
                                </div>
                            );
                        })
                    }
                </div>
                {
                    !loading && list.length > 0 &&
                    <div className="product-list">
                        {
                            this.renderList()
                        }
                    </div>
                }
                {
                    (!list || list.length <= 0) &&
                    <div className="no-data">
                        {loading ? '加载中...' : '- 暂无数据 -'}
                    </div>
                }

                <Detail detail={detail} visible={visible} onCloseDetail={this.onCloseDetail.bind(this)}/>
            </div>
        );
    }
}

export default connect((state) => ({
    list: state.list,
    loading: state.loading,
    seriel: state.seriel
}), {
    dispatchGetList,
    dispatchSetSeriel,
})(Index);

/**
 * @Description: 列表页面
 * @author: forguo
 * @date: 2020/8/27
 */
import React, {Component} from "react";
import {connect} from "react-redux";
import LazyLoad from 'react-lazyload';
import {Modal, Tabs } from "antd-mobile";

const alert = Modal.alert;
import Detail from "../Detail/Index";
import './_Index.scss';
import {dispatchSetSeriel, dispatchGetList} from "../../store/actions";
// import topBanner from '../../assets/img/banner.png';

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
            current: 0,
            navBar: [
                {
                    text: '物理科学',
                    active: true,
                    seriel: '1'
                },
                {
                    text: '医学类',
                    active: false,
                    seriel: '2'
                },
                {
                    text: '大科学',
                    active: false,
                    seriel: '3'
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
            current
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
        this.setState({
            visible: true,
            detail
        });
        scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    };

    renderList(index) {
        let {
            list,
        } = this.props;
        let product = [];
        product = list[index].qsList;
        if (product.length > 0) {
            return product.map((item, index) => {
                return (
                    <div key={index} onClick={this.onNavDetail.bind(this, item.detailPictureUrl)}>
                        {
                            <div className='product-item'>
                                <p className='product-name'>
                                    <span className="product-index">{index + 1}.</span>
                                    <span className="product-question">{item.question}</span>
                                </p>
                                <p className='write-btn'>
                                    我来回答
                                </p>
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

        const tabs = [
            { title: 'First Tab', sub: '1' },
            { title: 'Second Tab', sub: '2' },
            { title: 'Third Tab', sub: '3' },
        ];

        return (
            <div className='page index' id='index'>
                <div className="top-banner">
                    <div className="index-slogan">星星点灯</div>
                    <div className="index-theme">中小学生问题</div>
                </div>

                <div className="nav-bar">
                    {
                        navBar.map((item, index) => {
                            return (
                                <div className={item.active ? 'nav-bar-item active' : 'nav-bar-item'} key={index}
                                    onClick={this.onNavClick.bind(this, index)}>
                                    {item.text}
                                </div>
                            );
                        })
                    }
                </div>

                <Tabs tabs={tabs}
                    initialPage={1}
                    page={this.state.current}
                    onChange={(tab, index) => {console.log('onChange', index, tab);}}
                    onTabClick={(tab, index) => {console.log('onTabClick', index, tab);}}
                >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        {
                            !loading && list.length > 0 &&
                            <div className="product-list">
                                {
                                    this.renderList(0)
                                }
                            </div>
                        }
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {
                            !loading && list.length > 0 &&
                            <div className="product-list">
                                {
                                    this.renderList(1)
                                }
                            </div>
                        }
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        {
                            !loading && list.length > 0 &&
                            <div className="product-list">
                                {
                                    this.renderList(2)
                                }
                            </div>
                        }
                    </div>
                </Tabs>

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

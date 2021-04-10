import './App.scss';
import React from "react";
import Group from "./components/Group";
class App extends React.Component {

    constructor(props) {
        super(props);
        this.searchRef = React.createRef();
        this.setOpenFilter = this.setOpenFilter.bind(this);
        this.state = {
            openFilterId: false
        }
    }

    setOpenFilter(filterId) {
        this.setState({
            openFilterId: filterId
        });
    }


    render() {
        const groupItems = [
            {
                'name': 'params',
                'title': 'Поиск по параметрам',
                'filters': [
                    {
                        'name': 'authors',
                        'title': 'Авторы',
                        'type': 'select',
                        'options': [
                            {
                                "name": "Анималистика",
                                "value": "Анималистика",
                                "count": "2336"
                            },
                            {
                                "name": "Городской пейзаж",
                                "value": "Городской пейзаж",
                                "count": "6220"
                            },
                            {
                                "name": "Иллюстрация",
                                "value": "Иллюстрация",
                                "count": "307"
                            }
                        ],
                    }, {
                        'name': 'year',
                        'title': 'Год создания',
                        'type': 'range',
                        'max' : 2021,
                        'min' : 1970,
                        'options': [
                            {
                                'name' : 'unknown',
                                'title' : 'Не известен'
                            }
                        ],
                    }
                ]

            },
            {
                'name': 'categories',
                'title': 'Поиск по категориям',
                'filters': [
                    {
                        'name': 'genre',
                        'title': 'Жанр',
                        'type': 'select',
                        'options' : [
                            {
                                "name": "Анималистика",
                                "value": "Анималистика",
                                "count": "2336"
                            },
                            {
                                "name": "Городской пейзаж",
                                "value": "Городской пейзаж",
                                "count": "6220"
                            },
                            {
                                "name": "Иллюстрация",
                                "value": "Иллюстрация",
                                "count": "307"
                            },
                            {
                                "name": "Интерьер",
                                "value": "Интерьер",
                                "count": "226"
                            },
                            {
                                "name": "Морской пейзаж",
                                "value": "Морской пейзаж",
                                "count": "1286"
                            },
                            {
                                "name": "Натюрморт",
                                "value": "Натюрморт",
                                "count": "2532"
                            },
                            {
                                "name": "Ню",
                                "value": "Ню",
                                "count": "1868"
                            },
                            {
                                "name": "Пейзаж",
                                "value": "Пейзаж",
                                "count": "5210"
                            },
                            {
                                "name": "Пиктограмма",
                                "value": "Пиктограмма",
                                "count": "1"
                            },
                            {
                                "name": "Портрет",
                                "value": "Портрет",
                                "count": "2017"
                            },
                            {
                                "name": "Поэзия",
                                "value": "Поэзия",
                                "count": "1"
                            },
                            {
                                "name": "Сюжет",
                                "value": "Сюжет",
                                "count": "4091"
                            },
                            {
                                "name": "Театральный костюм",
                                "value": "Театральный костюм",
                                "count": "49"
                            },
                            {
                                "name": "Цветы",
                                "value": "Цветы",
                                "count": "2548"
                            }
                        ]
                    },
                    {
                        'name': 'price',
                        'title': 'Цена',
                        'type': 'range',
                        'max' : 200000,
                        'min' : 500,
                        'options': [
                            {
                                'name' : 'sale',
                                'title' : 'Цена со скидкой'
                            }
                        ],
                    },
                    {
                        'name': 'width',
                        'title': 'Ширина',
                        'type': 'range',
                        'max' : 500,
                        'min' : 10,
                        'options': [
                        ],
                    },
                    {
                        'name': 'height',
                        'title': 'Высота',
                        'type': 'range',
                        'max' : 500,
                        'min' : 10,
                        'options': [
                        ],
                    }
                ]

            },
        ];

        const Groups = groupItems.map(item => {
            return <Group key={item.name}
                          item={item}
                          setOpenFilter={this.setOpenFilter}
                          getSearchRef={() => this.searchRef}
                          openFilterId={this.state.openFilterId}
            />;
        })

        return <div className="app">
            <div className="search" ref={this.searchRef}>
                <div className="search__top">

                </div>
                <div className="search__bottom">
                    {Groups}
                </div>
                <div className="search__extra-height">

                </div>
            </div>
        </div>
    }
}


export default App;

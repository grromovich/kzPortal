import React, { Component } from 'react';
import "./Portal.css";

export class Portal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            articles: [],
            tabelCode: sessionStorage.getItem("TabelCode"),
        };
        
    }

    sumArticles(articles) {
        let sum = 0;
        articles.forEach((el) => {
            sum += el.Money
        })
        return sum
    }

    onInputChange = () => {
        window.location.assign('/');
    };
    componentWillMount() {
        this.GetData(this.state.tabelCode)
    }
    render() {
        return (
            <div>
                <div class="header">
                    <ul class="menu">
                        <li>{ this.state.name}</li>
                        <li>Таб. номер: {this.state.tabelCode}</li>
                        <li onClick={this.onInputChange} class="logout">Выйти</li>
                    </ul>
                </div>
                <h1>Расчетный листок</h1>
                <div class="tables">
                    <div class="left-table">
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th colspan="2">Рабочие</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th align="left" class="table-vid">Вид</th>
                                    <th class="table-dni">Дни</th>
                                    <th class="table-clock">Часы</th>
                                    <th class="table-summ">Сумма</th>
                                </tr>
                            </tbody>
                            <tr>
                                <td>Начислено:</td>
                                <td></td>
                                <td></td>
                                <td>{this.sumArticles(this.state.articles.filter(article => article.ArticleType === "Na"))}</td>
                            </tr>
                            {this.state.articles.filter(article => article.ArticleType === "Na").map(filteredArticle => (
                                <tr>
                                    <td>{filteredArticle.ArticleName}</td>
                                    <td>{filteredArticle.DayTime}</td>
                                    <td>{filteredArticle.HourTime}</td>
                                    <td>{filteredArticle.Money}</td>
                                </tr>
                            ))}
                        </table>
                    </div>
                    <div class="right-table">
                        <table>
                            <tbody>
                                <tr>
                                    <th align="left" class="table-vid">Вид</th>
                                    <th align="center" class="table-summ">Сумма</th>
                                </tr>
                            </tbody>
                            <tr class="zhir">
                                <td>Удержано:</td>
                                <td>{this.sumArticles(this.state.articles.filter(article => article.ArticleType === "Ud"))}</td>
                            </tr>
                            {this.state.articles.filter(article => article.ArticleType === "Ud").map(filteredArticle => (
                                <tr>
                                    <td>{filteredArticle.ArticleName}</td>
                                    <td>{filteredArticle.Money}</td>
                                </tr>
                            ))}
                            <tr class="zhir">
                                <td>Выплачено:</td>
                                <td>{this.sumArticles(this.state.articles.filter(article => article.ArticleType === "Vi"))}</td>
                            </tr>
                            {this.state.articles.filter(article => article.ArticleType === "Vi").map(filteredArticle => (
                                <tr>
                                    <td>{filteredArticle.ArticleName}</td>
                                    <td>{filteredArticle.Money}</td>
                                </tr>
                            ))}
                        </table>
                    </div>
                </div>
            </div>
        )
    }
    async GetData(tabel) {
        let response = await fetch('data',
            {
                method: "POST",
                headers: { "Accept": "application/json", "Content-Type": "application/json" },
                body: JSON.stringify({
                    TabelCode: tabel,
                })
            });
        let data = await response.json();
        console.log(data)
        if (data !== false) {
            this.setState({ name: data["Name"], articles: data["Articles"] })
        }
    }
};
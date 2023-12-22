import React, { Component } from 'react';
import "./Tables.css";

export class Tables extends Component {
    constructor(props) {
        super(props);
        this.state = { 
         }
    }
    sumArticles(articles) {
        let sum = 0;
        articles.forEach((el) => {
            sum += el.Money
        })
        return sum
    }
    render() { 
        return (  
        <div className="tables">
            <div className="left_table main-table">
                <table>
                    <thead>
                        <tr>
                            <th className="vid">Вид</th>
                            <th className="period">Период</th>
                            <th className="time">Дни</th>
                            <th className="time">Часы</th>
                            <th className="oplacheno">Оплачено</th>
                            <th className="summa">Сумма</th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr className="bold">
                        <td>Начислено:</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>{this.sumArticles(this.props.articles.filter(article => article.ArticleType === "Na"))}</td>
                    </tr>
                    {this.props.articles.filter(article => article.ArticleType === "Na").map((filteredArticle, i) => (
                        <tr key={i}>
                            <td>{filteredArticle.ArticleName}</td>
                            <td>{filteredArticle.Period}</td>
                            <td>{filteredArticle.DayTime}</td>
                            <td>{filteredArticle.HourTime}</td>
                            <td>{filteredArticle.Oplacheno} часов</td>
                            <td>{filteredArticle.Money}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="right_table main-table">
                <table>
                    <thead>
                    <tr>
                        <th className="vid">Вид</th>
                        <th className="period">Период</th>
                        <th className="summa">Сумма</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr className="bold">
                        <td>Удержано:</td>
                        <td></td>
                        <td>{this.sumArticles(this.props.articles.filter(article => article.ArticleType === "Ud"))}</td>
                    </tr>
                    {this.props.articles.filter(article => article.ArticleType === "Ud").map((filteredArticle,i) => (
                        <tr key={i}>
                            <td>{filteredArticle.ArticleName}</td>
                            <td>{filteredArticle.Period}</td>
                            <td>{filteredArticle.Money}</td>
                        </tr>
                    ))}
                    <tr className="bold">
                        <td>Выплачено:</td>
                        <td></td>
                        <td>{this.sumArticles(this.props.articles.filter(article => article.ArticleType === "Vi"))}</td>
                    </tr>
                    {this.props.articles.filter(article => article.ArticleType === "Vi").map((filteredArticle, i) => (
                        <tr key={i}>
                            <td>{filteredArticle.ArticleName}</td>
                            <td>{filteredArticle.Period}</td>
                            <td>{filteredArticle.Money}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div className="other-data">
                    <div className="other-data-text">
                        <p>Долг предприятия на начало: {this.props.otherData[0]}</p>
                        <p className="bold">Долг предприятия на конец: {this.props.otherData[1]}</p>
                    </div>
                    <hr />
                    <p>Общий облагаемый доход: {this.props.otherData[2]}</p>
                </div>
            </div>
        </div>
    );
    }
}

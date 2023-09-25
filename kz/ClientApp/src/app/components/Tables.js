import React, { Component } from 'react';
import "./Tables.css";

export class Tables extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            articles: this.props.articles
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
            <div className="left_table">
                <table>
                    <tr>
                        <th className="vid">Вид</th>
                        <th className="period">Период</th>
                        <th className="time">Дни</th>
                        <th className="time">Часы</th>
                        <th className="oplacheno">Оплачено</th>
                        <th className="summa">Сумма</th>
                    </tr>
                    <tr className="bold">
                        <td>Начислено:</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>{this.sumArticles(this.state.articles.filter(article => article.ArticleType === "Na"))}</td>
                    </tr>
                    {this.state.articles.filter(article => article.ArticleType === "Na").map(filteredArticle => (
                        <tr>
                            <td>{filteredArticle.ArticleName}</td>
                            <td>{filteredArticle.Period}</td>
                            <td>{filteredArticle.DayTime}</td>
                            <td>{filteredArticle.HourTime}</td>
                            <td>{filteredArticle.Oplacheno} часов</td>
                            <td>{filteredArticle.Money}</td>
                        </tr>
                    ))}
                </table>
            </div>
            <div className="right_table">
                <table>
                    <tr>
                        <th className="vid">Вид</th>
                        <th className="period">Период</th>
                        <th className="summa">Сумма</th>
                    </tr>
                    <tr className="bold">
                        <td>Удержано:</td>
                        <td></td>
                        <td>{this.sumArticles(this.state.articles.filter(article => article.ArticleType === "Ud"))}</td>
                    </tr>
                    {this.state.articles.filter(article => article.ArticleType === "Ud").map(filteredArticle => (
                        <tr>
                            <td>{filteredArticle.ArticleName}</td>
                            <td>{filteredArticle.Period}</td>
                            <td>{filteredArticle.Money}</td>
                        </tr>
                    ))}
                    <tr className="bold">
                        <td>Выплачено:</td>
                        <td></td>
                        <td>{this.sumArticles(this.state.articles.filter(article => article.ArticleType === "Vi"))}</td>
                    </tr>
                    {this.state.articles.filter(article => article.ArticleType === "Vi").map(filteredArticle => (
                        <tr>
                            <td>{filteredArticle.ArticleName}</td>
                            <td>{filteredArticle.Period}</td>
                            <td>{filteredArticle.Money}</td>
                        </tr>
                    ))}
                </table>
            </div>
        </div>
    );
    }
}

import React, { Component } from 'react';
import "./portal.css";

export class Portal extends Component {

    onInputChange = () => {
        window.location.assign('/');
    };

    render() {
        return (
            <div>
                <div class="header">
                    <ul class="menu">
                        <li>Кубасов Кирилл Денисович</li>
                        <li>Таб. номер: 515664</li>
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
                                <td>73 598,40</td>
                            </tr>
                            <tr>
                                <td>Оплата по окладу</td>
                                <td>26</td>
                                <td>156</td>
                                <td>29 013,00</td>
                            </tr>
                            <tr>
                                <td>Районный коэффициент</td>
                                <td></td>
                                <td></td>
                                <td>5 551,95</td>
                            </tr>
                            <tr>
                                <td>Стимулирующая выплата (ист.2.2, 4.1, 4.2, 5.4, 5.5, 7)</td>
                                <td></td>
                                <td></td>
                                <td>8 000,00</td>
                            </tr>
                            <tr>
                                <td>Начисления в связи с больничным листом</td>
                                <td></td>
                                <td></td>
                                <td>5 603,45</td>
                            </tr>
                            <tr>
                                <td>Расчет денежных начислений по отпускным</td>
                                <td></td>
                                <td></td>
                                <td>18 430,00</td>
                            </tr>
                            <tr>
                                <td>Начисления по социальным отчислениям</td>
                                <td></td>
                                <td></td>
                                <td>7 000,00</td>
                            </tr>
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
                                <td>5 534,00</td>
                            </tr>
                            <tr>
                                <td>НДФЛ</td>
                                <td>5 534,00</td>
                            </tr>
                            <tr class="zhir">
                                <td>Выплачено:</td>
                                <td>68 064,40</td>
                            </tr>
                            <tr>
                                <td>За первую половину месяца (Банк, вед. № 12507 от 18.09.20)</td>
                                <td>22 688,13</td>
                            </tr>
                            <tr>
                                <td>Зарплата за месяц (Банк, вед. № 12138 от 30.09.20)</td>
                                <td>45 376,27</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
};
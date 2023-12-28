import React, { useState, useEffect } from 'react';
import "./AdminInfo.css";
import { PasswordPopup } from "../../components/PasswordPopup";
import { User } from "../../shared/UserFromAdminTable";
import krestImg from '../../assets/images/krest.svg';
import searchImg from '../../assets/images/search.svg';
import { data } from 'jquery';

export function AdminInfo() {

    const [searchValue, setSearchValue] = useState("")

    const [visibilityPasswordPopup, setVisibilityPasswordPopup] = useState("hidden")
    const [visibilityExitPopup, setVisibilityExitPopup] = useState("hidden")
    const [visibilityInfoPopup, setVisibilityInfoPopup] = useState("hidden")
    const [nowPopupUser, setNowPopupUser] = useState({name:"",tab:"",number:"",dateVisit:"",arrayOfIP:[]})

    const [dataUsers, setDataUsers] = useState([])
    const [userList, setUserList] = useState([])

    const [nowUsersNumberAll, setNowUsersNumberAll] = useState(15)
    const [nowUsersNumberSearch, setNowUsersNumberSearch] = useState(15)

    function checkPosition() {
        const height = document.body.offsetHeight
        const screenHeight = window.innerHeight

        console.log(1)

        const scrolled = window.scrollY
      
        const threshold = height - screenHeight / 4

        const position = scrolled + screenHeight
      
        if (position >= threshold) {
            if(searchValue!=""){
                setNowUsersNumberSearch(nowUsersNumberSearch+10)
            }
            else {
                setNowUsersNumberAll(nowUsersNumberAll+10)
            }
        }
      }

    useEffect(checkPosition, [window.scrollY])

    function onExitClick() {
        sessionStorage.setItem("TabelCode", "");
        sessionStorage.setItem("APIkey", "");
        window.location.assign('/');
    };

    function isFIO(searchResult){
        if(isNaN(Number(searchResult[0]))){
            return true   
        } 
        else {
            return false
        }
    }

    function filterUsers(user) {
        let search = String(searchValue)
        if(search.length === 0){
            return true;
        }
        if(isFIO(searchValue)){
            return user['Name'].substring(0, search.length).toLowerCase() === search.toLowerCase()      
        }
        else {
            search = search.replace("-","")
            return user['TabelCode'].replace("-","").substring(0, search.length) === search
        }
    }

    useEffect(()=>{
        if(dataUsers['Users'] != undefined){
            setUserList([...userList, ...dataUsers['Users'].slice(0, nowUsersNumberAll)] )
        }
    }, [dataUsers, nowUsersNumberAll])

    useEffect(()=>{
        if(dataUsers['Users'] != undefined){    
            let arr = dataUsers['Users'].filter(filterUsers)
            setUserList(arr.slice(0, nowUsersNumberSearch))
        }
    }, [searchValue, nowUsersNumberSearch])

    useEffect(()=>{
        SearchUsers("");
    }, [])

    return (
        <div className="wrapper">
            <PasswordPopup
                visibilityPasswordPopup={visibilityPasswordPopup}
                onClose={() => setVisibilityPasswordPopup("hidden")}
            />
            <div className="overlay" style={{ visibility: visibilityExitPopup }}>
                <div className="exit-popup" style={{visibility: visibilityExitPopup}}>
                    <div className="exit-popup__container">
                        <h1>Выход</h1>
                        <p>Вы действительно хотите выйти?</p>
                        <div className="exit-popup-buttons">
                            <button onClick={onExitClick}>Выйти</button>
                            <button onClick={()=>{setVisibilityExitPopup("hidden")}}>Отмена</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="overlay" style={{ visibility: visibilityInfoPopup }}>
                <div className="admin-info-popup">
                    <div className="img-group krest">
                        <img src={krestImg} alt=""/>
                        <div className="admin-white-box" onClick={ ()=>setVisibilityInfoPopup("hidden") }></div>
                    </div>
                    <div className="admin-popup__container">
                        <h1>Информация</h1>
                        <div className="admin-info-group">
                            <p>ФИО: {nowPopupUser.name}</p>
                            <p>Таб. номер: {nowPopupUser.tab}</p>
                            <p>Число неудачных попыток входа: {nowPopupUser.number}</p>
                            <p>Дата последнего посещения: {nowPopupUser.dateVisit}</p>
                            <p className="admin-table-block-text">Блокировки</p>
                            <div className="admin-info-frame">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>IP-адрес</th>
                                            <th>Дата и время</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            nowPopupUser.arrayOfIP.map(user=>(
                                                <tr>
                                                    <td>{user.ip}</td>
                                                    <td>{user.date}</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="main-header">
                <div className="main-header__container">
                    <ul className="main-header_menu">
                        <li>
                            <div className="admin-input-group">
                                <div className="img-group">
                                    <img src={searchImg} alt="Поиск"/>
                                    <div className="admin-white-box"></div>
                                </div>
                                <input 
                                    className='' 
                                    value={searchValue} 
                                    onChange={(change)=>setSearchValue(change.target.value)} 
                                    placeholder="Поиск"
                                    autoFocus
                                />
                            </div>
                        </li>
                        <li className='bold'>Админ-панель</li>
                        <li onClick={()=>{setVisibilityExitPopup("visible")}}>Выйти</li>
                    </ul>
                </div>
            </div>
            <div className="main-main">
                <div className="main-main__container">
                <table className="admin-table">
                    <thead>
                    <tr>
                        <th>ФИО</th>
                        <th>Таб. номер</th>
                        <th>Попытки</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            userList && 
                            <>{
                                userList.map(user=>(
                                <User 
                                    key={user['TabelCode']}
                                    name={user['Name']}
                                    tab={user['TabelCode']}
                                    number={user['NumberBans']}
                                    onClickInfo={(tab)=>{
                                        setNowPopupUser(dataUsers.find((user)=>user.tab === tab))
                                        setVisibilityInfoPopup("visible")
                                    }}
                                />
                            ))
                            }</>
                        }
                        {
                            
                        }
                    </tbody>
                </table>
                </div>
            </div>
        </div>
    )
    {
        dataUsers['Users'].length === 0 && 
        <p className = "admin-table-error">Ничего не найдено</p>
    }
    async function SearchUsers(searchResult) {
        fetch('adminsearch',
            {
                method: "POST",
                //withCrefentials: true,
                crossorigin: true,
                mode: "no-cors",
                headers: { "Accept": "application/json", "Content-Type": "application/json; charset=utf-8" },
                body: JSON.stringify({
                    APIkey: sessionStorage.getItem("APIkey"),
                    Password: searchResult,
                    Type: isFIO(searchResult) ? "String" : "Number"
                })
            })
            .then((response) => response.json())
            .then((data) => {
                if (data !== false) {
                    console.log(data['Users'])
                    setDataUsers(data)
                }
                else {
                    console.log("ОШибка отправки на контроллер adminsearch")
                }
            })
    }
}
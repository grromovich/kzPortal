import React, { useState, useEffect, useCallback } from 'react';
import { InView } from 'react-intersection-observer';
import "./AdminInfo.css";
import { PasswordPopup } from "../../components/PasswordPopup";
import {ExitPopup} from "../../components/ExitPopup";
import { User } from "../../shared/UserFromAdminTable";
import krestImg from '../../assets/images/krest.svg';
import searchImg from '../../assets/images/search.svg';
import { Header } from "../../components/Header";
import { HeaderUser } from "../../shared/HeaderUser";


export function AdminInfo() {

    const [searchValue, setSearchValue] = useState("")

    const [visibilityPasswordPopup, setVisibilityPasswordPopup] = useState("hidden")
    const [visibilityExitPopup, setVisibilityExitPopup] = useState("hidden")
    const [visibilityInfoPopup, setVisibilityInfoPopup] = useState("hidden")
    const [nowPopupUser, setNowPopupUser] = useState({name:"",tab:"",number:"",dateVisit:"",arrayOfIP:[]})
    const [nowPopupUserData, setNowPopupUserData] = useState({name:"",tab:"",number:"",dateVisit:"",arrayOfIP:[]})

    const [dataUsers, setDataUsers] = useState([])

    const [inView, setInView] = useState(false);
    
    const [nowUsersNumberAll, setNowUsersNumberAll] = useState(15)
    const [nowUsersNumberSearch, setNowUsersNumberSearch] = useState(15)

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

    const escFunction = useCallback((event) => {
        if (event.key === "Escape") {
          setVisibilityInfoPopup("hidden");
        }
      }, []);
    
      useEffect(() => {
        document.addEventListener("keydown", escFunction, false);
    
        return () => {
          document.removeEventListener("keydown", escFunction, false);
        };
      }, [escFunction]);

    function DisplayUsers() {
        let numberUsers
        if(searchValue) {
            numberUsers = nowUsersNumberSearch
        } else {
            numberUsers = nowUsersNumberAll
        }
        let users = dataUsers.filter(filterUsers).slice(0, numberUsers).map(user=>(
            <User 
                key={user['TabelCode']}
                name={user['Name']}
                tab={user['TabelCode']}
                number={user['NumberBans']}
                onClickInfo={(tab)=>{
                    setNowPopupUser(dataUsers.find((u)=>u['TabelCode'] === tab))
                    setVisibilityInfoPopup("visible")
                }}
            />
            ))
        if(users.length > 0) {
            let inview =  <InView onChange={setInView}><tr className='admin-inView-tr'></tr></InView>
            return users.concat(inview)
        }
        else {
            return <p className = "admin-table-error">Ничего не найдено</p>
        }
    }

    useEffect(()=>{
        SearchUsers();
    }, [])

    useEffect(()=>{
        setNowUsersNumberSearch(15)
    }, [searchValue])
    useEffect(()=>{
        if(inView){
            if(searchValue){
                setNowUsersNumberSearch(nowUsersNumberSearch+10)
            }
            else {
                setNowUsersNumberAll(nowUsersNumberAll+10)
            }
        }
        // eslint-disable-next-line
    }, [inView])
    
    useEffect(()=>{
        if(nowPopupUser.name === "") {
            return;
        }
        getInfoUser()
    }, [nowPopupUser, getInfoUser])


    return (
        <div className="wrapper">
            <PasswordPopup
                visibilityPasswordPopup={visibilityPasswordPopup}
                onClose={() => setVisibilityPasswordPopup("hidden")}
            />
            <ExitPopup
                visibilityExitPopup={visibilityExitPopup}
                onClose={(data)=>{setVisibilityExitPopup(data)}}
            />
            <div className="overlay admin-overlay" style={{ visibility: visibilityInfoPopup }}>
                <div className="admin-info-popup">
                    <div className="img-group krest">
                        <img src={krestImg} alt=""/>
                        <div className="admin-white-box" onClick={ ()=>setVisibilityInfoPopup("hidden")}></div>
                    </div>
                    <div className="admin-popup__container">
                        <h1>Информация</h1>
                        <div className="admin-info-group">
                            <p>ФИО: {nowPopupUserData['Name']}</p>
                            <p>Таб. номер: {nowPopupUserData['TabelCode']}</p>
                            <p>Число неудачных попыток входа: {nowPopupUserData['NumberBans']}</p>
                            <p>Дата последнего посещения: {nowPopupUserData['LastLoginDate']}</p>
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
                                            nowPopupUserData['Bans'] && nowPopupUserData['Bans'].map(user=>(
                                                <tr>
                                                    <td>{user['IP']}</td>
                                                    <td>{user['Date']}</td>
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
            <Header>
                <ul className="main-header_menu">
                    <HeaderUser 
                        name={sessionStorage.getItem("Name")}
                        tabelCode={sessionStorage.getItem("TabelCode")}   
                        role={1}
                        page="/main"
                    />
                    <li onClick={()=>{setVisibilityExitPopup("visible")}}>Выйти</li>
                </ul>
            </Header>
            <div className="main-main">
                <div className="admin-main__container">
                    <h1 className='admin-h1'>Пользователи</h1>
                    <div className="admin-box-container-search">
                        <input 
                            className='admin-input-search' 
                            value={searchValue} 
                            onChange={(change)=>setSearchValue(change.target.value)} 
                            placeholder="Поиск по ФИО или табельному"
                            autoFocus
                        />  
                    </div>
                    <div className="admin-box-container-table">
                        <table className="admin-table">
                            <thead>
                            <tr>
                                <th>ФИО</th>
                                <th>Таб. номер</th>
                                <th>Попытки</th>
                                <th>Дата посещения</th>
                                <th>Действия</th>
                            </tr>
                            </thead>
                            <tbody>
                                {DisplayUsers()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
    
    async function SearchUsers() {
        fetch('/api/admindata',
            {
                method: "POST",
                //withCrefentials: true,
                crossorigin: true,
                mode: "no-cors",
                headers: { "Accept": "application/json", "Content-Type": "application/json; charset=utf-8" },
                body: JSON.stringify({
                    APIkey: sessionStorage.getItem("APIkey")
                })
            })
            .then((response) => response.json())
            .then((data) => {
                if (data !== false) {
                    setDataUsers(data['Users'])
                }
                else {
                    console.log("Ошибка отправки на контроллер adminsearch")
                }
            })
    }

// eslint-disable-next-line
async function getInfoUser() {
    fetch('/api/admingetuserinfo',
        {
            method: "POST",
            //withCrefentials: true,
            crossorigin: true,
            mode: "no-cors",
            headers: { "Accept": "application/json", "Content-Type": "application/json; charset=utf-8" },
            body: JSON.stringify({
                APIkey: sessionStorage.getItem("APIkey"),
                UserTabelCode: nowPopupUser['TabelCode']
            })
        })
        .then((response) => response.json())
        .then((data) => {
            if (data !== false) {
                setNowPopupUserData(data);
            }
            else {
                console.log("Ошибка отправки на контроллер admingetuserinfo")
            }
        })
}
}
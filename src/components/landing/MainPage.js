import React from "react";
import '../styles/MainPage.css';

function MainPage(props) {
    return(
        <div className='main-page'>
            <div className='main-page-info'>
                <h2 className='main-page-info__title'>Портал для планирования и управления мероприятиями</h2>
                <p className='main-page-info__description'>В настоящее время у многих людей есть проблема организации досуга. Они испытывают трудности в поиске подходящих им мероприятий и людей со схожими интересами. Наше приложение направлено на то, чтобы помочь людям найти единомышленников и с удовольствием провести время. У пользователя будет возможность выбрать из многочисленного списка мероприятий то, что подходит именно ему, и записаться на него. Также пользователь может создать мероприятие самостоятельно, настроить параметры под определенный круг лиц.</p>
            </div>
            <div className='main-page-users'>
                <div className='main-page-creators'>
                    <p className='main-page-creators__title'>Создатели:</p>
                    {props.creators.map((user) =>
                        <p className='main-page-creators__name' key={user._id}>{user.name} {user.surname}</p>
                    )}
                </div>
                <p className='main-page-users__count'>Количество пользователей: {props.creators.length}</p>
            </div>
        </div>
    );
}

export default MainPage;
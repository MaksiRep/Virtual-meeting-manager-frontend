import React from "react";
import '../styles/PageButtons.css'
import {useLocation, useNavigate} from "react-router-dom";
import getPage from '../landing/MeetingList'

function PageButtons (props) {
    const location = useLocation();
    const navigate = useNavigate();

    const getPage = () => {
        return Number(location.pathname.slice(location.pathname.indexOf("/meeting-list") + 14));
    }

    const handleNext = () => {
        const stage = getPage() + 1;
        if(location.pathname.includes('profile')){
            navigate(`/profile/meeting-list/${stage}`);
        }
        else {
            navigate(`/meeting-list/${stage}`);
        }
    }

    const handleBefore = () => {
        const stage = getPage() - 1;
        if(location.pathname.includes('profile')){
            navigate(`/profile/meeting-list/${stage}`);
        }
        else {
            navigate(`/meeting-list/${stage}`);
        }
    }

    return(
        <div className='page-buttons'>
            <button className={`page-button page-button_before ${getPage() === 1 ? 'page-button_none' : ''}`}
                    onClick={handleBefore}/>
            <button className={`page-button page-button_next ${!(props.isFull) ? 'page-button_none' : ''}`}
                    onClick={handleNext}/>
        </div>
    );

}

export default PageButtons
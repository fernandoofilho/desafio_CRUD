import './index.css';
import Profile from '../../components/Profile';
import ParticlesComponent from '../../components/GeneralBackground';

export default function NormalUserHome() {
    return (
        <>
        <div className="home-normal-user-container">
            <ParticlesComponent className='background' />
            <Profile className='profile' />
        </div>
        
        </>
    );
}

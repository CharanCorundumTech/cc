// Sidebar.js
import React from 'react';
// import './Sidebar.css'
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import DatasetIcon from '@mui/icons-material/Dataset';
import FlagCircleIcon from '@mui/icons-material/FlagCircle';

const Sidebar = () => {
    return (
        <div className="sidebar" style={{display:'flex',flexDirection:"column",gap:"1rem",
        // background: 'linear-gradient(24deg, rgba(195,34,34,1) 0%, rgba(22,104,215,1) 70%)',
        borderTopRightRadius:"15px",
        borderTopLeftRadius:"15px",
        marginLeft:'5px',
        backgroundColor:"white",
        boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        height:"84vh",width:"250px"}}>
            <div className='sidebar_links'> <GraphicEqIcon/> Analytics </div>
            <div className='sidebar_links'> <DatasetIcon/> View Data </div>
            <div className='sidebar_links'> <FlagCircleIcon/> Reports </div>
            {/* <Link to="/analytics" className='sidebar_links'> <GraphicEqIcon/> Analytics</Link>
            <Link to="/tiles" className='sidebar_links' > <DatasetIcon/> View Data</Link>
            <Link to="/reports" className='sidebar_links'> <FlagCircleIcon/> Reports</Link> */}
            {/* <Link to="/settings" className='sidebar_links'>Settings</Link> */}
            {/* Add more links as needed */}
        </div>
    );
};

export default Sidebar;

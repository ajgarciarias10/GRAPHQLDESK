import { useState } from "react";
import styles from './header_nav.module.css'
import {GiHamburgerMenu} from 'react-icons/gi'
import {MdAccountCircle} from 'react-icons/md'
import {FaCubes} from 'react-icons/fa'



const  Header_Nav = () => {

    return (
        <div className={styles.main_container}>
            <GiHamburgerMenu className={styles.ham_menu}/>
            <span className={styles.header_title}>T-Systems</span>
            <MdAccountCircle className={styles.account}/>
            <FaCubes className={styles.misc}/>
        </div>
    );
}

export default Header_Nav;